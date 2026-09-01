// Importamos React y el hook useState para manejar estados locales
import { useEffect, useState } from "react";

// Componente FormularioContacto
// Se reutiliza para crear y editar contactos
function FormularioContacto({
  onAgregar,
  contactoEnEdicion,
  onActualizar,
  onCancelarEdicion,
}) {
  // Estado principal del formulario
  const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    correo: "",
    etiqueta: "",
  });

  // Estado para los mensajes de error
  const [errores, setErrores] = useState({
    nombre: "",
    telefono: "",
    correo: "",
  });

  // Estado para indicar si se está guardando
  const [enviando, setEnviando] = useState(false);

  // ==========================================
  // CARGAR DATOS CUANDO SE SELECCIONA UN
  // CONTACTO PARA EDITAR
  // ==========================================

  useEffect(() => {
    if (contactoEnEdicion) {
      setForm({
        nombre: contactoEnEdicion.nombre || "",
        telefono: contactoEnEdicion.telefono || "",
        correo: contactoEnEdicion.correo || "",
        etiqueta: contactoEnEdicion.etiqueta || "",
      });

      // Limpiamos errores al entrar en modo edición
      setErrores({
        nombre: "",
        telefono: "",
        correo: "",
      });
    } else {
      // Si no hay contacto en edición, dejamos el formulario vacío
      setForm({
        nombre: "",
        telefono: "",
        correo: "",
        etiqueta: "",
      });

      setErrores({
        nombre: "",
        telefono: "",
        correo: "",
      });
    }
  }, [contactoEnEdicion]);

  // ==========================================
  // CAMBIO DE INPUTS
  // ==========================================

  const onChange = (e) => {
    const { name, value } = e.target;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  // ==========================================
  // VALIDACIÓN
  // ==========================================

  function validarFormulario() {
    const nuevosErrores = {
      nombre: "",
      telefono: "",
      correo: "",
    };

    if (!form.nombre.trim()) {
      nuevosErrores.nombre = "El nombre es obligatorio.";
    }

    if (!form.telefono.trim()) {
      nuevosErrores.telefono = "El teléfono es obligatorio.";
    }

    if (!form.correo.trim()) {
      nuevosErrores.correo = "El correo es obligatorio.";
    } else if (!form.correo.includes("@")) {
      nuevosErrores.correo = "El correo debe contener @.";
    }

    setErrores(nuevosErrores);

    return (
      !nuevosErrores.nombre &&
      !nuevosErrores.telefono &&
      !nuevosErrores.correo
    );
  }

  // ==========================================
  // ENVÍO DEL FORMULARIO
  // ==========================================

  const onSubmit = async (e) => {
    e.preventDefault();

    const esValido = validarFormulario();

    if (!esValido) return;

    try {
      setEnviando(true);

      // ========================================
      // MODO EDICIÓN
      // ========================================

      if (contactoEnEdicion) {
        await onActualizar({
          ...form,
          id: contactoEnEdicion.id,
        });

        // Limpiamos el formulario y salimos
        // del modo edición
        setForm({
          nombre: "",
          telefono: "",
          correo: "",
          etiqueta: "",
        });

        setErrores({
          nombre: "",
          telefono: "",
          correo: "",
        });

        onCancelarEdicion();

      } else {
        // ======================================
        // MODO CREACIÓN
        // ======================================

        await onAgregar(form);

        // Esperamos 3 segundos como en tu código original
        await new Promise((resolve) =>
          setTimeout(resolve, 3000)
        );

        // Limpiamos el formulario
        setForm({
          nombre: "",
          telefono: "",
          correo: "",
          etiqueta: "",
        });

        setErrores({
          nombre: "",
          telefono: "",
          correo: "",
        });
      }

    } finally {
      setEnviando(false);
    }
  };

  // ==========================================
  // JSX
  // ==========================================

  return (
    <form
      className="bg-white shadow-sm rounded-2xl p-6 space-y-4 mb-8"
      onSubmit={onSubmit}
    >

      {/* Título dinámico */}
      <h2 className="text-lg font-semibold text-gray-900 mb-2">
        {contactoEnEdicion
          ? "Editar contacto"
          : "Nuevo contacto"}
      </h2>

      {/* ======================================
          NOMBRE
      ====================================== */}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nombre *
        </label>

        <input
          className="w-full rounded-xl border-gray-300 focus:ring-purple-500 focus:border-purple-500"
          name="nombre"
          placeholder="Ej: Camila Pérez"
          value={form.nombre}
          onChange={onChange}
        />

        {errores.nombre && (
          <p className="mt-1 text-xs text-red-600">
            {errores.nombre}
          </p>
        )}
      </div>

      {/* ======================================
          TELÉFONO
      ====================================== */}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Teléfono *
        </label>

        <input
          className="w-full rounded-xl border-gray-300 focus:ring-purple-500 focus:border-purple-500"
          name="telefono"
          placeholder="Ej: 300 123 4567"
          value={form.telefono}
          onChange={onChange}
        />

        {errores.telefono && (
          <p className="mt-1 text-xs text-red-600">
            {errores.telefono}
          </p>
        )}
      </div>

      {/* ======================================
          CORREO
      ====================================== */}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Correo *
        </label>

        <input
          className="w-full rounded-xl border-gray-300 focus:ring-purple-500 focus:border-purple-500"
          name="correo"
          placeholder="Ej: camila@sena.edu.co"
          value={form.correo}
          onChange={onChange}
        />

        {errores.correo && (
          <p className="mt-1 text-xs text-red-600">
            {errores.correo}
          </p>
        )}
      </div>

      {/* ======================================
          ETIQUETA
      ====================================== */}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Etiqueta (opcional)
        </label>

        <input
          className="w-full rounded-xl border-gray-300 focus:ring-purple-500 focus:border-purple-500"
          name="etiqueta"
          placeholder="Ej: Trabajo"
          value={form.etiqueta}
          onChange={onChange}
        />
      </div>

      {/* ======================================
          BOTONES
      ====================================== */}

      <div className="pt-2 flex flex-col md:flex-row gap-2">

        {/* Botón principal */}
        <button
          type="submit"
          disabled={enviando}
          className="w-full md:w-auto bg-purple-600 hover:bg-purple-700
                     disabled:bg-purple-300 disabled:cursor-not-allowed
                     text-white px-6 py-3 rounded-xl font-semibold shadow-sm"
        >
          {enviando
            ? "Guardando..."
            : contactoEnEdicion
            ? "Guardar cambios"
            : "Agregar contacto"}
        </button>

        {/* Botón cancelar: SOLO aparece en edición */}
        {contactoEnEdicion && (
          <button
            type="button"
            onClick={onCancelarEdicion}
            disabled={enviando}
            className="w-full md:w-auto bg-gray-200 hover:bg-gray-300
                       disabled:opacity-50
                       text-gray-700 px-6 py-3 rounded-xl font-semibold"
          >
            Cancelar edición
          </button>
        )}

      </div>
    </form>
  );
}

// Exportamos el componente
export default FormularioContacto;