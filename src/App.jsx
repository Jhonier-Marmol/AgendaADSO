// App.jsx
import { useState, useEffect } from "react";
import FormularioContacto from "./components/FormularioContacto";
import ContactoCard from "./components/ContactoCard";
import {
  listarContactos,
  crearContacto,
  eliminarContactoPorId
} from "./api.js";

export default function App() {
  // Estado con la lista de contactos
  const [contactos, setContactos] = useState([]);

  // GET - Cargar contactos desde JSON Server
  useEffect(() => {
    listarContactos()
      .then(data => setContactos(data))
      .catch(err => console.error(err));
  }, []);

  // POST - Agregar contacto
  const agregarContacto = async (nuevo) => {
    try {
      const contactoCreado = await crearContacto(nuevo);

      setContactos(prev => [...prev, contactoCreado]);
    } catch (error) {
      console.error(error);
    }
  };

  // DELETE - Eliminar contacto
  const eliminarContacto = async (id) => {
    try {
      await eliminarContactoPorId(id);

      setContactos(prev =>
        prev.filter(contacto => contacto.id !== id)
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="min-h-screen py-10 px-4">

      <h1 className="text-4xl font-bold text-center text-purple-600 mb-8">
        Agenda ADSO v3
      </h1>

      <div className="max-w-4xl mx-auto">

        {/* Formulario */}
        <section className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 mb-6">
          <FormularioContacto onAgregar={agregarContacto} />
        </section>

        {/* Lista de contactos */}
        <section className="space-y-4">
          {contactos.map((c) => (
            <ContactoCard
              key={c.id}
              {...c}
              onEliminar={eliminarContacto}
            />
          ))}
        </section>

      </div>
    </main>
  );
}