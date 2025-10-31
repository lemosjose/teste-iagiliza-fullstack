# Backend - Morpheus 

##  EN 

Simple backend using fastify/TypeScript. Everything is strongly typed and maximum attention was given to organization in the code. The code organization and the development of pages and components focus on reproduceability for this project extensions and the development of other projects. 

## Installation

### Database

You can work with a database locally or test everything through the docker comopose provided in the project root, then you can configure the `DATABASE_URL` with this sample configurations as:

```bash
POSTGRES_USER=postgres
POSTGRES_PASSWORD=yourpassword
POSTGRES_DB=yourdatabase
```

```bash
DATABASE_URL="postgresql://postgres:yourpassword@psql:5432/postgres" 
```

and your backend/.env should also have your `GEMINI_API_KEY` configured.

You can get one _API KEY_ for free in https://aistudio.google.com/api-keys. 


Don't forget to define a random **JWT_SECRET** such as 

```bash 
JWT_SECRET="whateveritis"
```

### Running 

```bash 
- optional 
sudo docker compose build 
``` 

```bash 
sudo docker compose up -d
```

install project dependencies and run it locally 
```bash
  pnpm install
  <! -- necessary for generating prisma in node_modules>
  pnpm prisma generate
  <! -- -->
  pnpm prisma migrate deploy
  pnpm run build 
  node dist/index.js
```

### Docker

Just use the _docker-compose.yml_ provided in the GitHub repo main folder, and then run 

_optional_
```bash
sudo docker compose build 
```

```bash
sudo docker compose up -d 
``` 

Then, acess _localhost_ on your browser, and make the requisitions to :8080 considering the Docker network, you are free to use postman or whatever of your preference

## API Reference

### POST
```http
  POST /register 
```

Register your user in the psql database

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Required**. Your Username |
| `email` | `string` | **Required**. Your email, used for login, verified with zod on the backend |
| `password` | `string` | **Required**. Your Password, used for login, the zod schema requires at least 8 characters |

```http
  POST /login
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**. Your email, used in register, gets you the jwt token and gives access to protected routes |
| `password` | `string` | **Required**. Your  password used in `/register` |

```http
  POST /login
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**. Your email, used in register, gets you the jwt token and gives access to protected routes |
| `password` | `string` | **Required**. Your  password used in `/register` |

```http
  POST /message
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `content` | `string` | **Required**. The content you're sending for the api, morpheus will read this and reply with an ai response |

```http
  POST /chat
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `title` | `string` | The title for the chat, you are not actually obliged to do that, since the request will create a new chat with "Conversa + Number" with an incremental counter |

### PATCH


```http
  PATCH /me
```

| Headers | Name     | Content             |
| :-------- | :------- | :------------------------- |
| `Authorizarion` | `Bearer` | **YOUR_TOKEN** |


| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**. New email for the old to be replaced|

Since you're already authenticated, it just patches your email registered with the one from the requisition


```http
  PATCH /me/updatename
```

| Headers | Name     | Content             |
| :-------- | :------- | :------------------------- |
| `Authorizarion` | `Bearer` | **YOUR_TOKEN** |

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Required**. Your new name to replace the old one|

### GET 

```http
  GET /me
```

| Headers | Name     | Content             |
| :-------- | :------- | :------------------------- |
| `Authorizarion` | `Bearer` | **YOUR_TOKEN** |

Returns the information for you user with 

```json 
name: <name> 
email: <email>
```

```http
  GET /messages
```
| Headers | Name     | Content             |
| :-------- | :------- | :------------------------- |
| `Authorizarion` | `Bearer` | **YOUR_TOKEN** |

Returns the messages from the latest chat used by the user, with chatID and content

```http
  GET /chats
```
| Headers | Name     | Content             |
| :-------- | :------- | :------------------------- |
| `Authorizarion` | `Bearer` | **YOUR_TOKEN** |

Returns all chats by the user, with creation date, last updated timestamp and count of messages




## PT

Backend com fastify/Typescript, todo o código trabalha com tipagem forte e interfaces que mapeiam os dados que transitam nas rotas desenvolvidas. Todo código tenta ser mínimo e focando em uma reproducibilidade, permitindo que módulos sejam reaproveitados no próprio projeto e em outros projetos.


## Instalação e Testes 

Você pode testar localmente com Docker compose,apenas rodando 

```bash
sudo docker compose up  
```

Siga o readme na pasta DOCS para configurar um .env facilmente.



Ou rode localmente com 

```bash
pnpm install 
pnpm prisma generate
pnpm prisma migrate deploy
pnpm run build 
node dist/index.js
```

e teste as rotas descritas em inglês com postman ou com os comandos curl que estão no README encontrado em docs/



