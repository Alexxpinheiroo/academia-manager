import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { useNavigate, Link } from 'react-router-dom';

export default function Cadastro() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [feedback, setFeedback] = useState({ mensagem: '', tipo: '', emoji: '' });
  const [carregando, setCarregando] = useState(false);
  const navigate = useNavigate();

  const handleCadastro = async (e) => {
    e.preventDefault();
    setCarregando(true);
    setFeedback({ mensagem: '', tipo: '', emoji: '' });

    try {
      // 1. Cria o usuário no Firebase Authentication (E-mail/Senha)
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
      const user = userCredential.user;

      // 2. Grava o restante dos dados no Firestore, incluindo o UID do usuário
      await setDoc(doc(db, "usuarios", user.uid), {
        uid: user.uid,
        nome: nome,
        sobrenome: sobrenome,
        dataNascimento: dataNascimento,
        email: email
      });

      setFeedback({
        mensagem: "Usuário cadastrado com sucesso!",
        tipo: "sucesso",
        emoji: "✨🚀"
      });

      // Aguarda 1.5s para o usuário ver o feedback e joga para o Login
      setTimeout(() => {
        navigate('/login');
      }, 1500);

    } catch (error) {
      let mensagemErro = "Erro ao realizar o cadastro.";
      if (error.code === 'auth/email-already-in-use') {
        mensagemErro = "Este e-mail já está em uso.";
      } else if (error.code === 'auth/weak-password') {
        mensagemErro = "A senha deve ter no mínimo 6 caracteres.";
      }

      setFeedback({
        mensagem: mensagemErro,
        tipo: "erro",
        emoji: "❌"
      });
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Cadastro</h2>
      
      {feedback.mensagem && (
        <p style={{ color: feedback.tipo === 'sucesso' ? 'green' : 'red', fontWeight: 'bold' }}>
          {feedback.emoji} {feedback.mensagem}
        </p>
      )}

      <form onSubmit={handleCadastro}>
        <input type="text" placeholder="Nome" value={nome} onChange={e => setNome(e.target.value)} required style={{ width: '100%', padding: '8px', marginBottom: '10px' }} /><br/>
        <input type="text" placeholder="Sobrenome" value={sobrenome} onChange={e => setSobrenome(e.target.value)} required style={{ width: '100%', padding: '8px', marginBottom: '10px' }} /><br/>
        <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Data de Nascimento:</label>
        <input type="date" value={dataNascimento} onChange={e => setDataNascimento(e.target.value)} required style={{ width: '100%', padding: '8px', marginBottom: '10px' }} /><br/>
        <input type="email" placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)} required style={{ width: '100%', padding: '8px', marginBottom: '10px' }} /><br/>
        <input type="password" placeholder="Senha" value={senha} onChange={e => setSenha(e.target.value)} required style={{ width: '100%', padding: '8px', marginBottom: '15px' }} /><br/>
        
        <button type="submit" disabled={carregando} style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          {carregando ? "Cadastrando..." : "Cadastrar Usuário"}
        </button>
      </form>
      
      <p style={{ marginTop: '15px', textAlign: 'center' }}>
        Já tem uma conta? <Link to="/login">Faça Login</Link>
      </p>
    </div>
  );
}