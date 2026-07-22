export default function App() {
  const connected: boolean = false;
  return (
    <div>
      {connected ? <p>Bienvenue!</p> : <p>Veuillez vous connecter</p>}
      {connected && <button>Se déconnecté</button>}
      {!connected && <button>Se connecté</button>}
    </div>
  );
}
