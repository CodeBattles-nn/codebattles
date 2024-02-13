#
# Build stage
#
FROM maven:3.9.3-sapmachine-17 AS build
COPY PROGRAM_CHECK_SYSTEM/src /home/app/src
COPY PROGRAM_CHECK_SYSTEM/pom.xml /home/app
RUN mvn -f /home/app/pom.xml clean package

#
# Package stage
#
FROM openjdk:17-alpine

WORKDIR /

ENV SERVER_ENDPOINT  http://backend:8000/api/check_system_callback
ENV ENV_EXECUTOR_ENABLE true
ENV ENV_EXECUTOR_COMPILER_NEED false
ENV ENV_EXECUTOR_COMPILER_COMMAND fpc main.pas
ENV ENV_EXECUTOR_FILENAME main.pas
ENV ENV_EXECUTOR_WITH_FILENAME true
ENV ENV_EXECUTOR_RUN_COMMAND ./main


COPY --from=build /home/app/target/ProgramCheckSystem-1.0-SNAPSHOT.jar /usr/local/lib/demo.jar
EXPOSE 7070
ENTRYPOINT ["java","-jar","/usr/local/lib/demo.jar"]