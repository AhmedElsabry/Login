import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { LangProvider } from "./auth/AuthLayout";
import LoginPage from "./auth/LoginPage";
import SignupPage from "./auth/SignupPage";

export default function App() {
  return (
    <BrowserRouter>
      <LangProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </LangProvider>
    </BrowserRouter>
  );
}
