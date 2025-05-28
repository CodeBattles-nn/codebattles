package ru.codebattles.backend.web.controllers

import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import ru.codebattles.backend.web.entity.RenderedError

@Tag(name = "Ping Pong", description = "Endpoints for ping-pong testing")
@RestController
@RequestMapping("/api/ping")
class PingPongController {
    @Operation(
        summary = "Ping endpoint",
        description = "Returns a 'pong' response to test the API availability."
    )
    @GetMapping
    fun ping(): RenderedError {
        return RenderedError(detail = "pong")
    }
}