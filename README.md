# Library/E-Books

This is a project to test my skills using React and Nodejs.
This project is for renting and reading books virtually where you can register and be the author
of the books shown or you can be a reader of the many that exist

### Built With

- [![NestJs][Nestjs]][Nest-url]
- [![Docker][Docker]][Docker-url]
- [![MySql][MySql]][mysql-url]
- [![Swagger][Swagger]][swagger-url]

[Nestjs]: https://img.shields.io/badge/nestjs-000000?style=for-the-badge&logo=nestjs&logoColor=red
[Nest-url]: https://nestjs.com/
[Docker]: https://img.shields.io/badge/docker-000000?style=for-the-badge&logo=docker&logoColor=blue
[Docker-url]: https://www.docker.com/
[MySql]: https://img.shields.io/badge/mysql-000000?style=for-the-badge&logo=mysql&logoColor=blue
[mysql-url]: https://www.mysql.com/
[Swagger]: https://img.shields.io/badge/swagger-000000?style=for-the-badge&logo=swagger&logoColor=green
[swagger-url]: https://swagger.io/

<!-- GETTING STARTED -->

## Getting Started

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/VladimirMatos/library-backend
   ```
2. Create docker image

   ```sh
    docker-compose build
    docker-compose up -d
   ```

3. Create database using this name: "library"(It is necessary to use this name)

4. Run again

```sh
   docker-compose build
   docker-compose up -d
```

5. Create tables
   ```sh
    docker exec -it library npm run migration:run
   ```
6. Generate SEED

```sh
  POST: localhost:3001/api/roles/
  POST: localhost:3001/api/category
```

7. For use the api
   ```sh
      http://localhost:3001/api/
   ```
8. Use API documentary
   ```sh
     http://localhost:3001/
   ```
