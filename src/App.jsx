// Archivo: src/App.jsx
// Componente principal de la aplicación Agenda ADSO.
// Se encarga de:
// - Cargar la lista de contactos desde la API.
// - Manejar estados globales.
// - Crear, editar y eliminar contactos.
// - Buscar y ordenar contactos.
// - Conectar el formulario y las tarjetas de contactos.

import { useEffect, useState } from "react";

// Importamos las funciones de la API
import {
  listarContactos,
  crearContacto,
  eliminarContactoPorId,
  actualizarContacto,
} from "./api";

// Importamos la configuración global
import { APP_INFO } from "./config";

// Importamos componentes hijos
import FormularioContacto from "./components/FormularioContacto";
import ContactoCard from "./components/ContactoCard";

function App() {
  // ==========================================
  // ESTADOS
  // ==========================================

  // Lista de contactos obtenidos desde la API
  const [contactos, setContactos] = useState([]);

  // Estado de carga inicial
  const [cargando, setCargando] = useState(true);

  // Estado para mensajes de error
  const [error, setError] = useState("");

  // Estado para la búsqueda
  const [busqueda, setBusqueda] = useState("");

  // Estado para el ordenamiento
  const [ordenAsc, setOrdenAsc] = useState(true);

  // Estado para saber qué contacto se está editando
  // null = modo creación
  // objeto = modo edición
  const [contactoEnEdicion, setContactoEnEdicion] =
    useState(null);

  // ==========================================
  // GET - CARGAR CONTACTOS
  // ==========================================

  useEffect(() => {
    const cargarContactos = async () => {
      try {
        setCargando(true);
        setError("");

        // Llamamos a la API para obtener los contactos
        const data = await listarContactos();

        // Guardamos los contactos en el estado
        setContactos(data);
      } catch (error) {
        console.error(
          "Error al cargar contactos:",
          error
        );

        setError(
          "No se pudieron cargar los contactos. Verifica que el servidor esté encendido e intenta de nuevo."
        );
      } finally {
        setCargando(false);
      }
    };

    cargarContactos();
  }, []);

  // ==========================================
  // POST - AGREGAR CONTACTO
  // ==========================================

  const onAgregarContacto = async (nuevoContacto) => {
    try {
      setError("");

      // Enviamos el nuevo contacto a la API
      const creado = await crearContacto(nuevoContacto);

      // Agregamos el contacto creado a la lista
      setContactos((prev) => [
        ...prev,
        creado,
      ]);

    } catch (error) {
      console.error(
        "Error al crear contacto:",
        error
      );

      setError(
        "No se pudo guardar el contacto. Verifica tu conexión o el estado del servidor e intenta nuevamente."
      );

      throw error;
    }
  };

  // ==========================================
  // EDITAR - SELECCIONAR CONTACTO
  // ==========================================

  // Se ejecuta cuando el usuario hace clic en "Editar"
  const onEditarClick = (contacto) => {
    // Guardamos el contacto seleccionado
    // en el estado de edición
    setContactoEnEdicion(contacto);

    // Limpiamos cualquier error anterior
    setError("");
  };

  // ==========================================
  // CANCELAR EDICIÓN
  // ==========================================

  const onCancelarEdicion = () => {
    // Volvemos a null para regresar
    // al modo creación
    setContactoEnEdicion(null);

    // Limpiamos errores
    setError("");
  };

  // ==========================================
  // PUT - ACTUALIZAR CONTACTO
  // ==========================================

  const onActualizarContacto = async (
    contactoActualizado
  ) => {
    try {
      setError("");

      // Extraemos el id del contacto
      const { id, ...datos } = contactoActualizado;

      // Enviamos los datos actualizados a la API
      const actualizado = await actualizarContacto(
        id,
        datos
      );

      // Actualizamos el contacto dentro del arreglo
      setContactos((prev) =>
        prev.map((contacto) =>
          contacto.id === id
            ? actualizado
            : contacto
        )
      );

      // Limpiamos el estado de edición
      setContactoEnEdicion(null);

    } catch (error) {
      console.error(
        "Error al actualizar contacto:",
        error
      );

      setError(
        "No se pudo actualizar el contacto. Verifica el servidor e intenta nuevamente."
      );

      // Relanzamos el error para que el formulario
      // pueda controlar correctamente el estado
      throw error;
    }
  };

  // ==========================================
  // DELETE - ELIMINAR CONTACTO
  // ==========================================

  const onEliminarContacto = async (id) => {
    try {
      setError("");

      // Eliminamos el contacto de la API
      await eliminarContactoPorId(id);

      // Eliminamos el contacto del estado local
      setContactos((prev) =>
        prev.filter(
          (contacto) => contacto.id !== id
        )
      );

      // Si el contacto eliminado estaba en edición,
      // cancelamos el modo edición
      if (
        contactoEnEdicion &&
        contactoEnEdicion.id === id
      ) {
        setContactoEnEdicion(null);
      }

    } catch (error) {
      console.error(
        "Error al eliminar contacto:",
        error
      );

      setError(
        "No se pudo eliminar el contacto. Vuelve a intentarlo o verifica el servidor."
      );
    }
  };

  // ==========================================
  // BÚSQUEDA
  // ==========================================

  const contactosFiltrados = contactos.filter((c) => {
    const termino = busqueda.toLowerCase();

    const nombre = (
      c.nombre || ""
    ).toLowerCase();

    const correo = (
      c.correo || ""
    ).toLowerCase();

    const etiqueta = (
      c.etiqueta || ""
    ).toLowerCase();

    const telefono = (
      c.telefono || ""
    ).toLowerCase();

    return (
      nombre.includes(termino) ||
      correo.includes(termino) ||
      etiqueta.includes(termino) ||
      telefono.includes(termino)
    );
  });

  // ==========================================
  // ORDENAMIENTO
  // ==========================================

  const contactosOrdenados = [
    ...contactosFiltrados,
  ].sort((a, b) => {
    const nombreA = (
      a.nombre || ""
    ).toLowerCase();

    const nombreB = (
      b.nombre || ""
    ).toLowerCase();

    if (nombreA < nombreB) {
      return ordenAsc ? -1 : 1;
    }

    if (nombreA > nombreB) {
      return ordenAsc ? 1 : -1;
    }

    return 0;
  });

  // ==========================================
  // JSX
  // ==========================================

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="max-w-4xl mx-auto px-4 py-8">

        {/* ======================================
            ENCABEZADO
        ====================================== */}

        <header className="mb-8">

          <p className="text-xs tracking-[0.3em] text-gray-500 uppercase">
            Desarrollo Web ReactJS Ficha{" "}
            {APP_INFO.ficha}
          </p>

          <h1 className="text-4xl font-extrabold text-gray-900 mt-2">
            {APP_INFO.titulo}
          </h1>

          <p className="text-sm text-gray-600 mt-1">
            {APP_INFO.subtitulo}
          </p>

        </header>

        {/* ======================================
            MENSAJE DE ERROR
        ====================================== */}

        {error && (
          <div className="mb-4 rounded-xl bg-red-50 border border-red-200 px-4 py-3">

            <p className="text-sm font-medium text-red-700">
              {error}
            </p>

          </div>
        )}

        {/* ======================================
            CARGANDO
        ====================================== */}

        {cargando ? (

          <p className="text-sm text-gray-500">
            Cargando contactos...
          </p>

        ) : (

          <>

            {/* ==================================
                FORMULARIO CREAR / EDITAR
            ================================== */}

            <FormularioContacto
              onAgregar={onAgregarContacto}
              contactoEnEdicion={contactoEnEdicion}
              onActualizar={onActualizarContacto}
              onCancelarEdicion={
                onCancelarEdicion
              }
            />

            {/* ==================================
                BÚSQUEDA Y ORDENAMIENTO
            ================================== */}

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-2">

              {/* Barra de búsqueda */}
              <input
                type="text"
                className="w-full md:flex-1 rounded-xl border-gray-300 focus:ring-purple-500 focus:border-purple-500 text-sm px-4 py-2 border"
                placeholder="Buscar por nombre, correo, etiqueta o teléfono..."
                value={busqueda}
                onChange={(e) =>
                  setBusqueda(e.target.value)
                }
              />

              {/* Botón de ordenamiento */}
              <button
                type="button"
                onClick={() =>
                  setOrdenAsc(
                    (prev) => !prev
                  )
                }
                className="bg-gray-100 text-gray-700 text-sm px-4 py-2 rounded-xl border border-gray-200 hover:bg-gray-200"
              >
                {ordenAsc
                  ? "Ordenar Z-A"
                  : "Ordenar A-Z"}
              </button>

            </div>

            {/* ==================================
                CONTADOR
            ================================== */}

            <div className="mb-4">

              <p className="text-xs text-gray-500 font-medium">

                Mostrando{" "}
                {contactosOrdenados.length}{" "}

                {contactosOrdenados.length === 1
                  ? "contacto"
                  : "contactos"}

              </p>

            </div>

            {/* ==================================
                LISTADO DE CONTACTOS
            ================================== */}

            <section className="space-y-4">

              {contactosOrdenados.length === 0 ? (

                <p className="text-sm text-gray-500">
                  No se encontraron contactos
                  que coincidan con la búsqueda.
                </p>

              ) : (

                contactosOrdenados.map((c) => (

                  <ContactoCard
                    key={c.id}

                    id={c.id}

                    nombre={c.nombre}

                    telefono={c.telefono}

                    correo={c.correo}

                    etiqueta={c.etiqueta}

                    // Botón Editar
                    onEditar={() =>
                      onEditarClick(c)
                    }

                    // Botón Eliminar
                    onEliminar={() =>
                      onEliminarContacto(c.id)
                    }
                  />

                ))

              )}

            </section>

          </>

        )}

        {/* ======================================
            PIE DE PÁGINA
        ====================================== */}

        <footer className="mt-8 text-xs text-gray-400">

          <p>
            Desarrollo Web – ReactJS |
            Proyecto Agenda ADSO
          </p>

          <p>
            Instructor: Gustavo Adolfo Bolaños Dorado
          </p>

        </footer>

      </div>

    </div>
  );
}

// Exportamos App
export default App;