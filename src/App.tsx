import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/login/Login";
import Signup from "./pages/singup/Signup";
import HotelDashboard from "./pages/dashboard/Dashboard";
import Booking from "./pages/dashboard/Booking";
import { AuthProvider } from "./context/AuthContext/AuthContext";
import ProtectedRoute from "./components/ProtextRoute";
import Navbar from "./components/Nav";

function App() {
  return (
    <AuthProvider>
      <Navbar/>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<HotelDashboard />} />
            <Route path="/booking/:id" element={<Booking />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
