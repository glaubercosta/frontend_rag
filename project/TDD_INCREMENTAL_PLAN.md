# 🔬 Plano de Desenvolvimento TDD Incremental - Frontend

## 🎯 **Metodologia: Test-Driven Development (TDD)**

### 📋 **Ciclo TDD para Cada Feature**
```
🔴 RED → 🟢 GREEN → 🔵 REFACTOR
  ↓        ↓          ↓
Teste    Implementa  Melhora
Falha    Mínimo      Código
```

**Processo por Versão:**
1. **Escrever testes** que descrevem o comportamento esperado
2. **Executar testes** (devem falhar inicialmente - RED)
3. **Implementar código mínimo** para passar os testes (GREEN)
4. **Refatorar** e melhorar o código mantendo os testes passando (REFACTOR)
5. **Validar** com usuários e stakeholders
6. **Release** da versão

---

## 🚀 **ROADMAP DE VERSÕES**

### 📦 **v0.1.0 - Foundation Setup** ✅ (CONCLUÍDO)
**Objetivo:** Estrutura base do projeto frontend + primeiros testes

**✅ Implementação Concluída:**
- [x] Setup projeto Next.js com TypeScript
- [x] Configuração de testes (Jest + Testing Library)
- [x] Estrutura de pastas organizada
- [x] Configuração TailwindCSS
- [x] Scripts de desenvolvimento e teste

**✅ Critérios de Aceitação:**
- [x] Aplicação Next.js carrega sem erros
- [x] Jest configurado corretamente
- [x] Estrutura TDD estabelecida
- [x] Dependencies instaladas

---



### 📦 **v0.2.0 - Autenticação de Usuário** ✅ (CONCLUÍDO)
**Objetivo:** Implementar fluxo de cadastro, login, logout e recuperação de senha

#### 🧪 **Testes Implementados:**
```typescript
// __tests__/components/AuthForm.test.tsx
describe('AuthForm', () => {
  test('should render login and signup forms')
  test('should validate email and password fields')
  test('should handle login and signup API calls')
  test('should show error on invalid credentials')
  test('should persist session on login')
})

// __tests__/components/PasswordResetForm.test.tsx
describe('PasswordResetForm', () => {
  test('should render forgot password form')
  test('should send reset email')
  test('should handle new password submission')
})
```

#### ⚙️ **Implementação (GREEN):**
- [x] Componente `AuthForm` (login/cadastro/logout)
- [x] Service `AuthService` para API de autenticação (simulada)
- [x] Validação de formulário
- [x] Testes automatizados cobrindo fluxos principais
- [ ] Componente `PasswordResetForm` (parcial)
- [ ] Persistência de sessão (token/JWT) (parcial)

#### 🔵 **Refatorações (REFACTOR):**
- [x] Feedback visual de sucesso/erro
- [x] Reutilização de componentes de input
- [ ] Fluxo de logout seguro (parcial)

#### ✅ **Critérios de Aceitação:**
- [x] Login/cadastro funcionais
- [x] Testes passam com >80% cobertura
- [x] Integração AuthForm/AuthService
- [ ] Recuperação de senha funcional (parcial)
- [ ] Sessão persistente (parcial)

---

## ⏭️ **Próximo Ciclo: Workspaces e Agrupamento**
O próximo passo do roadmap é implementar o gerenciamento de workspaces (CRUD), agrupamento de conexões/LLMs por workspace e importação de configs, conforme detalhado abaixo.

---

### 📦 **v0.3.0 - Workspaces e Agrupamento** (Semana 2)
**Objetivo:** Permitir ao usuário criar, renomear, excluir e gerenciar workspaces, além de agrupar conexões e LLMs por workspace

#### 🧪 **Testes a Implementar (RED):**
```typescript
// __tests__/components/WorkspaceManager.test.tsx
describe('WorkspaceManager', () => {
  test('should render list of workspaces')
  test('should create new workspace')
  test('should rename and delete workspace')
  test('should switch between workspaces')
})

// __tests__/components/WorkspaceResourceConfig.test.tsx
describe('WorkspaceResourceConfig', () => {
  test('should add/edit/remove database connections per workspace')
  test('should add/edit/remove LLM configs per workspace')
  test('should import configs from other workspaces')
})
```

#### ⚙️ **Implementação (GREEN):**
- [ ] Componente `WorkspaceManager`
- [ ] Componente `WorkspaceResourceConfig`
- [ ] Service para workspaces (CRUD)
- [ ] Associação de conexões/LLMs ao workspace
- [ ] Importação de configs entre workspaces

#### 🔵 **Refatorações (REFACTOR):**
- [ ] UI de seleção e navegação entre workspaces
- [ ] Otimização de performance para múltiplos workspaces

#### ✅ **Critérios de Aceitação:**
- [ ] Workspaces CRUD completo
- [ ] Agrupamento de recursos por workspace
- [ ] Importação de configs
- [ ] Testes passam com >80% cobertura

---

### 📦 **v0.4.0 - Database Connection UI (por Workspace)** (Semana 3)
**Objetivo:** Interface para configurar conexão com banco de dados dentro de um workspace

