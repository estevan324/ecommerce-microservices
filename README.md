# ecommerce-microservices

## 🗄️ Configuração do Banco de Dados

Antes de executar a aplicação, é necessário configurar os bancos de dados.

1. Localize o arquivo `databases.sql` no projeto.
2. Execute o script no seu gerenciador de banco de dados.
3. Esse script será responsável por criar todos os bancos de dados.

## 📦 Instalação de Dependências

Para garantir o funcionamento correto da aplicação, é necessário instalar as dependências em cada módulo do projeto.

### 📁 Locais onde as dependências devem ser instaladas

Execute o processo de instalação nos seguintes diretórios:

- Raiz do projeto
- `api-gateway`
- `api-catalog`
- `api-inventory`
- `api-order`
- `api-payments`
- `api-user`

### ▶️ Passo a passo

Em cada um dos diretórios acima, execute:

```bash
npm install
```

## 🔐 Configuração de Variáveis de Ambiente

Para executar a aplicação corretamente, é necessário configurar as variáveis de ambiente.

1. Utilize o arquivo `.env.example` como base.
2. Crie uma cópia dele com o nome `.env` na raiz de cada serviço.
3. Preencha os valores conforme o seu ambiente local.

## ▶️ Execução da Aplicação

Após instalar todas as dependências e configurar as variáveis de ambiente, basta iniciar a aplicação.

Na raiz do projeto, execute o seguinte comando:

```bash
npm start
```

Esse comando irá:

- Inicializar todos os serviços da aplicação
- Realizar configurações automáticas necessárias
- Criar tabelas no banco de dados (caso ainda não existam)

## ⚙️ Aplicações

- `api-gateway` (Porta 3000): Responsável por expor os endpoints de serviços utilizados para os clientes, permitindo apenas o acesso de endpoints de acesso público.
- `api-payments` (Porta 3001): Responsável por processar pagamentos.
- `api-inventory` (Porta 3002): Responsável por gerenciar o estoque.
- `api-catalog` (Porta 3003): Responsável por expor os produtos.
- `api-user` (Porta 3004): Responsável por gerenciar os usuários.
- `api-order` (Porta 3005): Responsável por gerenciar os pedidos.

### 💡 Observação

Certifique-se de que o banco de dados já foi criado previamente utilizando o script `databases.sql` antes de executar a aplicação.

## 🧪 Dados Iniciais para Teste

Após iniciar a aplicação, você pode criar um usuário e alguns produtos para testar o funcionamento do sistema.

### 👤 Criar Usuário

**Endpoint:**

```http
POST http://localhost:3000/users
```

**Body:**

```json
{
  "name": "John Doe",
  "email": "johndoe@gmail.com",
  "password": "john123"
}
```

### 📦 Criar Produto

**Endpoint:**

```http
POST http://localhost:3003/products
```

**Body:**

```json
{
  "name": "Notebook Samsung",
  "description": "16GB RAM SSD 1TB",
  "price": 4999.99,
  "initialQuantity": 1
}
```

#### 💡 Observação

Apenas os endpoints `/users`, `/login` e `/orders` estão disponíveis no API Gateway, pois são de acesso público.

Os demais endpoints são restritos e destinados apenas para uso interno ou por funcionários.

## 🔐 Autenticação e Criação de Pedido

Após criar o usuário e o produto inicial, é necessário realizar o login para obter o token de acesso.

### 🔑 Login

**Endpoint:**

```http
POST http://localhost:3000/login
```

**Body:**

```json
{
  "email": "johndoe@gmail.com",
  "password": "john123"
}
```

Após o login, será retornado um `accessToken`.

### 🧾 Criar Pedido

Utilize o `accessToken` no header da requisição:

```http
Authorization: Bearer SEU_ACCESS_TOKEN
```

**Endpoint:**

```http
POST http://localhost:3000/orders
```

**Body:**

```json
{
  "paymentMethod": "CARTAO_CREDITO",
  "products": [
    {
      "id": "bc8f0838-d7a5-4da6-ba96-e31d3eb7900f",
      "quantity": 1
    }
  ]
}
```

#### 💡 Observação

- Substitua `SEU_ACCESS_TOKEN` pelo token retornado no login.
- O `id` do produto deve corresponder a um produto previamente cadastrado.
- O endpoint `/orders` requer autenticação via Bearer Token.
