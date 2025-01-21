package ru.codebattles.backend.web.controllers

import io.swagger.v3.oas.annotations.security.SecurityRequirement
import org.springframework.web.bind.annotation.*
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

    @GetMapping("/last")
    fun getLastSendByProblemAnswerAndUserId(
        @RequestParam compProblemId: Long,
        @RequestParam userId: Long,
        ): AnswerDto {
        return answerService.getLastByUserIdAndCompetitionsAnswerId(userId, compProblemId)
    }
}
