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

WORKDIR /app

RUN apk add openjdk17-jre

ENV SERVER_ENDPOINT  http://backend:8000/api/check_system_callback
ENV ENV_EXECUTOR_ENABLE true

RUN chmod -R 555 /app && mkdir /app/adir && chattr +i /app/adir && chmod -R 557 /app/adir

COPY --from=build /home/app/target/ProgramCheckSystem-1.0-SNAPSHOT.jar /usr/local/lib/demo.jar
EXPOSE 7070
ENTRYPOINT ["java","-jar","/usr/local/lib/demo.jar"]