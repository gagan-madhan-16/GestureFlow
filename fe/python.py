from flask import Flask, Response, send_from_directory, render_template
from flask_cors import CORS
import cv2
import mediapipe as mp
import numpy as np
import math
import threading
import os

app = Flask(__name__)
CORS(app) 

# Initialize Mediapipe hands and drawing utilities
mp_hands = mp.solutions.hands
hands = mp_hands.Hands(max_num_hands=1, min_detection_confidence=0.7, min_tracking_confidence=0.7)
mp_draw = mp.solutions.drawing_utils

# Global variables
canvas = None
prev_x, prev_y = 0, 0
zoom_factor = 1.0
zoom_step = 0.05
max_zoom = 2.0
min_zoom = 0.5

# Function to check if index and middle fingers are up (zoom in gesture)
def is_zoom_in_gesture(landmarks):
    return landmarks[8][1] < landmarks[6][1] and \
        landmarks[12][1] < landmarks[10][1] and \
        landmarks[16][1] > landmarks[14][1] and \
        landmarks[20][1] > landmarks[18][1]

# Function to check if thumb and pinky fingers are extended (zoom out gesture)
def is_zoom_out_gesture(landmarks):
    return landmarks[4][0] < landmarks[2][0] and \
        landmarks[20][0] > landmarks[18][0] and \
        landmarks[8][1] > landmarks[6][1] and \
        landmarks[12][1] > landmarks[10][1] and \
        landmarks[16][1] > landmarks[14][1]

# Function to check if the thumb and index finger are pinching (close together for erasing)
def is_pinching(landmarks, threshold=30):
    thumb_tip = landmarks[4]
    index_tip = landmarks[8]
    distance = math.hypot(index_tip[0] - thumb_tip[0], index_tip[1] - thumb_tip[1])
    return distance < threshold

def process_frame(frame):
    global canvas, prev_x, prev_y, zoom_factor

    frame = cv2.flip(frame, 1)
    img_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

    if canvas is None:
        canvas = np.zeros_like(frame)

    results = hands.process(img_rgb)

    if results.multi_hand_landmarks:
        for hand_landmarks in results.multi_hand_landmarks:
            mp_draw.draw_landmarks(frame, hand_landmarks, mp_hands.HAND_CONNECTIONS)

            h, w, _ = frame.shape
            landmarks = [(int(lm.x * w), int(lm.y * h)) for lm in hand_landmarks.landmark]

            index_tip = landmarks[8]
            cx, cy = index_tip

            if is_zoom_in_gesture(landmarks):
                zoom_factor = min(max_zoom, zoom_factor + zoom_step)
            elif is_zoom_out_gesture(landmarks):
                zoom_factor = max(min_zoom, zoom_factor - zoom_step)

            if is_pinching(landmarks):
                eraser_radius = 40
                cv2.circle(canvas, (cx, cy), eraser_radius, (0, 0, 0), -1)
            elif landmarks[8][1] < landmarks[6][1] and landmarks[12][1] > landmarks[10][1]:
                if prev_x == 0 and prev_y == 0:
                    prev_x, prev_y = cx, cy
                else:
                    cv2.line(canvas, (prev_x, prev_y), (cx, cy), (255, 0, 0), 5)
                    prev_x, prev_y = cx, cy
            else:
                prev_x, prev_y = 0, 0

    h, w, _ = frame.shape
    center_x, center_y = w // 2, h // 2
    half_w = int(w // (2 * zoom_factor))
    half_h = int(h // (2 * zoom_factor))

    if zoom_factor > 1.0:
        frame_zoomed = frame[center_y - half_h:center_y + half_h, center_x - half_w:center_x + half_w]
        frame_zoomed = cv2.resize(frame_zoomed, (w, h))
    else:
        frame_zoomed = frame

    frame_zoomed = cv2.addWeighted(frame_zoomed, 0.5, canvas, 0.5, 0)

    return frame_zoomed

def generate_frames():
    cap = cv2.VideoCapture(0)
    while True:
        success, frame = cap.read()
        if not success:
            break
        else:
            frame = process_frame(frame)
            ret, buffer = cv2.imencode('.jpg', frame)
            frame = buffer.tobytes()
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')


BASE_DIR = os.path.dirname(os.path.abspath(__file__))
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/src/<path:filename>')
def serve_src_files(filename):
    return send_from_directory(os.path.join(BASE_DIR, 'src'), filename)

@app.route('/SmartBoard')
def video_feed():
    return Response(generate_frames(),
                    mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == '__main__':
    app.run(debug=True)