#### 🧪 **Testes a Implementar (RED):**
```typescript
// __tests__/components/DatabaseConnectionForm.test.tsx
describe('DatabaseConnectionForm', () => {
  test('should render connection form with database type options', () => {
    // Teste que formulário renderiza com SQLite, PostgreSQL, MySQL
  })
  
  test('should validate required fields before submission', () => {
    // Teste validação client-side
  })
  
  test('should call API to test connection', () => {
    // Mock API call e teste integração
  })
  
  test('should show success/error messages', () => {
    // Teste estados de UI (loading, success, error)
  })
})

// __tests__/services/database-service.test.ts
describe('DatabaseService', () => {
  test('should test database connection via API', () => {
    // Teste integração com backend API
  })
})
```

#### ⚙️ **Implementação (GREEN):**
- [ ] Componente `DatabaseConnectionForm`
- [ ] Service `DatabaseService` para API calls
- [ ] Tipos TypeScript para conexões
- [ ] Estados de loading/success/error
- [ ] Validação de formulário

#### 🔵 **Refatorações (REFACTOR):**
- [ ] Extrair componentes de UI reutilizáveis
- [ ] Melhorar tratamento de erros
- [ ] Otimizar validações
- [ ] Adicionar animações de transição

#### ✅ **Critérios de Aceitação:**
- [ ] Formulário funcional com 3 tipos de banco
- [ ] Validação previne submissões inválidas
- [ ] Integração com API backend funciona
- [ ] Estados visuais claros (loading, success, error)
- [ ] Testes passam com >80% cobertura

---


### 📦 **v0.5.0 - LLM Provider Configuration (por Workspace)** (Semana 4)
**Objetivo:** Interface para configurar provedores LLM por workspace

#### 🧪 **Testes a Implementar (RED):**
```typescript
// __tests__/components/LLMConfigurationPanel.test.tsx
describe('LLMConfigurationPanel', () => {
  test('should render provider options (OpenAI, Ollama, Custom)', () => {})
  test('should validate API keys and configurations', () => {})
  test('should test provider connectivity', () => {})
  test('should save and switch between providers', () => {})
})
```

#### ⚙️ **Implementação (GREEN):**
- [ ] Componente `LLMConfigurationPanel`
- [ ] Service `LLMService` para Multi-LLM API
- [ ] Interface de configuração por provider
- [ ] Teste de conectividade
- [ ] Persistência de configurações

---


### 📦 **v0.6.0 - Natural Language Query Interface (por Workspace)** (Semana 5)
**Objetivo:** Interface principal de consulta por workspace

#### 🧪 **Testes a Implementar (RED):**
```typescript
// __tests__/components/QueryInterface.test.tsx
describe('QueryInterface', () => {
  test('should render query textarea and submit button', () => {})
  test('should handle query submission', () => {})
  test('should display query results', () => {})
  test('should show SQL syntax highlighting', () => {})
})
```

#### ⚙️ **Implementação (GREEN):**
- [ ] Componente `QueryInterface`
- [ ] Componente `QueryResults`
- [ ] Integração com Monaco Editor para SQL
- [ ] Service `QueryService`
- [ ] Estados de query (idle, loading, success, error)

---


### 📦 **v0.7.0 - Schema Explorer (por Workspace)** (Semana 6)
**Objetivo:** Exploração visual da estrutura do banco por workspace

#### 🧪 **Testes a Implementar (RED):**
```typescript
// __tests__/components/SchemaExplorer.test.tsx
describe('SchemaExplorer', () => {
  test('should list database tables', () => {})
  test('should show table details on click', () => {})
  test('should display column information', () => {})
  test('should indicate relationships', () => {})
})
```

#### ⚙️ **Implementação (GREEN):**
- [ ] Componente `SchemaExplorer`
- [ ] Componente `TableDetails`
- [ ] Visualização hierárquica
- [ ] Service para schema API

---


### 📦 **v0.8.0 - Query History & Favorites (por Workspace)** (Semana 7)
**Objetivo:** Histórico e sistema de favoritos por workspace

#### 🧪 **Testes a Implementar (RED):**
```typescript
// __tests__/components/QueryHistory.test.tsx
describe('QueryHistory', () => {
  test('should save queries to localStorage', () => {})
  test('should display recent queries', () => {})
  test('should allow re-execution', () => {})
  test('should manage favorites', () => {})
})
```

#### ⚙️ **Implementação (GREEN):**
- [ ] Componente `QueryHistory`
- [ ] Componente `FavoritesManager`
- [ ] LocalStorage service
- [ ] Sistema de tags/categorias

---


### 📦 **v0.9.0 - Export & Visualization (por Workspace)** (Semana 8)
**Objetivo:** Export de dados e visualizações por workspace

#### 🧪 **Testes a Implementar (RED):**
```typescript
// __tests__/components/ExportOptions.test.tsx
describe('ExportOptions', () => {
  test('should export to CSV format', () => {})
  test('should export to Excel format', () => {})
  test('should copy SQL to clipboard', () => {})
})
```

