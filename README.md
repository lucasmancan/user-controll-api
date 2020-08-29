# Api de controle de usuários

Aplicação para registro e autenticação de usuário proposta como desafio de programação.

## Documentação

O sistema proposto possuí a finalidade de permitir o registro de um usuário, assim como sua autenticação no sistema e consulta de seus próprios dados, sendo assim restringido o acesso a dados de outros usuários da plataforma e tendo a sessão válida por 30 minutos.

Algumas melhorias arquiteturais da aplicação foram aplicadas no endpoint de busca de dados de usuário, para que a responsabilidade de conhecer a identificação não fique a cargo do usuário da API, mas sim do token de autenticação, que irá armazenar essa identificação do usuário.


### Tecnologias
* Node.js
* JavaScript
* Typescript
* Express.js 
* Jest (Unit testing)
* Mongoose

#### Banco de dados
* MongoDB

#### Dependências

```

"dependencies": {
    "@types/swagger-ui-express": "^4.1.2",
    "@types/validator": "^13.1.0",
    "@types/yamljs": "^0.2.31",
    "bcryptjs": "^2.4.3",
    "config": "^3.1.0",
    "cors": "^2.8.5",
    "express": "^4.16.4",
    "express-validator": "^5.3.1",
    "http-status-codes": "^1.3.2",
    "jsonwebtoken": "^8.5.1",
    "mongoose": "^5.5.7",
    "request": "^2.88.0",
    "swagger-ui-express": "^4.1.4",
    "validator": "^13.1.1",
    "yamljs": "^0.3.0"
  },
```

#### API Docs
A documentação oficial em formato OpenAPI 3.0 pode ser consultada através da implementação do Swagger, disponível em: https://user-controll-api.herokuapp.com/api-docs.

## Instruções para Devs :)

```bash
#Download do projeto
git clone https://github.com/lucasmancan/user-controll-api.git

cd /user-controll-api

#Instalação das dependências
npm i

#Rodando os testes
npm run test

#Inciando o servidor de desenvolvimento

./config/default.json
{
  "mongoURI": "<Digite uma connection string válida>",
  "jwtSecret": "jwtSecretToken",
  "jwtExpiration": 1800
}

npm run server
```

## Licença
[MIT](https://choosealicense.com/licenses/mit/)

## Autor
[Lucas Frederico Mançan](https://www.linkedin.com/in/lucasmancan/)
