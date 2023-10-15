import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import "./styles.css";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import TextEditor from "./components/TextEditor";
import Footer from "./components/Footer";
import Login from "./components/Login";
import { AuthProvider } from "./AuthContext"; // Importe o AuthProvider
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          {" "}
          {/* Envolve a aplicação com o AuthProvider */}
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/editor"
              element={<ProtectedRoute element={<TextEditor />} />}
            />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
          <Footer />
        </AuthProvider>
      </Router>
    </div>
  );
}
