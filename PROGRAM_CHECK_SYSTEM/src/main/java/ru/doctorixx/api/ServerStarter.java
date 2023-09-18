package ru.doctorixx.api;

import io.javalin.Javalin;

import java.io.File;

public class ServerStarter {
    public static void main(String[] args) {
        File adir = new File("adir");
        adir.mkdir();

        Javalin.create(/*config*/)
                .get("/", ctx -> ctx.result("Hello World"))
                .post("/api/v1/test", new APIHandler())
                .start(7070);
    }
}
