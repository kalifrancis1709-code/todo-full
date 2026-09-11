export interface User {
  id: number;
  nom: string;
  prénom: string;
  email: string;
  photoUrl: string;
  password: string;
}

export default function User({ nom, prénom, email, photoUrl, password }: User) {
  return (
    <div>
      <p>Nom: {nom}</p>
      <p>Prénom: {prénom}</p>
      <p>Email: {email}</p>
      <p>Photo: {photoUrl}</p>
      <p>Password: {password}</p>
    </div>
  );
}
