// Archivo: src/components/ContactoCard.jsx
// Componente que muestra la información de un contacto.
// Permite editar y eliminar el contacto.

export default function ContactoCard({
  id,
  nombre,
  telefono,
  correo,
  etiqueta,
  onEditar,
  onEliminar,
}) {
  return (
    <article className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">

      {/* Información del contacto */}
      <div className="flex justify-between items-start">

        <div>
          <h3 className="text-xl font-bold text-gray-800">
            {nombre}
          </h3>

          <p className="text-gray-600 mt-2">
             {telefono}
          </p>

          <p className="text-gray-600">
             {correo}
          </p>

          <span className="inline-block bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm mt-2">
            {etiqueta}
          </span>
        </div>

      </div>

      {/* Botones */}
      <div className="flex gap-2 mt-4">

        {/* Botón Editar */}
        <button
          type="button"
          onClick={() => onEditar()}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Editar
        </button>

        {/* Botón Eliminar */}
        <button
          type="button"
          onClick={() => onEliminar()}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          Eliminar
        </button>

      </div>

    </article>
  );
}