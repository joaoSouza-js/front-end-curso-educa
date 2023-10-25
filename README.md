Claro, vou resumir o que fiz no teste de desenvolvimento:

1. Criei uma API usando Fastify, que é responsável por gerenciar os dados das postagens.
   - O código-fonte da API pode ser encontrado [aqui](https://github.com/joaoSouza-js/api_with_fastify).
   - Usei Prisma para lidar com o banco de dados e criar endpoints para as operações CRUD.

2. Desenvolvi a interface do usuário no Figma.
   - O design do projeto está disponível [aqui](https://www.figma.com/file/uYqLmMeSNwDAI0ZjlfiMNt/social-network-test?type=design&node-id=0%3A1&mode=design&t=rQ2xr4qpJU9fLbe8-1).

3. Implementei o front-end da aplicação usando React, Redux e Vite.
   - As configurações do pacote para o front-end estão disponíveis no arquivo `package.json`.
   - Usei pnpm como gerenciador de pacotes, mas os desenvolvedores podem optar por Yarn ou npm.

Para instalar as dependências em cada ambiente, basta seguir os comandos padrão do gerenciador de pacotes escolhido:

- Usando pnpm:
  ```
  pnpm install
  ```

- Usando Yarn:
  ```
  yarn install
  ```

- Usando npm:
  ```
  npm install
  ```

  Claro, vou adicionar as informações sobre como utilizei o Prisma para o banco de dados e como os outros desenvolvedores podem fazer o mesmo. Também vou mencionar a criação do seed e fornecer informações de um usuário para fins de teste.

Utilizei Prisma para gerenciar o banco de dados da aplicação. Para visualizar e interagir com o banco de dados, você pode usar o Prisma Studio. Eis como você pode fazer isso nos diferentes gerenciadores de pacotes:

- Usando pnpm:
  ```
  npx prisma studio
  ```

- Usando Yarn:
  ```
  yarn prisma studio
  ```

- Usando npm:
  ```
  npx prisma studio
  ```

O comando acima abrirá o Prisma Studio no navegador, permitindo que você explore os dados do banco de dados de forma visual.

Além disso, criei um script de seed que permite popular o banco de dados com novos dados de teste. Para executar o seed e adicionar esses dados, você pode usar o seguinte comando:

- Usando pnpm:
  ```
  npx prisma db seed
  ```

- Usando Yarn:
  ```
  yarn prisma db seed
  ```

- Usando npm:
  ```
  npx prisma db seed
  ```

No entanto, se você não quiser rodar o seed, saiba que o banco de dados já está populado com dados de teste. Além disso, um usuário de teste foi criado com o seguinte email e senha:

- Email: Julien.Miller@hotmail.com
- Senha: po6aS18tI8OWS6Y

Essas informações de usuário podem ser usadas para testar o sistema.

Isso resume as principais etapas que executei no teste de desenvolvimento. Se você tiver alguma pergunta específica ou precisar de mais detalhes sobre algum aspecto do projeto, fique à vontade para perguntar.
