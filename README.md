# Nextek-Test

Este projeto consiste em um sistema com backend utilizando **NestJS**, frontend com **Next.js** e um banco de dados **MySQL**. Abaixo está a documentação detalhada para instalação, configuração e execução do projeto.

---

## Estrutura do Projeto

```
nextek-test/
├── backend/          # Código do backend (NestJS)
├── frontend/         # Código do frontend (Next.js)
│   ├── Dockerfile
│   ├── .env.local    # Arquivo de variáveis de ambiente para o frontend
├── database/
│   ├── init.sql      # Script para inicialização do banco
├── docker-compose.yml # Arquivo para subir todos os serviços
├── README.md
└── .gitignore
```

---

## Pré-requisitos

Certifique-se de ter os seguintes softwares instalados em sua máquina:

- **Docker** (v20.10 ou superior)
- **Docker Compose** (v1.29 ou superior)
- **Node.js** (v18 ou superior)
- **npm** (v8 ou superior)

---

## Configuração do Projeto

### 1. Clonar o Repositório

```bash
git clone <URL_DO_REPOSITORIO>
cd nextek-test
```

### 2. Configurar Variáveis de Ambiente

#### Frontend

No diretório `frontend/`, configure o arquivo `.env.local` com as variáveis necessárias para o projeto. Exemplo:

```env
BACKEND_URL=http://backend:4000
```

#### Backend (se necessário)

No diretório `backend/`, adicione um arquivo `.env` e configure-o com as variáveis do backend. Exemplo:

```env
DB_HOST=mysql
DB_PORT=3306
DB_USER=nextek
DB_PASSWORD=nex@Tek
DB_NAME=task_manager
JWT_SECRET=nexSecretek
DATABASE_URL="mysql://nextek:nex@Tek@mysql:3306/task_manager"
```

Variáveis de ambiente nunca devem ser enviadas para um repositório público (Este projeto é um teste de seleção e não há dados sensíveis)

### 3. Configuração do Banco de Dados

O script `database/init.sql` será executado automaticamente na primeira inicialização do container MySQL. Certifique-se de revisar este script caso precise adicionar tabelas ou dados iniciais personalizados.

---

## Como Executar o Projeto

### Utilizando Docker Compose

1. **Subir os Serviços**:

   Execute o seguinte comando na raiz do projeto:

   ```bash
   docker-compose up --build
   ```

   Este comando irá:

   - Construir e executar o container do frontend na porta `3000`
   - Construir e executar o container do backend na porta `4000`
   - Executar o banco de dados MySQL na porta `3306`

2. **Verificar os Serviços**:

   - Acesse o frontend em: [http://localhost:3000](http://localhost:3000)
   - O banco de dados estará disponível em: `localhost:3306`

3. **Encerrar os Serviços**:

   Pressione `Ctrl+C` no terminal ou use:

   ```bash
   docker-compose down
   ```

### Executando Localmente (opcional)

#### Backend

1. Instale as dependências:

   ```bash
   cd backend
   npm install
   ```

2. Inicie o servidor:

   ```bash
   npm run start
   ```

   O backend estará disponível em: [http://localhost:4000](http://localhost:4000)

#### Frontend

1. Instale as dependências:

   ```bash
   cd frontend
   npm install
   ```

2. Inicie o servidor:

   ```bash
   npm run dev
   ```

   O frontend estará disponível em: [http://localhost:3000](http://localhost:3000)

#### Banco de Dados

Certifique-se de que o banco MySQL esteja rodando (via Docker ou localmente) e configurado corretamente.
