# FrontEND - Chat Teste 

## EN 

React/Typescript + Vite Front-End using ui.shadcn components, since they are easier to organize, reuse and to keep a modular application, the dark-mode is provided by ui.shadcn and should follow your system settings 

--- 

### Landing 

Simple page showing what the product/site is, just to get you into the login page so you can operate Morpheus

--- 

### Register 

Register a user in the database so it can access protected routes, currently, does not redirect to login, you have to login with the created user, and that will redirect you to the bot chat 

---

### UserView/ChangeUser

Works with PATCH requests and updates the information from your user, it gets it from the jwt verification 

---

## Chat 

Your main page to work on, you can create chats, send messages and play around with morpheus, responses are quick and precise since we're using a _gemini-flash_ model

---

## Install dependencies

To keep it unified with _ui.shadcn_, I used **pnpm** for all other dependencies.  
Use `pnpm install` and run `pnpm run build` if you want to export it for an **Nginx build**, but everything can also be done with `pnpm run dev`.

---

## PT-BR

Front-End em React/Typescript + Vite utilizando componentes do **ui.shadcn**, pois são mais fáceis de organizar, reutilizar e manter uma aplicação modular.  
O **modo escuro** é fornecido pelo ui.shadcn e deve seguir as configurações do seu sistema.

---

### Landing

Página simples que mostra o que é o produto/site, apenas para direcionar você à página de **login**, onde poderá operar o **Morpheus**.

---

### Register

Registra um usuário no banco de dados para que ele possa acessar rotas protegidas.  
Atualmente **não redireciona automaticamente para o login** — você precisa fazer login com o usuário criado, e então será redirecionado para o chat do bot.

---

### UserView/ChangeUser

Funciona com requisições **PATCH** e atualiza as informações do seu usuário, obtidas a partir da **verificação do JWT**.

---

## Chat

Sua página principal de trabalho — aqui você pode **criar chats, enviar mensagens e interagir com o Morpheus**.  
As respostas são **rápidas e precisas**, já que estamos utilizando o modelo **_gemini-flash_**.


FrontEnd com React/Typescript + Vite, optei por usar ui.shadcn para tudo, considero mais fácil de modularizar e reutilizar componentes já importados antes 

O botão de *Logout* que está na aplicação serve para testar proteção das rotas e utilizar outro usuário no chat ao vivo com a IA, Morpheus

---

`Instalar dependências` 

Para unificar com o _ui.shadcn_, utilzei o pnpm para todas as outras dependências, use pnpm install e rode `pnpm run build` se quiser exportar para uam build nginx, mas tudo pode ser feito com `pnpm run dev`.


//TOFIX: ALERT PARA ERRO NA PÁGINA REGISTER NÃO APARECE