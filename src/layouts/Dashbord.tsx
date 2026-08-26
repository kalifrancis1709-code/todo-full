import Logo from "../assets/react.svg";

const [editId, setEditId] = useState<number | null>(null);
export default function Dashbord() {
  return (
    <div className="main">
      <div className="colonne1">
        <div className="leading">
          <img src={Logo} alt="Logo" />
          <span className="app-name">TODO</span>
        </div>
        <div className="side-menu">
          <ul className="menu-list">
            <li className="menu-item">Liste des taches </li>
            <li className="menu-item">Créer une tache</li>
          </ul>
        </div>
      </div>
      <div className="colonne2">
        <div className="menubar">3</div>
        <div className="main-content">
          <h1></h1>
          <ul>
            {taches.map((t) => (
              <li key={t.id}>
                {t.designation}
                <button onClick={() => modifier(t.id)}>modifier</button>
                <button onClick={() => supprimer(t.id)}>X</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
