import {useAuth } from "@clerk/clerk-react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from './Home/Home';
import Chatbot from './Chatbot/Chatbot';
import Login from "./Login/Login";
import Events from "./Events/Events";
import HostEvent from "./hostevents/Hostevents";

export default function App() {
  return (
      <Router>
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/chatbot" element={<PrivateRoute><Chatbot /></PrivateRoute>} />
          <Route path="/events" element={<PrivateRoute><Events /></PrivateRoute>} />
          <Route path="/hostevents" element={<PrivateRoute><HostEvent/></PrivateRoute>} />
          <Route path="/chabot" element={<PrivateRoute><Chatbot/></PrivateRoute>} />
          <Route path="*" element={<Login/>} />
        </Routes>
      </Router>
  );
}

function PrivateRoute({ children }: { children: JSX.Element }) {
  const { isSignedIn } = useAuth();

  if (!isSignedIn) {
    return <Navigate to="/login" />;
  }
  return children;
}