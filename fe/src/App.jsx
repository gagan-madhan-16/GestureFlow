import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import {ForgotPassword} from "./pages/ForgotPassword"
import {Verification} from "./pages/Verification"
import {ResetPassword} from "./pages/ResetPassword"
import { Landing } from "./pages/Landing";
import Tutorial from "./pages/Tutorial";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element={<Signup />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/forgotpassword' element={<ForgotPassword />} />
          <Route path='/verification' element={<Verification />} />
          <Route path='/reset-password' element={<ResetPassword />} />
          <Route path='/tutorial' element={<Tutorial />} />
          <Route path='/' element={<Landing />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
