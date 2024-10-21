import React from 'react';

export const SmartBoard = () => {
    return(
        <div>
            <img src="{{ url_for('video_feed') }}" width="100%" height="900px"></img>
        </div>
    )
}