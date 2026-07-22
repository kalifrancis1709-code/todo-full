import { useState } from "react";

export default function Form() {
  const [nom, setNom] = useState("");

  return (
    <div>
      <input type="text" value={nom} onChange={(e) => setNom(e.target.value)} />
      <p>Bonjour {nom || "inconnu"}</p>
    </div>
  );
}
