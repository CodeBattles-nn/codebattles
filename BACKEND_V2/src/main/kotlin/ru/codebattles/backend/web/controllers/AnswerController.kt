package ru.codebattles.backend.web.controllers

import io.swagger.v3.oas.annotations.security.SecurityRequirement
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import ru.codebattles.backend.dto.AnswerDto
import ru.codebattles.backend.services.AnswerService

@RestController
@RequestMapping("/api/answers")
@SecurityRequirement(name = "JWT")
class AnswerController(
    val answerService: AnswerService,
) {
    @GetMapping("{id}")
    fun getById(@PathVariable id: Long): AnswerDto {
        return answerService.getById(id)
    }
}
