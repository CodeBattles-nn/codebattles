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
FROM ubuntu

#RUN apk add openjdk17-jre
WORKDIR /

RUN apt update
RUN apt-get install g++ -y
RUN apt install openjdk-17-jre -y

COPY --from=build /home/app/target/ProgramCheckSystem-1.0-SNAPSHOT.jar /usr/local/lib/demo.jar
EXPOSE 7070

ENV SERVER_ENDPOINT  http://backend:8000/api/check_system_callback
ENV ENV_EXECUTOR_ENABLE true
ENV ENV_EXECUTOR_COMPILER_NEED true
ENV ENV_EXECUTOR_COMPILER_COMMAND "g++ ./main.cpp"
ENV ENV_EXECUTOR_FILENAME main.cpp
ENV ENV_EXECUTOR_WITH_FILENAME false
ENV ENV_EXECUTOR_RUN_COMMAND "mv a.out hello && ./hello"

ENTRYPOINT ["java","-jar","/usr/local/lib/demo.jar"]