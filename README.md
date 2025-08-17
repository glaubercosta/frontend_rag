# 🚀 Database RAG Frontend

Frontend para sistema de consulta em banco de dados usando linguagem natural com múltiplos provedores LLM.

## 🏗️ **Stack Tecnológica**

- **Framework:** Next.js 15.4.6 com TypeScript e App Router
- **Styling:** TailwindCSS
- **Testing:** Jest + React Testing Library (80% coverage)
- **Quality:** ESLint + TypeScript strict mode
- **Icons:** React Icons
- **Editor:** Monaco Editor para syntax highlighting
- **Export:** file-saver + xlsx para exportação de dados

## 🚀 **Getting Started**

### Desenvolvimento

```bash
# Instalar dependências
npm install

# Servidor de desenvolvimento
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

### Testes

```bash
# Executar todos os testes
npm test

# Testes em modo watch
npm run test:watch

# Testes com cobertura
npm run test:coverage

# Testes para CI/CD
npm run test:ci
```

### Build

```bash
# Build de produção
npm run build

# Executar build
npm start
```

## 📖 **Documentação do Projeto**

- `project/USER_STORIES.md` - User stories completas com critérios de aceitação
- `project/TDD_INCREMENTAL_PLAN.md` - Roadmap de desenvolvimento TDD (7 versões)

## 🔌 **Integração Backend**

### APIs Disponíveis
- **Multi-LLM API:** `http://localhost:9000`
- **API Original:** `http://localhost:8000`

### Configuração Environment

Crie `.env.local`:

```env
NEXT_PUBLIC_ORIGINAL_API_URL=http://localhost:8000
NEXT_PUBLIC_MULTI_LLM_API_URL=http://localhost:9000
NEXT_PUBLIC_API_KEY=dev-api-key-12345
NEXT_PUBLIC_MULTI_LLM_API_KEY=dev-multi-llm-key-12345
```

## 🧪 **Desenvolvimento TDD**

Este projeto segue metodologia **Test-Driven Development**:

```
🔴 RED → 🟢 GREEN → 🔵 REFACTOR
  ↓        ↓          ↓
Teste    Implementa  Melhora
Falha    Mínimo      Código
```

### Estrutura de Testes

```
__tests__/
├── components/          # Testes de componentes
├── integration/         # Testes de integração
├── services/           # Testes de services
└── setup/              # Testes de configuração
```

## 🎯 **Versões Planejadas**

- **v0.1.0** ✅ Foundation Setup (Concluído)
- **v0.2.0** 🔄 Database Connection UI (Em desenvolvimento)
- **v0.3.0** 📋 LLM Provider Configuration
- **v0.4.0** 🗣️ Natural Language Query Interface
- **v0.5.0** 🔍 Schema Explorer
- **v0.6.0** 📚 Query History & Favorites
- **v0.7.0** 📊 Export & Visualization
- **v1.0.0** 🚀 Production Release

## 📁 **Estrutura do Projeto**

```
frontend_rag/
├── __tests__/              # Testes organizados por tipo
├── src/
│   ├── app/               # App Router Next.js
│   ├── components/
│   │   ├── ui/           # Componentes básicos
│   │   └── forms/        # Formulários específicos
│   ├── services/         # Comunicação com APIs
│   ├── hooks/            # Custom hooks
│   ├── types/            # TypeScript types
│   └── utils/            # Utilities
├── project/              # Documentação do projeto
└── docs/                 # Documentação técnica
```

## 📋 **Scripts Disponíveis**

```bash
npm run dev              # Servidor de desenvolvimento
npm run build           # Build de produção
npm run start           # Executar build
npm test                # Executar todos os testes
npm run test:watch      # Testes em modo watch
npm run test:coverage   # Testes com cobertura
npm run test:ci         # Testes para CI/CD
npm run lint            # ESLint
npm run type-check      # TypeScript check
```

## 🤝 **Contribuição**

1. Siga a metodologia TDD (RED-GREEN-REFACTOR)
2. Mantenha cobertura de testes >80%
3. Use TypeScript strict mode
4. Siga convenções do ESLint
5. Documente user stories e critérios de aceitação

---

**Status:** v0.1.0 ✅ Completo | Próximo: v0.2.0 Database Connection UI
