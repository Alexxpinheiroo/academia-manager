import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from '../pages/LoginForm';
import Cadastro from '../pages/Cadastro';
import Principal from '../pages/Principal';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redireciona a rota inicial vazia direto para o Login */}
        <Route path="/" element={<Navigate to="/login" />} />
        
        {/* As 3 rotas distintas exigidas pelo trabalho */}
        <Route path="/login" element={<LoginForm />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/principal" element={<Principal />} />
      </Routes>
    </BrowserRouter>
  );
}