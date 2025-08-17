# 📋 Histórias de Usuário - Database Query Assistant Frontend

## 🎯 Visão do Produto

**Produto**: Aplicativo web frontend para consultas em linguagem natural em bases de dados  
**Objetivo**: Interface moderna e intuitiva que permite usuários finais fazerem perguntas sobre seus dados em português/inglês e receberem respostas inteligentes com visualização dos dados e consultas SQL geradas  

**APIs Backend**: Integração com APIs existentes no projeto `db_rag_api`:
- **Multi-LLM API** (porta 9000): Consultas com múltiplos provedores LLM
- **API Original** (porta 8000): Exploração de schema e operações de banco

---

## 👥 Personas

### 📊 **Analista de Negócios** (Persona Principal)
- Precisa analisar dados rapidamente
- Não domina SQL complexo
- Quer insights visuais dos dados
- Trabalha com múltiplas bases de dados

### 💼 **Executivo/Gestor** (Persona Secundária)  
- Precisa de insights rápidos para tomada de decisão
- Quer relatórios executivos automáticos
- Não tem conhecimento técnico
- Foco em dashboards e métricas

### 🔧 **Desenvolvedor/Analista Técnico** (Persona Terciária)
- Quer validar consultas SQL geradas
- Precisa testar diferentes LLMs
- Quer personalizar conexões e configurações
- Foca em precisão técnica

---

## 🏗️ ÉPICOS E HISTÓRIAS DE USUÁRIO

### 🔗 **ÉPICO 1: Gerenciamento de Conexões de Banco**

#### 📝 **US-001: Configurar Conexão com Banco de Dados**
**Como** analista de negócios  
**Eu quero** configurar uma conexão com minha base de dados (SQLite, PostgreSQL, MySQL)  
**Para que** eu possa fazer consultas nos meus dados  

**Critérios de Aceitação:**
- [ ] Interface para inserir string de conexão ou parâmetros individuais
- [ ] Suporte para SQLite, PostgreSQL e MySQL
- [ ] Teste de conectividade antes de salvar
- [ ] Validação de credenciais e permissões
- [ ] Salvamento seguro de configurações (localStorage criptografado)
- [ ] Histórico das últimas 5 conexões utilizadas

**Testes TDD:**
```typescript
// __tests__/components/DatabaseConnectionForm.test.tsx
test('should render connection form with all database types')
test('should validate required fields before submission')
test('should show success message on valid connection')
test('should handle connection errors gracefully')
```

#### 📝 **US-002: Gerenciar Múltiplas Conexões**
**Como** analista de negócios  
**Eu quero** salvar e alternar entre múltiplas conexões de banco  
**Para que** eu possa trabalhar com diferentes projetos/clientes  

**Critérios de Aceitação:**
- [ ] Lista de conexões salvas com nomes personalizados
- [ ] Indicação visual da conexão ativa atual
- [ ] Funcionalidade de alternar conexão rapidamente
- [ ] Edição/exclusão de conexões existentes
- [ ] Favoritar conexões mais utilizadas
- [ ] Status de conectividade em tempo real

---

### 🤖 **ÉPICO 2: Configuração de LLMs**

#### 📝 **US-003: Configurar Provedor de LLM**
**Como** desenvolvedor/analista técnico  
**Eu quero** configurar e alternar entre diferentes provedores de LLM (OpenAI, Ollama, APIs Customizadas)  
**Para que** eu possa escolher o modelo mais adequado para cada situação  

**Critérios de Aceitação:**
- [ ] Interface para configurar OpenAI (API Key + modelo)
- [ ] Interface para configurar Ollama (URL + modelo disponível)
- [ ] Interface para APIs customizadas (URL + headers + auth)
- [ ] Teste de conectividade com cada provedor
- [ ] Seleção do provedor ativo
- [ ] Exibição de informações do modelo (capacidades, limitações)

#### 📝 **US-004: Comparar Respostas de Diferentes LLMs**
**Como** desenvolvedor/analista técnico  
**Eu quero** executar a mesma consulta em diferentes LLMs simultaneamente  
**Para que** eu possa comparar qualidade e escolher o melhor modelo  

**Critérios de Aceitação:**
- [ ] Opção "Comparar LLMs" na interface de consulta
- [ ] Execução paralela da consulta em 2-3 LLMs
- [ ] Exibição lado-a-lado das respostas
- [ ] Comparação das consultas SQL geradas
- [ ] Tempo de resposta de cada LLM
- [ ] Opção de salvar resultado favorito

---


### 💬 **ÉPICO 3: Interface de Consulta em Linguagem Natural (por Workspace)**


#### 📝 **US-0401: Fazer Pergunta em Linguagem Natural (por Workspace)**
**Como** analista de negócios
**Eu quero** digitar perguntas sobre meus dados em português ou inglês dentro de um workspace
**Para que** eu possa obter insights sem precisar escrever SQL, organizando por projeto

**Critérios de Aceitação:**
- [ ] Caixa de texto ampla para perguntas
- [ ] Suporte a perguntas em português e inglês
- [ ] Sugestões automáticas baseadas no schema do workspace
- [ ] Histórico das últimas 10 consultas por workspace
- [ ] Botão de consulta com loading indicator
- [ ] Validação de pergunta antes do envio
- [ ] Exemplos de perguntas na interface


#### 📝 **US-0402: Visualizar Resposta Completa (por Workspace)**
**Como** analista de negócios
**Eu quero** ver a resposta em linguagem natural, a consulta SQL gerada e os dados resultantes, por workspace
**Para que** eu possa entender completamente a informação obtida e manter o contexto do projeto

