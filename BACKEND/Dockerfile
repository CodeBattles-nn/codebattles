# syntax=docker/dockerfile:1

FROM python:3.8-alpine

WORKDIR /app

EXPOSE 5000:8000

COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt
RUN pip3 install gunicorn==21.2.0

COPY . /app

CMD cd src && gunicorn --workers=4 -b=0.0.0.0:8000 wsgi:app