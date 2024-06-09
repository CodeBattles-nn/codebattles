# syntax=docker/dockerfile:1

FROM python:3.9.19-alpine3.20

WORKDIR /app

COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt

COPY . /app

CMD python3 docker_starter.py