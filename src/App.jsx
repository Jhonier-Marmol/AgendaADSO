import "./App.css"; // Importamos estilos de la app
import ContactoCard from "./components/ContactoCard"; // Importamos el componente hijo

export default function App() {
  // Esta es nuestra "base de datos" inicial quemada en el código
  const contactos = [
    {
      id: 1,
      nombre: "Jaider boa",
      telefono: "300 123 4567",
      correo: "jaiderboa@sena.edu.co",
      etiqueta: "Compañero",
    },
    {
      id: 2,
      nombre: "Gustavo Bolaños",
      telefono: "301 987 6543",
      correo: "juliangomez@sena.edu.co",
      etiqueta: "Instructor",
    },
    {
      id: 3,
      nombre: "Diego Sepulveda",
      telefono: "320 555 7788",
      correo: "Diegosepulveda@sena.edu.co",
      etiqueta: "Cliente",
    },
    {
      id: 4,
      nombre: "Henry Marmol",
      telefono: "313 345 6789",
      correo: "Henrymarmol@gmail.com",
      etiqueta: "Papá"
    },
    {
      id: 5,
      nombre: "Miguel Acevedo",
      telefono: "301 263 8236",
      correo: "Miguelacevedo@gmail.com",
      etiqueta: "Compañero"
    }
  ];

  return (
    <main className="app-container">
      <h1 className="app-title">Agenda ADSO 📒</h1>

      <p className="app-subtitle">Contactos guardados</p>

      {/* Recorremos el arreglo contactos y pintamos una tarjeta por cada uno */}
      {contactos.map((c) => (
        <ContactoCard
          key={c.id}            // key única para React
          nombre={c.nombre}     // prop nombre
          telefono={c.telefono} // prop telefono
          correo={c.correo}     // prop correo
          etiqueta={c.etiqueta} // prop etiqueta (Cliente, Instructor, etc.)
        />
      ))}

      <p className="app-nota">
        (Versión 0.1 - solo lectura, sin agregar ni editar todavía)
      </p>
    </main>
  );
}
