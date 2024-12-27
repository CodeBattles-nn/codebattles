package ru.codebattles.backend.web.controllers

import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController
import ru.codebattles.backend.web.entity.checker.CheckerCallback

@RestController
class CheckerSystemEndpointController {
    @PostMapping("/api/check_system_callback")
    fun checkerCallBack(@RequestBody data: CheckerCallback) {
        TODO("Not implemented yet")
    }
}
