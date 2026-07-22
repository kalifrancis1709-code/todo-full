import { useEffect, useState } from "react";

export default function App() {
  const [heure, setHeure] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setHeure(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  return <p>{heure.toLocaleTimeString()}</p>;
}
