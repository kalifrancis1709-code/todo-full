import Dashboard from "./layouts/Dashboard";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import TachesList from "./pages/TachesList";
import TachesForm from "./pages/TachesForm";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profil from "./layouts/Profil";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/signup" element={<Signup />}></Route>

      <Route path="/" element={<Dashboard />}>
        <Route
          index
          element={
            <div>
              <h1>Bienvenue sur le tableau de bord</h1>

              <p>Veillez-vous connecter pour accéder aux fonctionnalités.</p>
            </div>
          }
        />
        <Route path="/profil" element={<Profil />}></Route>
        <Route path="/taches" element={<TachesList />}></Route>
        <Route path="/taches/form" element={<TachesForm />}></Route>
        <Route path="/taches/form/:id" element={<TachesForm />}></Route>
        <Route path="/taches/edit/:tacheId" element={<TachesForm />}></Route>
      </Route>
      <Route path="*" element={<div>Page non trouvée</div>}></Route>
    </Routes>
  );
}
