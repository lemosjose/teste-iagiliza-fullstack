import { BrowserRouter, Routes, Route } from "react-router"
import Landing from "./pages/Landing"
import Chat from "./pages/Chat"
import Login from "./pages/Login"
import Register from "./pages/Register"
import UserView from "./pages/UserView"
import ProtectedRoute from "./pages/Protected"

import { ThemeProvider } from "./components/dark-mode/provider"
import { ModeToggle } from "./components/dark-mode/toggle"

function App() {
  return (
    <ThemeProvider>
      <ModeToggle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />

          <Route path="/messages" element={
            <ProtectedRoute> 
              <Chat />
            </ProtectedRoute>
          }
          />

          <Route path="/register" element={<Register />} />

          <Route path="/me" element={
            <ProtectedRoute>
              <UserView />
            </ProtectedRoute>
          } />

        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;