**Critérios de Aceitação:**
- [ ] Resposta em linguagem natural no topo
- [ ] Consulta SQL gerada visível (com syntax highlighting)
- [ ] Tabela com resultados da consulta
- [ ] Informações adicionais (tempo execução, linhas retornadas)
- [ ] Opção de copiar SQL para clipboard
- [ ] Exportação dos resultados (CSV, Excel)
- [ ] Botão para executar novamente

---


### 📊 **ÉPICO 4: Exploração de Schema de Dados (por Workspace)**


#### 📝 **US-0501: Explorar Estrutura do Banco (por Workspace)**
**Como** analista de negócios
**Eu quero** visualizar a estrutura das tabelas e relacionamentos de cada workspace
**Para que** eu possa entender melhor os dados disponíveis em cada projeto

**Critérios de Aceitação:**
- [ ] Visualização hierárquica das tabelas
- [ ] Lista de colunas com tipos de dados
- [ ] Indicação de chaves primárias e estrangeiras
- [ ] Relacionamentos entre tabelas (visual)
- [ ] Amostras de dados para cada tabela
- [ ] Estatísticas básicas (contagem de registros)
- [ ] Busca por tabela/coluna específica

---


### 🎨 **ÉPICO 5: Visualização e Exports (por Workspace)**


#### 📝 **US-0601: Gerar Gráficos Automáticos (por Workspace)**
**Como** analista de negócios
**Eu quero** que o sistema gere gráficos automaticamente quando apropriado, por workspace
**Para que** eu possa visualizar trends e padrões facilmente em cada projeto

**Critérios de Aceitação:**
- [ ] Detecção automática de dados adequados para gráficos
- [ ] Gráficos de linha para séries temporais
- [ ] Gráficos de barras para comparações
- [ ] Gráficos de pizza para distribuições
- [ ] Opção de personalizar tipo de gráfico
- [ ] Export de gráficos como imagem
- [ ] Gráficos interativos (hover, zoom)


#### 📝 **US-0602: Exportar Resultados (por Workspace)**
**Como** analista de negócios
**Eu quero** exportar os resultados das consultas de cada workspace
**Para que** eu possa compartilhar ou processar em outras ferramentas, mantendo a organização por projeto

**Critérios de Aceitação:**
- [ ] Export em CSV com encoding correto
- [ ] Export em Excel com formatação
- [ ] Export em PDF com gráficos inclusos
- [ ] Cópia formatada para clipboard
- [ ] Export da consulta SQL
- [ ] Nomeação automática inteligente dos arquivos

---


### 💾 **ÉPICO 6: Histórico e Favoritos (por Workspace)**


#### 📝 **US-0701: Salvar Consultas Favoritas (por Workspace)**
**Como** analista de negócios
**Eu quero** salvar consultas que uso frequentemente em cada workspace
**Para que** eu possa executá-las novamente rapidamente e manter a organização por projeto

**Critérios de Aceitação:**
- [ ] Botão "Favoritar" em cada consulta
- [ ] Lista de consultas favoritadas por workspace
- [ ] Organização por pastas/tags
- [ ] Execução direta dos favoritos
- [ ] Edição de consultas favoritadas
- [ ] Export/import de favoritos

---


## 📋 Resumo de Priorização


### 🔥 **Prioridade ALTA** (MVP - Release 1.0)
- US-0001: Cadastro e Login de Usuário
- US-0101: Criar e Gerenciar Workspaces
- US-0201: Configurar Conexão com Banco (por Workspace)
- US-0301: Configurar Provedor de LLM (por Workspace)
- US-0401: Fazer Pergunta em Linguagem Natural (por Workspace)
- US-0402: Visualizar Resposta Completa (por Workspace)
- US-0501: Explorar Estrutura do Banco (por Workspace)


### ⭐ **Prioridade MÉDIA** (Release 1.1)
- US-0002: Recuperação e Redefinição de Senha
- US-0003: Gerenciamento de Conta
- US-0102: Configurar Conexões e LLMs por Workspace
- US-0103: Reaproveitar Configurações entre Workspaces
- US-0202: Gerenciar Múltiplas Conexões por Workspace
- US-0602: Exportar Resultados (por Workspace)
- US-0701: Salvar Consultas Favoritas (por Workspace)


### 💎 **Prioridade BAIXA** (Release 1.2+)
- US-0302: Comparar Respostas de Diferentes LLMs (por Workspace)
- US-0601: Gerar Gráficos Automáticos (por Workspace)

---

## 🎯 **Integração com Backend APIs**

### 🔌 **Endpoints Disponíveis**

**Multi-LLM API (http://localhost:9000):**
- `GET /` - Informações da API
- `POST /query` - Executar consulta natural
- `GET /status` - Status do sistema
- `GET /providers` - Listar provedores LLM
- `POST /switch-provider` - Alternar provedor

**API Original (http://localhost:8000):**
- `POST /initialize` - Inicializar sistema
- `POST /query` - Consulta SQL/Natural
- `POST /schema` - Explorar schema
- `GET /stats` - Estatísticas do banco
- `GET /tables` - Listar tabelas


### 🔐 **Autenticação**
- Login, cadastro, recuperação de senha e gerenciamento de conta via API de autenticação
- Bearer tokens configurados via environment variables
- Headers: `Authorization: Bearer {token}`

---

*Documento atualizado em: 17 de Agosto de 2025*  
*Versão: 1.1 - Frontend Project*  
*Integração: APIs Backend db_rag_api + Autenticação*
