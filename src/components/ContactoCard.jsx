// src/components/ContactoCard.jsx

export default function ContactoCard({
  id,
  nombre,
  telefono,
  correo,
  etiqueta,
  onEliminar
}) {
  return (
    <article className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">

      {/* Nombre */}
      <h3 className="text-xl font-bold text-gray-900 mb-3">
        {nombre}
      </h3>

      {/* Información del contacto */}
      <div className="text-gray-700 mb-5 space-y-1">
        <p>
          <strong>Teléfono:</strong> {telefono}
        </p>

        <p>
          <strong>Correo:</strong> {correo}
        </p>

        <p>
          <strong>Etiqueta:</strong> {etiqueta}
        </p>
      </div>

      {/* Botón eliminar */}
      <div className="flex justify-start">
        <button
          onClick={() => onEliminar(id)}
          className="bg-red-500 hover:bg-red-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          Eliminar
        </button>
      </div>

    </article>
  );
}