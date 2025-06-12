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
FROM alt:p11

RUN apt-get update && apt-get -y --fix-missing install kumir2 java-17-openjdk-headless

COPY --from=build /home/app/target/ProgramCheckSystem-1.0-SNAPSHOT.jar /usr/local/lib/demo.jar

ENV SERVER_ENDPOINT  http://backend:8000/api/check_system_callback
ENV ENV_EXECUTOR_ENABLE true
ENV ENV_EXECUTOR_COMPILER_NEED true
ENV ENV_EXECUTOR_COMPILER_COMMAND "kumir2-bc prog.kum"
ENV ENV_EXECUTOR_FILENAME prog.kum
ENV ENV_EXECUTOR_WITH_FILENAME false
ENV ENV_EXECUTOR_RUN_COMMAND "kumir2-xrun prog.kod"
ENV ENV_EXECUTOR_WITH_BOM true

RUN chmod -R 555 /app && mkdir /app/adir && chattr +i /app/adir && chmod -R 557 /app/adir

EXPOSE 7070
ENTRYPOINT ["java","-jar","/usr/local/lib/demo.jar"]