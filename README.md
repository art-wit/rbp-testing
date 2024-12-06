## [TASK#1](https://github.com/art-wit/rbp-testing/blob/main/task%231.md)
## [TASK#2](https://github.com/art-wit/rbp-testing/blob/main/task%232.md)
## [TASK#3](https://github.com/art-wit/rbp-testing/blob/main/task%233.md)
## TASK#4: Автотесты для тренировочного сервиса [Restful Booker Platform](https://github.com/mwinteringham/restful-booker-platform)

 - ### **Установить зависимости (по идее так):**
```
npm i
```
 - ### **Установить переменную окружения для DELETE запросов:**
```
NOT_PARTICULARLY_SECRET_TOKEN
```
Вот для этого заголовка:
```
    extraHTTPHeaders: {
      /**
       * Just put here valid token
       */
      'Cookie': `token=${process.env.NOT_PARTICULARLY_SECRET_TOKEN}`,
    },
```
 - ### **Запустить можно вот так:**
```
npm run protected-tests
```

