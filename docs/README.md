# 

## EN 

First, configure an api key for gemini in backend/.env

If the api key is not configured, morpheus will return random answers from the job challenge description 

um exemplo de .env funcional para trabalhar com o docker-compose dado é


GEMINI_API_KEY="(sua api key)"
DATABASE_URL="postgresql://postgres:yourpassword@psql:5432/postgres"
POSTGRES_USER=postgres
POSTGRES_PASSWORD=yourpassword
POSTGRES_DB=yourdatabase

JWT_SECRET="whateveritis"

now read the READMEs from frontend/ and backend/ 


You can test the routes from the backend with postman

Currently, the register does not automatically send you to the chat, you can click on "login" and then login normally and acess morpheus



## PT

Copie o .env da explicação em inglês e então utilize sudo docker compose up, ou então configure uma database_url para um docker compose (um facilitador está em backend/common) e rode localmente com os comandos disponívels no README de backend/

Atualmente o registro não te leva diretamente para o chat ou para o login, clique no login e faça login normalmente com seu usuário registrado. 

### Postman test examples

![POST login request](./assets/login.png)

![GET me request](./assets/me.png)

![POST message request](./assets/message.png)

## Morpheus Functioning with Gemini-2.5-flash


![English answer](./screenshots/morpheus-english.jpg)


![Portuguese answer](./screenshots/morpheus.jpg)
