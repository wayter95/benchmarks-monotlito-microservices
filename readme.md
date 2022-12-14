# Videoflix

## _Comparação de uma aplicação "Monolita" vs "Microsserviços"_

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

## Arquitetura Monolito

![mono](images/monolito.jpeg)

## Arquitetura Microsserviços

![mono](images/microservices.jpeg)

## Techs Monolito

Tecnologias utilizadas no desenvolvimento do monolito

- Node JS - Executar códigos javascript como servidor
- Typescript - Adicionar tipagem ao javascript
- Express - Permitir requisições HTTP REST
- Jsonwebtoken - Gerar e verificar a autenticação de usúarios
- Postgres - Banco de dados
- Docker - Controler de containers

## Techs Microsserviços

Tecnologias utilizadas no desenvolvimento dos microsserviços

- Node JS - Executar códigos javascript como servidor
- Typescript - Adicionar tipagem ao javascript
- Express - Permitir requisições HTTP REST
- Jsonwebtoken - Gerar e verificar a autenticação de usúarios
- Postgres - Banco de dados
- Docker - Controle e instalação de containers
- Apache Kafka - Comunicação entre os serviços
- Kong - Gateway e balaceamento dos serviços

## Techs Testes

Tecnologias utilizadas para fazer os test de requisição e stress

- Postman - Plataforma para testes http rest
- k6 - Feramenta para gerar testes de stress nas aplicações

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

| Modulo       | Tipo de Requisição | Monolito                | Microsserviços         |
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

| Modulo       | Monolito | Microsserviços |
| ------------ | -------- | -------------- |
| Autenticação | 350 ms   | 252 ms         |
| Gerenciador  | 373 ms   | 265 ms         |
| Cliente      | 297 ms   | 232 ms         |

### Vazão

| Modulo       | Monolito | Microsserviços |
| ------------ | -------- | -------------- |
| Autenticação | 35       | 41             |
| Gerenciador  | 41       | 28             |
| Cliente      | 89       | 107            |

### Uso do hardware

#### Monolito

| Modulo       | RAM   | CPU   |
| ------------ | ----- | ----- |
| Autenticação | 428mb | 8.49% |
| Gerenciador  | 413mb | 7.59% |
| Cliente      | 649mb | 1.29% |

#### Microsserviços

| Modulo       | RAM    | CPU   |
| ------------ | ------ | ----- |
| Autenticação | 1958mb | 2.25% |
| Gerenciador  | 1991mb | 4.8%  |
| Cliente      | 1981mb | 4.05% |
