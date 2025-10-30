import { BrowserRouter, Routes, Route } from "react-router"
import Landing from "./pages/Landing"
import Chat from "./pages/Chat"
import Login from "./pages/Login"
import Register from "./pages/Register"
import UserView from "./pages/UserView"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/messages" element={<Chat />} />
        <Route path="/register" element={<Register />} />
        <Route path="/me" element={<UserView />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

