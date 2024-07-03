# [Codebattles](https://codebattles.ru)

Programming competition system

[![deploy](https://github.com/doctorixx/CodeBattles/actions/workflows/deploy.yml/badge.svg?branch=master)](https://github.com/doctorixx/CodeBattles/actions/workflows/deploy.yml)
[![Licence](https://img.shields.io/github/license/CodeBattles-nn/CodeBattles?style=flat)](./LICENSE)
![GitHub commit activity](https://img.shields.io/github/commit-activity/w/codebattles-nn/codebattles)
![Lines of code](https://img.shields.io/endpoint?url=https://ghloc.vercel.app/api/codebattles-nn/codebattles/badge)
![GitHub language count](https://img.shields.io/github/languages/count/codebattles-nn/codebattles)

![Main image](images/image1.png)

[Documentation RU](https://doctorixx.gitbook.io/codebattles/)

[Documentation EN](https://doctorixx.gitbook.io/codebattles/v/en)

[Service monitoring](https://doctorixx.gitbook.io/codebattles/v/en)

## Get started

> You must install Docker Compose to run:

```shell
docker compose up
```

> [!TIP]
> For run app in background mode add flag -d
> Example:
> ```bash
> docker compose up -d
> ```

### Tested at

| Architecture |           Status           |
|--------------|:--------------------------:|
| x64          |      ✅  (In registry)      |
| aarch64      | ✅  (Required manual build) |
| x32          |             ❓              |

## Update

- Pull new version of code from repository

```shell
git pull
```

- Pull docker images

```shell
docker compose pull
```

- And finally run application

```shell
docker compose up
```

## Usage

Go to [http://localhost:2500](http://localhost:2500)
___

### Open container ports

- Gateway on port 2500
- Server part on port 8001
- Frontend on port 8000
- Database on port 25565
- Redis on port 6379

### Generate tasks for compeptition

For this create your custom tasks or use public repository

[![Readme Card](https://github-readme-stats.vercel.app/api/pin/?username=codebattles-nn&repo=task-generator)](https://github.com/codebattles-nn/task-generator)
[![Readme Card](https://github-readme-stats.vercel.app/api/pin/?username=codebattles-nn&repo=problems-repo)](https://github.com/codebattles-nn/problems-repo)

## Main contributors

Thank you for your huge contribution to the project:

- **user3050** - security audit and vulnerability search
- **[Zeevss](https://github.com/Zeevss)** - testing and suggestions

Thanks to [school30nn](https://school30nn.ru) for use of the system and provision of server resources

## SAST Tools

[PVS-Studio](https://pvs-studio.com/pvs-studio/?utm_source=website&utm_medium=github&utm_campaign=open_source) - static analyzer for C, C++, C#, and Java code.


___
CodeBattles, 2024
