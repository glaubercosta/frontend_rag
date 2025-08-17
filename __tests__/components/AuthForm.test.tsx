import { render, screen, fireEvent } from '@testing-library/react';
import AuthForm from '../../src/components/auth/AuthForm';
import { AuthService } from '../../src/services/AuthService';

jest.mock('../../src/services/AuthService', () => ({
  AuthService: {
    login: jest.fn(),
    signup: jest.fn(),
  }
}));

describe('AuthForm', () => {
  it('deve renderizar os campos de login', () => {
    render(<AuthForm />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/senha/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /entrar|login/i })).toBeInTheDocument();
  });

  it('deve validar campos obrigatórios', async () => {
    render(<AuthForm />);
    fireEvent.click(screen.getByRole('button', { name: /entrar|login/i }));
    expect(await screen.findByText(/email obrigatório/i)).toBeInTheDocument();
    expect(await screen.findByText(/senha obrigatória/i)).toBeInTheDocument();
  });

  it('deve alternar para o modo cadastro', () => {
    render(<AuthForm />);
    fireEvent.click(screen.getByText(/criar conta|cadastro/i));
    expect(screen.getByRole('button', { name: /cadastrar/i })).toBeInTheDocument();
  });

  it('deve exibir mensagem de erro em credenciais inválidas', async () => {
    (AuthService.login as jest.Mock).mockRejectedValue(new Error('Credenciais inválidas'));
    render(<AuthForm />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'user@exemplo.com' } });
    fireEvent.change(screen.getByLabelText(/senha/i), { target: { value: 'errada' } });
    fireEvent.click(screen.getByRole('button', { name: /entrar|login/i }));
    expect(await screen.findByText(/credenciais inválidas/i)).toBeInTheDocument();
  });
});
