# Videoflix

## _Comparação de uma aplicação "Monolita" vs "Microserviços"_

A aplicação se trata de um serviço de streaming de vídeos onde os Gerenciadores adicionam vídeos de sua preferência e os clientes cadastrados possam escolher um e assistir.

## Features

- Cadastro de usúarios (Gerenciador/Clientes)
- Autenticação de usúarios (Gerenciador/Clientes)
- Perfil de usúarios - Busca de dados do usúario por Id (Gerenciador/Clientes)
- Cadastro de vídeos (Gerenciador)
- Listagem de vídeos cadastrados (Gerenciador/Clientes)
- Assistir videos - Busca de video por Id (Clientes)

O desenvolvimento de duas versoões foi feito para fazer uma comparação
entre ambas com o objetivo de analisar as mestricas de resposta HTTP e o consumo
de hardware na execução dos testes.

## Techs Monolito

Tecnologias utilizadas no desenvolvimento do monolito

- Node JS - Executar códigos javascript como servidor
- Typescript - Adicionar tipagem ao javascript
- Express - Permitir requisições HTTP REST
- Jsonwebtoken - Gerar e verificar a autenticação de usúarios
- Postgres - Banco de dados
- Docker - Controler de containers

## Techs Microserviços

Tecnologias utilizadas no desenvolvimento dos microserviços

- Node JS - Executar códigos javascript como servidor
- Typescript - Adicionar tipagem ao javascript
- Express - Permitir requisições HTTP REST
- Jsonwebtoken - Gerar e verificar a autenticação de usúarios
- Postgres - Banco de dados
- Docker - Controle e instalação de containers
- Apache Kafka - Comunicação entre os serviços
- Kong - Gateway e balaceamento dos serviços

## Ambiente de instalação

Para testar os serviços foi criado duas instancia EC2 na aws do tipo T3.large,
sendo uma instancia para cada aplicacao. Quais as configuraçoes das instancias são:

- Sistema Operacional: Ubuntu 22.04 - 64bits
- vCPU: 2
- Memoria RAM: 8gb
- Armazenamento: 20gb

## Rotas testadas

Os tester foram feitos em 3 rotas diferentes para que sejam analisados todos os modulos
dentro dos microserviços e do monolito, são elas:

| Modulo       | Tipo de Requisição | Monolito                | Microserviços          |
| ------------ | ------------------ | ----------------------- | ---------------------- |
| Autenticação | POST               | /account/authentication | /authentication/signin |
| Gerenciador  | POST               | /video                  | /manager/video/add     |
| Cliente      | GET                | /video                  | /customer/videos       |

## Comparações

Para cada metrica foram feitos 3 testes em cada uma das rotas mostradas acima e feito a media dos resultados.

- Latência: diferença entre o tempo de envio de uma requisição e o tempo da chegada da resposta para essa requisição.
- Vazão:​ quantidade de requisições respondidas por segundo.
- Uso do hardware: ​taxas de uso do CPU e memória RAM.

### Latência

| Modulo       | Monolito | Microserviços |
| ------------ | -------- | ------------- |
| Autenticação | 350 ms   | 252 ms        |
| Gerenciador  | 373 ms   | 265 ms        |
| Cliente      | 297 ms   | 232 ms        |
