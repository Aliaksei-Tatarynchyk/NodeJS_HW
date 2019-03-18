# NodeJS_HW
Postgres installation:
- Download postgres container image:
  - docker pull postgres
- Run postgres container from the image on port 5432:
  - docker run --rm --name pg -e POSTGRES_PASSWORD=postgres -d -p 5432:5432 -v <path-to-project>/data:/data postgres
    - e.g. docker run --rm --name pg -e POSTGRES_PASSWORD=postgres -d -p 5432:5432 -v //d/Projects/Non-project/NodeJS_HW/data:/data postgres
    - you might first have to share D drive to docker: https://headsigned.com/posts/mounting-docker-volumes-with-docker-toolbox-for-windows/
    - you might also have to forward port 5432 in VirtualBox if you use docker-toolbox
- Create an initial DB structure and load data:
  - npm run db-update
  # via pure SQL: docker exec -it pg psql -U postgres -f /data/postgres.sql


Some useful docker commands:
- Execute an interactive bash shell on the container:
  - docker exec -it pg bash
- Connect to postgres:
  - docker exec -it pg psql -U postgres