import React, { useState } from 'react';

const PasswordResetForm: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    setError(null);
    if (!email) {
      setError('Email obrigatório');
      return;
    }
    setLoading(true);
    try {
      // Simula envio de email
      await new Promise(r => setTimeout(r, 500));
      setStatus('Se existir uma conta, um link de redefinição foi enviado.');
    } catch {
      setError('Erro ao enviar email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="reset-email">Email</label>
      <input id="reset-email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
      {error && <span>{error}</span>}
      <button type="submit" disabled={loading}>{loading ? 'Enviando...' : 'Enviar link'}</button>
      <button type="button" onClick={onBack}>Voltar</button>
      {status && <div style={{ color: 'green' }}>{status}</div>}
    </form>
  );
};

export default PasswordResetForm;
