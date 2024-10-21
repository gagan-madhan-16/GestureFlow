import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import {ForgotPassword} from "./pages/ForgotPassword"
import {Verification} from "./pages/Verification"
import {ResetPassword} from "./pages/ResetPassword"
import { Dashboard } from "./pages/Dashboard";
import { Landing } from "./pages/Landing";
import { RecognizedGesture } from "./pages/recognized_gesture";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element={<Signup />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/forgotpassword' element={<ForgotPassword />} />
          <Route path='/verification' element={<Verification />} />
          <Route path='/reset-password' element={<ResetPassword />} />
          <Route path='/recognized_gesture' element={<RecognizedGesture />} />
          <Route path='/' element={<Landing />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;