#### ⚙️ **Implementação (GREEN):**
- [ ] Componente `ExportOptions`
- [ ] Service `ExportService`
- [ ] Integração com file-saver e xlsx
- [ ] Clipboard API

---


### 📦 **v1.0.0 - Production Release** (Semana 9)
**Objetivo:** Produto completo pronto para produção, multiusuário, multi-workspace

#### 🧪 **Testes E2E:**
```typescript
// __tests__/e2e/complete-workflow.test.tsx
describe('Complete User Journey', () => {
  test('should complete full workflow: connect → configure → query → export', () => {})
})
```

#### ⚙️ **Implementação Final:**
- [ ] Testes E2E completos
- [ ] Otimizações de performance
- [ ] Documentação de usuário
- [ ] Build de produção

---

## 🛠️ **ESTRUTURA DE DESENVOLVIMENTO**

### 📁 **Estrutura de Arquivos**
```
frontend_rag/
├── __tests__/
│   ├── components/          # Testes de componentes
│   ├── integration/         # Testes de integração
│   ├── services/           # Testes de services
│   └── setup/              # Testes de configuração
├── src/
│   ├── app/                # App Router Next.js
│   ├── components/
│   │   ├── ui/             # Componentes básicos
│   │   └── forms/          # Formulários específicos
│   ├── services/           # Comunicação com APIs
│   ├── hooks/              # Custom hooks
│   ├── types/              # TypeScript types
│   └── utils/              # Utilities
└── docs/                   # Documentação
```

### ⚙️ **Comandos de Desenvolvimento**
```bash
# Desenvolvimento
npm run dev                 # Servidor de desenvolvimento
npm run build              # Build de produção

# Testes
npm test                   # Executar todos os testes
npm run test:watch         # Testes em modo watch
npm run test:coverage      # Testes com cobertura
npm run test:ci            # Testes para CI/CD

# Qualidade
npm run lint               # ESLint
npm run type-check         # TypeScript check
```

### 🎯 **Métricas de Qualidade por Versão**

**Definição de Pronto para Cada Versão:**
1. **✅ Testes:** Cobertura > 80% para código novo
2. **✅ Performance:** Lighthouse score > 90
3. **✅ Funcionalidade:** Todos os critérios de aceitação atendidos
4. **✅ UX:** Responsivo e acessível
5. **✅ Integração:** APIs backend funcionam corretamente

---

## 🔌 **INTEGRAÇÃO COM BACKEND**

### 🌐 **URLs das APIs**
- **Multi-LLM API**: `http://localhost:9000`
- **API Original**: `http://localhost:8000`

### 🔐 **Configuração de Environment**
```env
# .env.local
NEXT_PUBLIC_ORIGINAL_API_URL=http://localhost:8000
NEXT_PUBLIC_MULTI_LLM_API_URL=http://localhost:9000
NEXT_PUBLIC_API_KEY=dev-api-key-12345
NEXT_PUBLIC_MULTI_LLM_API_KEY=dev-multi-llm-key-12345
```

### 📡 **Services de Integração**
```typescript
// src/services/api-client.ts
class ApiClient {
  static async testConnection(): Promise<boolean>
  static async executeQuery(query: QueryRequest): Promise<QueryResponse>
  static async getSchema(): Promise<SchemaResponse>
  static async getProviders(): Promise<LLMProvider[]>
  static async switchProvider(provider: string): Promise<void>
}
```

---

## 📋 **CHECKLIST DE RELEASE**

Para cada versão (v0.X.0):
- [ ] Todos os testes TDD passam (RED → GREEN → REFACTOR)
- [ ] Feature funciona com APIs backend
- [ ] Interface responsiva (mobile + desktop)
- [ ] Cobertura de testes > 80%
- [ ] Performance mantida (Lighthouse > 90)
- [ ] Documentação atualizada
- [ ] Demo realizada com stakeholders
- [ ] Tag criada no Git
- [ ] Deploy realizado

---

## 🚀 **PRÓXIMOS PASSOS IMEDIATOS**


### ✅ **TODO para PRÓXIMA SESSÃO (v0.2.0)**
1. [ ] **Criar testes para autenticação (RED)**
  - Escrever `__tests__/components/AuthForm.test.tsx`
  - Escrever `__tests__/components/PasswordResetForm.test.tsx`
  - Executar `npm test` (devem falhar)

2. [ ] **Implementar autenticação mínima (GREEN)**
  - Criar componentes de login/cadastro e recuperação de senha
  - Implementar AuthService
  - Executar `npm test` (devem passar)

3. [ ] **Começar fluxo de workspaces**
  - Escrever testes para criação/listagem de workspaces
  - Implementar interface básica

### 🎯 **Objetivo da Próxima Sessão**
Ter a **v0.2.0** funcional onde usuário pode:
- Criar conta, logar, recuperar senha
- Criar e listar workspaces
- Ver interface principal do app após login

---

*Plano TDD criado em: 16 de Agosto de 2025*  
*Status: v0.1.0 ✅ Concluído*  
*Próximo: v0.2.0 - Database Connection UI*
