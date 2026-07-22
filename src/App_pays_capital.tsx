import Pays from "./Pays";

export default function App() {
  const nom: string = "Alice";
  const liste = [
    { nom: "Togo", capital: "Lomé" },
    { nom: "Benin", capital: "Porto Novo" },
    { nom: "Ghana", capital: "Accra" },
  ];

  let index = 0;

  function afficher(elmt: Pays) {
    index++;
    return <Pays pays={{ ...elmt, index }} />;
  }

  return (
    <div>
      <div>Afficher un texte</div>
      <p>le nom de l'apprenant est: {nom}</p>
      <div>Afficher une liste</div>
      <ul>{liste.map((elmt) => afficher(elmt))}</ul>
    </div>
  );
}

export interface Pays {
  nom: string;
  capital: string;
}
