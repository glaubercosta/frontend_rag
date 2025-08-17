import AuthForm from '../../components/auth/AuthForm';

export default function AuthPage() {
  return (
    <div style={{ maxWidth: 400, margin: '2rem auto', padding: 24, border: '1px solid #eee', borderRadius: 8 }}>
      <h2>Autenticação</h2>
      <AuthForm />
    </div>
  );
}
