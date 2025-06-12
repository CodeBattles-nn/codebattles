#
# Build stage
#
FROM maven:3.9.6-eclipse-temurin-21-alpine AS build
COPY ../PROGRAM_CHECK_SYSTEM/src /home/app/src
COPY ../PROGRAM_CHECK_SYSTEM/pom.xml /home/app
RUN mvn -f /home/app/pom.xml clean package

#
# Package stage
#
FROM alpine:20240329

RUN apk add openjdk17-jre bubblewrap

WORKDIR /app

ARG UID=10001
RUN adduser \
    --disabled-password \
    --gecos "" \
    --home "/nonexistent" \
    --shell "/sbin/nologin" \
    --no-create-home \
    --uid "${UID}" \
    appuser


ENV SERVER_ENDPOINT  http://backend:8000/api/check_system_callback
ENV ENV_EXECUTOR_ENABLE true
ENV ENV_EXECUTOR_RUN_COMMAND python3
ENV ENV_EXECUTOR_FILENAME main.py

RUN apk add --update --no-cache python3 && ln -sf python3 /usr/bin/python
RUN chmod -R 555 /app && mkdir /app/adir && chattr +i /app/adir && chmod -R 557 /app/adir

USER appuser

COPY --from=build /home/app/target/ProgramCheckSystem-1.0-SNAPSHOT.jar /app/main.jar


EXPOSE 7070
ENTRYPOINT ["java","-jar","/app/main.jar"]
