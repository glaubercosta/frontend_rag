"use client";
import React, { useState } from 'react';
import { AuthService } from '../../services/AuthService';

const AuthForm: React.FC = () => {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [errors, setErrors] = useState<{ email?: string; senha?: string }>({});
  const [authError, setAuthError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    const newErrors: typeof errors = {};
    if (!email) newErrors.email = 'Email obrigatório';
    if (!senha) newErrors.senha = 'Senha obrigatória';
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    setLoading(true);
    try {
      if (mode === 'login') {
        await AuthService.login(email, senha);
      } else {
        await AuthService.signup(email, senha);
      }
      // Aqui você pode redirecionar ou atualizar o estado global de autenticação
    } catch (err: any) {
      setAuthError(err.message || 'Erro ao autenticar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email</label>
      <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
      {errors.email && <span>{errors.email}</span>}

      <label htmlFor="senha">Senha</label>
      <input id="senha" type="password" value={senha} onChange={e => setSenha(e.target.value)} />
      {errors.senha && <span>{errors.senha}</span>}

      <button type="submit" disabled={loading}>
        {loading ? 'Aguarde...' : mode === 'login' ? 'Entrar' : 'Cadastrar'}
      </button>

      {authError && <div style={{ color: 'red' }}>{authError}</div>}

      <div>
        {mode === 'login' ? (
          <button type="button" onClick={() => setMode('signup')}>Criar conta</button>
        ) : (
          <button type="button" onClick={() => setMode('login')}>Já tenho conta</button>
        )}
      </div>
    </form>
  );
};

export default AuthForm;
