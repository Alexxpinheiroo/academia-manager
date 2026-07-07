import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
import { useNavigate, Link } from 'react-router-dom';
import './LoginForm.css';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [feedback, setFeedback] = useState({ mensagem: '', tipo: '', emoji: '' });
  const navigate = useNavigate();

  const executarLogin = async (e) => {
    e.preventDefault();
    setCarregando(true);
    setFeedback({ mensagem: '', tipo: '', emoji: '' });

    try {
      // Validação dos valores dos campos no Firebase Authentication
      await signInWithEmailAndPassword(auth, email, senha);
      
      setFeedback({
        mensagem: "Acessado com sucesso!",
        tipo: "sucesso",
        emoji: "✨🚀"
      });

      // Limpa os campos de input
      setEmail('');
      setSenha('');
      
      // Se os dados estiverem corretos, muda para a página Principal após breve delay
      setTimeout(() => {
        navigate('/principal');
      }, 1000);

    } catch (error) {
      // Caso contrário, informa o usuário com uma mensagem na tela
      setFeedback({
        mensagem: "Usuário não cadastrado ou credenciais incorretas.",
        tipo: "erro",
        emoji: "❌"
      });
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="login-container" style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Login</h2>
      
      {feedback.mensagem && (
        <p style={{ color: feedback.tipo === 'sucesso' ? 'green' : 'red', fontWeight: 'bold' }}>
          {feedback.emoji} {feedback.mensagem}
        </p>
      )}

      <form onSubmit={executarLogin}>
        <input 
          type="email" 
          placeholder="E-mail" 
          value={email} 
          onChange={e => setEmail(e.target.value)} 
          required 
          style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
        />
        <br/>
        <input 
          type="password" 
          placeholder="Senha" 
          value={senha} 
          onChange={e => setSenha(e.target.value)} 
          required 
          style={{ width: '100%', padding: '8px', marginBottom: '15px' }}
        />
        <br/>
        
        {/* Botão para acessar a página Principal conforme exigido */}
        <button type="submit" disabled={carregando} style={{ width: '100%', padding: '10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          {carregando ? "Autenticando..." : "Acessar Página Principal"}
        </button>
      </form>
      
      <p style={{ marginTop: '15px', textAlign: 'center' }}>
        Não possui cadastro? <Link to="/cadastro">Cadastre-se aqui</Link>
      </p>
    </div>
  );
}