export default function Pays({
  pays,
}: {
  pays: { nom: string; capital: string; index: number };
}) {
  return (
    <li>
      {pays.index}-Pays: {pays.nom} -- Capital: {pays.capital}
    </li>
  );
}
