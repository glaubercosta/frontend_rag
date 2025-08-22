export class AuthService {
  static async login(email: string, senha: string) {
    // Simulação de chamada à API de autenticação
    if (email === 'user@exemplo.com' && senha === 'correta') {
      return { token: 'fake-jwt-token' };
    }
    throw new Error('Credenciais inválidas');
  }

  static async signup(email: string, senha: string) {
    // Simulação de cadastro
    if (email && senha) {
      return { token: 'fake-jwt-token' };
    }
    throw new Error('Erro ao cadastrar');
  }

  static async resetPassword(email: string) {
    // Simulação de envio de email de redefinição
    if (email === 'user@exemplo.com') {
      return { success: true };
    }
    throw new Error('Email não encontrado');
  }
}
