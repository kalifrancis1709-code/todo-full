import { useState } from "react";
import Form from "./Form";

export default function App() {
  const [nombre, setNombre] = useState(0);

  return (
    <div>
      <p>Cliqué {nombre} fois</p>
      <button onClick={() => setNombre(nombre + 1)}>Incrémenter</button>
      <button onClick={() => setNombre(0)}>Reinitialiser</button>
      <button onClick={() => setNombre(nombre - 1)}>Décrémenter</button>

      <p>On insert ici un formulaire</p>

      <Form />
    </div>
  );
}
