# password-verifier

Uma nobre ferramenta que avalia a força da sua senha de forma simples dadas algumas regras possíveis.

## As regras
Abaixo seguem as regras possíveis para validação da força da senha. Não é necessário utilizar todas. Inclusive, é possível não utilizar nenhuma. Todas as regras aceitam um número inteiro como valor.

| Regra           | Descrição                                                      |
|-----------------|----------------------------------------------------------------|
| minSize         | Quantidade mínima de caracter que a senha deve ter             |
| minUppercase    | Quantidade mínima de caracteres maiúsculos                     |
| minLowercase    | Quantidade mínima de caracteres minúsculos                     |
| minDigit        | Quantidade mínima de numerais (0-9)                            |
| minSpecialChars | Quantidade mínima de caracteres especiais (!@#$%^&*()-+\/{}[]) |
| noRepeated      | Repetição de caracteres em sequência                           |


## Executar a aplicação
Execute o seguinte comando para subir um container da aplicação
```sh
docker compose up
```

## Endpoint

O serviço consiste de uma API GraphQL com uma rota única `/graphql` e, também, uma única _query_ única, chamada `verify`. Com base na senha informada e nas regras escolhidas, o sistema validará a força da senha. 

Endpoint 
```sh
POST http://localhost:8080/graphql
```

Ao acessar `/graphql`, você irá encontrar uma IDE para fazer as validações no próprio ambiente, sem necessidade de utilizar ferramentas terceiras.

## Exemplo

Para o exemplo abaixo, uma senha forte é aquela que consiste de, no mínimo, 8 (oito) caracteres, 2 (dois) caracteres especiais, 4 (quatro) numerais e não possui sequência repetida de caracteres. Com base nessas premissas, as seguintes regras deverão ser utilizadas:

### Request

```gql
query {
    verify(password: "TesteSenhaForte!123&", rules: [
        {rule: "minSize", value: 8},
        { rule: "minSpecialChars", value: 2},
        { rule: "minRepeated", value: 0},
        { rule: "minDigit", value: 4}
    ]) {
        verify,
        noMatch
    }
}
```

### Response

Uma chamada bem sucedida para esse serviço resultará na devolução de dois valores, que são `verify` e `noMatch`.

| Propriedade | Valor | Descrição |
|-------------|-------|-----------|
| verify | boolean | Indica se a senha foi validada por todas as regras, sendo _true_ quando a senha cumpre todas as regras e _false_ caso não cumpra ao menos um dos requisitos |
| noMatch | string[] | Contém todas as regras que foram violadas pela senha. Caso não haja regra violada, o array estará vazio |


## Tecnologias

Este projeto foi desenvolvido com as seguintes tecnologias:
- [TypeScript](https://typescriptlang.org/)
- [Apollo Server](https://www.apollographql.com/docs/apollo-server/)
- [Express](https://expressjs.com/)
- [GraphQL](https://graphql.org/)
- [Dotenv](https://www.npmjs.com/package/dotenv)
- [Express async errors](https://www.npmjs.com/package/express-async-errors)
- [Docker](https://www.docker.com/)

## Licença
 MIT