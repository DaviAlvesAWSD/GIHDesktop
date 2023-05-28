import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom';

import { Login } from '../pages/Login';
import { Home } from '../pages/Home';
import { Solicitacoes } from '../pages/Solicitacoes';
import { Perfil } from '../pages/Perfil';
import { Usuarios } from '../pages/Usuarios';

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Home" element={<Home />}>
          <Route path="/Home/Solicitacoes" element={<Solicitacoes />} />
          <Route path="/Home/Usuarios" element={<Usuarios />} />
          <Route path="/Home/Perfil" element={<Perfil />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
