package ru.codebattles.backend.web.controllers

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class HelloWorldController {
    @GetMapping
    fun helloWorld(): String {
        return "Hello, world!"
    }
}