package ru.codebattles.backend.web.controllers

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import ru.codebattles.backend.dto.AnswerDto
import ru.codebattles.backend.services.AnswerService

@RestController
@RequestMapping("/api/answers")
class AnswerController(
    val answerService: AnswerService,
) {
    @GetMapping("{id}")
    fun getById(@PathVariable id: Long): AnswerDto {
        return answerService.getById(id)
    }
}
