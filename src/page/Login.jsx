import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export default function Login() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [mensaje, setMensaje] = useState("")
  const { login } = useAuth()
  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault()

    if (email === "admin@sena.com" && password === "1234") {

      login()
      setMensaje("Inicio de sesión exitoso")

      navigate("/")

    } else {

      setMensaje("Credenciales incorrectas")

    }
  }
  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">
        <div className="text-center mb-6">
          <div className="mx-auto h-16 w-16 rounded-2xl bg-purple-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
            A
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 mt-4">
            Login Agenda ADSO
          </h1>
          <p className="text-gray-500 mt-2">
            Inicia sesión para acceder a la agenda
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Correo
            </label>
            <input
              type="email"
              placeholder="admin@sena.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contraseña
            </label>
            <input
              type="password"
              placeholder="1234"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-xl transition"
          >
            Iniciar sesión
          </button>
        </form>
        {mensaje && (
          <div
            className={`mt-4 rounded-xl px-4 py-3 text-sm text-center font-medium ${
              mensaje === "Inicio de sesión exitoso"
                ? "bg-green-50 text-green-700 border border-green-200"
                : "bg-red-50 text-red-700 border border-red-200"
            }`}
          >
            {mensaje}
          </div>

        )}
        <div className="mt-6 text-center text-xs text-gray-500">
          <p>Credenciales de prueba</p>
          <p className="mt-1">
            admin@sena.com / 1234
          </p>
        </div>
      </div>
    </div>
  )
}