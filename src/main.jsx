import ReactDOM from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router-dom"

import App from "./App.jsx"
import Login from "./page/Login.jsx"
import ProtectedRoute from "./components/ProtectedRoute.jsx"
import { AuthProvider } from "./context/AuthContext.jsx"

import "./index.css"

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <BrowserRouter>

    <AuthProvider>

      <Routes>

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <App />
            </ProtectedRoute>
          }
        />

      </Routes>

    </AuthProvider>

  </BrowserRouter>
)