# Program Check System

by doctorixx

____

# [EN]

System for test programs like Codeforces or Yandex-Contest

Main usage - integration for other your apps

### Build

```
mvn compile
mvn package
```

### Run

* Go to folder **target**.
* There you can see file **ProgramCheckSystem-1.0-SNAPSHOT.jar**
* Run it

```
java -jar ProgramCheckSystem-1.0-SNAPSHOT.jar
```

## Usage

HTTP API

| Method | Headers                        | Body           | Address                     |
|--------|--------------------------------|----------------|----------------------------|
| POST   | Content-Type: application/json | (EXAMPLE BELOW) | SERVER_ADDRESS/api/v1/test |

```json
{
  "source": "a = int(input())\nb = int(input())\nprint(a + b)",
  "meta": "2",
  "compiler": "python",
  "tests": [
    {
      "in": "5\n1",
      "out": "6"
    },
    {
      "in": "5\n13",
      "out": "18"
    },
    {
      "in": "1000000\n1000000",
      "out": "2000000"
    },
    {
      "in": "-1\n1",
      "out": "0"
    },
    {
      "in": "50\n10",
      "out": "60"
    }
  ]
}
```

| Key      | Description                                                                                                              |
|----------|--------------------------------------------------------------------------------------------------------------------------|
| source   | Sourse program code                                                                                                      |
| compiler | Compiler key (Can configured in program)                                                                                 |
| meta     | Request meta data                                                                                                        |
| tests    | List of test                                                                                                             |
| in       | Test input data                                                                                                          |
| out      | Test output data                                                                                                         |

Server's response

```
OK
```

### Callback-response
After running all tests server will be send callback on configured adress

Callback Example
```json
{
  "results": [
    {
      "success": false,
      "out": "Traceback (most recent call last):\n  File \"main.py\", line 1, in <module>\n    qs\nNameError: name 'qs' is not defined",
      "msg": "RUNTIME_ERROR",
      "time": 88
    },
    {
      "success": true,
      "out": "15",
      "msg": "SUCCESS",
      "time": 50
    },
    {
      "success": false,
      "out": "Traceback (most recent call last):\n  File \"main.py\", line 1, in <module>\n    qs\nNameError: name 'qs' is not defined",
      "msg": "RUNTIME_ERROR",
      "time": 46
    }
  ],
  "meta": "{\"champ_id\": 1, \"user_id\": 3, \"problem\": \"A\", \"id\": 88}"
}
```

| Key     | Description                                                                                                              |
|---------|--------------------------------------------------------------------------------------------------------------------------|
| results | Test's results                                                                                                           |
| success | Test status                                                                                                              |
| out     | Tested program output                                                                                                    |
| msg     | Message running status                                                                                                   |
| time    | Execution time (in ms)                                                                                                   |
| meta    | Request metadata                                                                                                         |


___


# [RU]

Система, предназначеная для провреки программы на правильность с помощью тестов. (Как на Codeforces, Яндекс Контест)

Основное приминение - интергация со своими приложениями

### Сборка

```
mvn compile
mvn package
```

### Запуск

* Перейдите в директорию **target**.
* Там будет находится файл **ProgramCheckSystem-1.0-SNAPSHOT.jar**
* Запустите его

```
java -jar ProgramCheckSystem-1.0-SNAPSHOT.jar
```

## Взаимодействие

HTTP API

| Метод | Заголовки                      | Тело           | Адрес                      |
|-------|--------------------------------|----------------|----------------------------|
| POST  | Content-Type: application/json | (ПРИМЕР ВНИЗУ) | SERVER_ADDRESS/api/v1/test |

```json
{
  "source": "a = int(input())\nb = int(input())\nprint(a + b)",
  "meta": "2",
  "compiler": "python",
  "tests": [
    {
      "in": "5\n1",
      "out": "6"
    },
    {
      "in": "5\n13",
      "out": "18"
    },
    {
      "in": "1000000\n1000000",
      "out": "2000000"
    },
    {
      "in": "-1\n1",
      "out": "0"
    },
    {
      "in": "50\n10",
      "out": "60"
    }
  ]
}
```

| Ключ     | Описание                                                                                                                 |
|----------|--------------------------------------------------------------------------------------------------------------------------|
| source   | Исходный код приложение                                                                                                  |
| compiler | Ключ компилятора (Задается в программе                                                                                   |
| meta     | Данные, которые вышлет сервер обратно после прохождения всех тестов (Лучше всего использовать для размещения id запроса) |
| tests    | Список тестов                                                                                                            |
| in       | Входные данные теста                                                                                                     |
| out      | Выходные данные теста                                                                                                    |

Ответ сервера

```
OK
```

### Callback-запрос
После прохождения всех тестов сервер отправит вердикт на указанный адрес

Пример callback`а
```json
{
  "results": [
    {
      "success": false,
      "out": "Traceback (most recent call last):\n  File \"main.py\", line 1, in <module>\n    qs\nNameError: name 'qs' is not defined",
      "msg": "RUNTIME_ERROR",
      "time": 88
    },
    {
      "success": true,
      "out": "15",
      "msg": "SUCCESS",
      "time": 50
    },
    {
      "success": false,
      "out": "Traceback (most recent call last):\n  File \"main.py\", line 1, in <module>\n    qs\nNameError: name 'qs' is not defined",
      "msg": "RUNTIME_ERROR",
      "time": 46
    }
  ],
  "meta": "{\"champ_id\": 1, \"user_id\": 3, \"problem\": \"A\", \"id\": 88}"
}
```

| Ключ    | Описание                                                                                                                 |
|---------|--------------------------------------------------------------------------------------------------------------------------|
| results | Результаты                                                                                                               |
| success | Успешно или нет выполнение                                                                                               |
| out     | Вывод программы (Или ошибки)                                                                                             |
| msg     | Статус выполнения                                                                                                        |
| time    | Время выполнения теста (в мс)                                                                                            |
| meta    | Данные, которые вышлет сервер обратно после прохождения всех тестов (Лучше всего использовать для размещения id запроса) |


