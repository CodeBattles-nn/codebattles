# CodeBattles

[![deploy](https://github.com/doctorixx/CodeBattles/actions/workflows/deploy.yml/badge.svg?branch=master)](https://github.com/doctorixx/CodeBattles/actions/workflows/deploy.yml)
[![Licence](https://img.shields.io/github/license/doctorixx/CodeBattles?style=flat)](./LICENSE)
## Info
Like codeforces or Yandex Contest system

[Documentation RU](https://doctorixx.gitbook.io/codebattles/)

[Documentation EN](https://doctorixx.gitbook.io/codebattles/v/en) 

## Starting

```shell
docker compose up
```

## Usage
go to page localhost
___
### Main endpoints
| Endpoint       |       Description |
|----------------|-------------------|
|/admin          | Admin panel       |
|/admin/problems | See all problems  |
|/               | Student interface |




## Containers exposed ports

- Gateway at 80 port
- Backend at 8001 port
- Frontend at 8000
- Database at 25565 port
- Redis at 6379 port
