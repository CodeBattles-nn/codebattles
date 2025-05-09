package ru.codebattles.backend.web.controllers

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import ru.codebattles.backend.web.entity.RenderedError

@RestController
@RequestMapping("/api/ping")
class PingPongController(
) {

    @GetMapping
    fun ping(): RenderedError {
        return RenderedError(detail = "pong")
    }


}
