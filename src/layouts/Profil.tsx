import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuthHeader } from "../auth/jwt/auth";
import type { User } from "../Interfaces/User";

export default function Profil() {
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);
  const [editMode, setEditMode] = useState(false);

  // Champs du formulaire d'infos
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");

  // Champs mot de passe
  const [ancienMdp, setAncienMdp] = useState("");
  const [nouveauMdp, setNouveauMdp] = useState("");
  const [confirmMdp, setConfirmMdp] = useState("");
  const [mdpMessage, setMdpMessage] = useState("");

  // Photo
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  function fetchProfil() {
    fetch("http://localhost:3000/users/me", {
      headers: getAuthHeader(),
    })
      .then((res) => {
        if (res.status === 401) {
          navigate("/login");
          return Promise.reject("Non authentifié");
        }
        if (!res.ok) {
          return Promise.reject(`Erreur ${res.status}`);
        }
        return res.json();
      })
      .then((data: User) => {
        setUser(data);
        setNom(data.nom);
        setPrenom(data.prenom);
        setEmail(data.email);
      })
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    fetchProfil();
  }, []);

  function enregistrerInfos() {
    fetch("http://localhost:3000/users/me", {
      method: "PATCH",
      headers: getAuthHeader(),
      body: JSON.stringify({ nom, prenom, email }),
    })
      .then((res) => {
        if (res.status === 401) {
          navigate("/login");
          return Promise.reject("Non authentifié");
        }
        if (!res.ok) {
          return Promise.reject(`Erreur ${res.status}`);
        }
        return res.json();
      })
      .then((data: User) => {
        setUser(data);
        setEditMode(false);
      })
      .catch((err) => console.error(err));
  }

  function changerMotDePasse() {
    setMdpMessage("");

    if (nouveauMdp !== confirmMdp) {
      setMdpMessage("Les deux mots de passe ne correspondent pas.");
      return;
    }

    fetch("http://localhost:3000/users/me/password", {
      method: "PATCH",
      headers: getAuthHeader(),
      body: JSON.stringify({
        ancienMotDePasse: ancienMdp,
        nouveauMotDePasse: nouveauMdp,
      }),
    })
      .then((res) => {
        if (res.status === 401) {
          navigate("/login");
          return Promise.reject("Non authentifié");
        }
        if (!res.ok) {
          return Promise.reject(`Erreur ${res.status}`);
        }
        setMdpMessage("Mot de passe modifié avec succès.");
        setAncienMdp("");
        setNouveauMdp("");
        setConfirmMdp("");
      })
      .catch((err) => {
        console.error(err);
        setMdpMessage("Erreur lors du changement de mot de passe.");
      });
  }

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
  }

  function uploaderPhoto() {
    if (!photoFile) return;

    const formData = new FormData();
    formData.append("photo", photoFile);

    // On récupère les headers d'auth mais on retire Content-Type
    // pour laisser le navigateur définir le boundary multipart
    const headers = getAuthHeader() as Record<string, string>;
    const { "Content-Type": _omit, ...authOnly } = headers;

    fetch("http://localhost:3000/users/me/photo", {
      method: "POST",
      headers: authOnly,
      body: formData,
    })
      .then((res) => {
        if (res.status === 401) {
          navigate("/login");
          return Promise.reject("Non authentifié");
        }
        if (!res.ok) {
          return Promise.reject(`Erreur ${res.status}`);
        }
        return res.json();
      })
      .then((data: User) => {
        setUser(data);
        setPhotoFile(null);
        setPhotoPreview(null);
      })
      .catch((err) => console.error(err));
  }

  if (!user) {
    return (
      <div className="page-main">
        <p>Chargement du profil...</p>
      </div>
    );
  }

  return (
    <div className="page-main">
      <h1>Mon Profil</h1>

      <section className="profil-photo">
        <img
          src={photoPreview || user.photoUrl || "/default-avatar.png"}
          alt="Photo de profil"
          width={120}
          height={120}
          style={{ borderRadius: "50%", objectFit: "cover" }}
        />
        <div>
          <input type="file" accept="image/*" onChange={handlePhotoChange} />
          {photoFile && (
            <button onClick={uploaderPhoto}>📤 Enregistrer la photo</button>
          )}
        </div>
      </section>

      <section className="profil-infos">
        {!editMode ? (
          <>
            <p>Nom : {user.nom}</p>
            <p>Prénom : {user.prenom}</p>
            <p>Email : {user.email}</p>
            <button onClick={() => setEditMode(true)}>✍️ Modifier</button>
          </>
        ) : (
          <>
            <div>
              <label>Nom</label>
              <input value={nom} onChange={(e) => setNom(e.target.value)} />
            </div>
            <div>
              <label>Prénom</label>
              <input
                value={prenom}
                onChange={(e) => setPrenom(e.target.value)}
              />
            </div>
            <div>
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button onClick={enregistrerInfos}>💾 Enregistrer</button>
            <button onClick={() => setEditMode(false)}>Annuler</button>
          </>
        )}
      </section>

      <section className="profil-password">
        <h2>Changer le mot de passe</h2>
        <div>
          <label>Ancien mot de passe</label>
          <input
            type="password"
            value={ancienMdp}
            onChange={(e) => setAncienMdp(e.target.value)}
          />
        </div>
        <div>
          <label>Nouveau mot de passe</label>
          <input
            type="password"
            value={nouveauMdp}
            onChange={(e) => setNouveauMdp(e.target.value)}
          />
        </div>
        <div>
          <label>Confirmer le nouveau mot de passe</label>
          <input
            type="password"
            value={confirmMdp}
            onChange={(e) => setConfirmMdp(e.target.value)}
          />
        </div>
        <button onClick={changerMotDePasse}>🔒 Changer le mot de passe</button>
        {mdpMessage && <p>{mdpMessage}</p>}
      </section>
    </div>
  );
}
