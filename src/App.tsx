import * as React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/screens/Login';
import Main from './components/screens/Main';
import Abastecimento from './components/screens/Abastecimento';
import Usuario from './components/screens/Usuario';
import Maquinario from './components/screens/Maquinario';
import Relatorio from './components/screens/Relatorio';
import RelatorioNovo from './components/screens/RelatorioNovo';
import Fornecedor from './components/screens/Fornecedor';
import PrivateRoute from './components/auth/PrivateRoute'; // ✅ Importação

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Pública */}
        <Route path="/" element={<Login />} />

        {/* Protegida por token (acesso geral para autenticados) */}
        <Route path="/main" element={
          <PrivateRoute allowedRoles={["administrador", "operador"]}>
            <Main />
          </PrivateRoute>
        } />

        {/* Protegidas por função */}
        <Route path="/abastecimento" element={
          <PrivateRoute allowedRoles={["operador", "administrador"]}>
            <Abastecimento />
          </PrivateRoute>
        } />

        <Route path="/usuario" element={
          <PrivateRoute allowedRoles={["administrador"]}>
            <Usuario />
          </PrivateRoute>
        } />

        <Route path="/maquinario" element={
          <PrivateRoute allowedRoles={["administrador"]}>
            <Maquinario />
          </PrivateRoute>
        } />

        <Route path="/relatorio" element={
          <PrivateRoute allowedRoles={["administrador"]}>
            <Relatorio />
          </PrivateRoute>
        } />

        <Route path="/relatorio-novo" element={
          <PrivateRoute allowedRoles={["administrador"]}>
            <RelatorioNovo />
          </PrivateRoute>
        } />

        <Route path="/fornecedor" element={
          <PrivateRoute allowedRoles={["administrador"]}>
            <Fornecedor />
          </PrivateRoute>
        } />
      </Routes>
    </Router>
  );
};

export default App;
