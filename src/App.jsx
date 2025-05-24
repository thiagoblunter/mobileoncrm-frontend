// MobileOnCRM - Painel Admin Web (React + Tailwind)
// Login + Registro com integração ao backend

import { useState } from 'react';

const logoUrl = 'https://upload.wikimedia.org/wikipedia/commons/4/47/React.svg';
const API_URL = import.meta.env.VITE_API_URL;

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const handleAuth = async (e) => {
    e.preventDefault();
    const endpoint = isRegistering ? 'register' : 'login';
    try {
      const res = await fetch(`${API_URL}/api/auth/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      if (!res.ok) throw new Error(isRegistering ? 'Erro ao registrar' : 'Login inválido');

      if (!isRegistering) {
        const data = await res.json();
        localStorage.setItem('token', data.token);
        setIsLoggedIn(true);
      } else {
        setIsRegistering(false);
        alert('Usuário registrado com sucesso! Agora faça login.');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  if (!isLoggedIn) {
    return (
      <div style={{ minHeight: '100vh' }} className="bg-black flex flex-col justify-center items-center">
        <img src={logoUrl} alt="MobileOnCRM" className="w-48 mb-6" />
        <form onSubmit={handleAuth} className="bg-gray-900 p-8 rounded-xl shadow-md w-80">
          <h2 className="text-white text-xl font-bold mb-4">
            {isRegistering ? 'Criar Conta' : 'Login - MobileOnCRM'}
          </h2>
          <input
            type="text"
            placeholder="Usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full mb-4 px-4 py-2 rounded bg-gray-800 text-white"
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-4 px-4 py-2 rounded bg-gray-800 text-white"
            required
          />
          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
          <button type="submit" className="bg-yellow-400 text-black font-bold py-2 px-4 rounded w-full hover:bg-yellow-500">
            {isRegistering ? 'Registrar' : 'Entrar'}
          </button>
          <p className="text-gray-400 text-sm mt-4 text-center cursor-pointer" onClick={() => { setIsRegistering(!isRegistering); setError(''); }}>
            {isRegistering ? 'Já tem conta? Faça login' : 'Não tem conta? Crie uma agora'}
          </p>
        </form>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <aside className="w-64 bg-black p-4 shadow-lg">
        <img src={logoUrl} alt="MobileOnCRM" className="w-40 mx-auto mb-6" />
        <nav className="space-y-2">
          <button className="w-full text-left py-2 px-4 rounded hover:bg-yellow-500 hover:text-black">📇 Contatos</button>
          <button className="w-full text-left py-2 px-4 rounded hover:bg-yellow-500 hover:text-black">📊 CRM</button>
          <button className="w-full text-left py-2 px-4 rounded hover:bg-yellow-500 hover:text-black">📤 Envio</button>
          <button className="w-full text-left py-2 px-4 rounded hover:bg-yellow-500 hover:text-black">⚙️ Configurações</button>
        </nav>
      </aside>
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">Bem-vindo à MobileOnCRM</h1>
        <p>Em breve você verá aqui suas mensagens, contatos e agendamentos.</p>
      </main>
    </div>
  );
}
