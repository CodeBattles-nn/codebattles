#
# Build stage
#
FROM maven:3.9.3-sapmachine-17 AS build
COPY src /home/app/src
COPY pom.xml /home/app
RUN mvn -f /home/app/pom.xml clean package

#
# Package stage
#
FROM alpine:3.18.3

RUN apk add --update --no-cache python3~=3.11 && ln -sf python3 /usr/bin/python
RUN apk add --update --no-cache openjdk17

COPY --from=build /home/app/target/ProgramCheckSystem-1.0-SNAPSHOT.jar /usr/local/lib/demo.jar
EXPOSE 7070
ENTRYPOINT ["java","-jar","/usr/local/lib/demo.jar"]