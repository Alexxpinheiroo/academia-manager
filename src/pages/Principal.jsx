import React, { useEffect, useState } from 'react';
import { auth, db } from '../config/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

export default function Principal() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Monitora o estado da autenticação em tempo real
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          // Busca o documento do usuário no Firestore utilizando o UID
          const docRef = doc(db, "usuarios", user.uid);
          const docSnap = await getDoc(docRef);
          
          if (docSnap.exists()) {
            setUserData(docSnap.data());
          } else {
            console.log("Nenhum dado complementar encontrado no Firestore.");
          }
        } catch (error) {
          console.error("Erro ao obter dados do Firestore:", error);
        } finally {
          setLoading(false);
        }
      } else {
        // Se não houver usuário logado, redireciona protetivamente para o login
        navigate('/login');
      }
    });

    // Remove o listener ao desmontar o componente
    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  if (loading) {
    return <p style={{ textAlign: 'center', marginTop: '50px' }}>Carregando dados do usuário...</p>;
  }

  return (
    <div style={{ maxWidth: '500px', margin: '50px auto', padding: '20px', border: '1px solid #28a745', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
      <h2>Página Principal</h2>
      <p style={{ color: '#666', fontSize: '14px' }}>Bem-vindo ao sistema.</p>
      
      {userData ? (
        <div style={{ margin: '20px 0', padding: '15px', border: '1px solid #ddd', borderRadius: '4px', backgroundColor: '#fff' }}>
          <p><strong>Nome:</strong> {userData.nome}</p>
          <p><strong>Sobrenome:</strong> {userData.sobrenome}</p>
          <p><strong>Data de Nascimento:</strong> {userData.dataNascimento}</p>
        </div>
      ) : (
        <p style={{ color: 'orange' }}>Dados cadastrais não localizados no Firestore.</p>
      )}
      
      <button 
        onClick={handleLogout} 
        style={{ padding: '8px 15px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
      >
        Sair / Desconectar
      </button>
    </div>
  );
}