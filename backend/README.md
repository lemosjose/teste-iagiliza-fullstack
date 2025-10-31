# Backend - Morpheus 

##  EN 

Simple backend using fastify/TypeScript. Everything is strongly typed and maximum attention was given to organization in the code. The code organization and the development of pages and components focus on reproduceability for this project extensions and the development of other projects. 

## Installation

### Database

You can work with a database locally or test everything through the docker comopose provided in the project root, then you can configure the `DATABASE_URL` as: 

```bash
DATABASE_URL="postgresql://postgres:prisma@psql:5432/postgres?schema=public"
```

and your backend/.env should also have your `GEMINI_API_KEY` configured.

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
  pnpm run build 
  <! --  Just in case, but not totally necessary ! -->
  pnpm prisma generate 
  <!-- -->
  pnpm prisma migrate deploy
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


#### Get item

```http
  GET /api/items/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

#### add(num1, num2)

Takes two numbers and returns the sum.



## PT

Backend com fastify/Typescript, todo o código trabalha com tipagem forte e interfaces que mapeiam os dados que transitam nas rotas desenvolvidas. Todo código tenta ser mínimo e focando em uma reproducibilidade, permitindo que módulos sejam reaproveitados no próprio projeto e em outros projetos. 


