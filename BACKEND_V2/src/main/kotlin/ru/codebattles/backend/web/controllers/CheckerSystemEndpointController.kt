package ru.codebattles.backend.web.controllers

import com.fasterxml.jackson.databind.ObjectMapper
import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController
import ru.codebattles.backend.entity.AnswerStatus
import ru.codebattles.backend.repository.AnswerRepository
import ru.codebattles.backend.web.entity.checker.CheckerCallback

@Tag(name = "Checker system API", description = "Endpoints for checker system")
@RestController
class CheckerSystemEndpointController(
    val answerRepository: AnswerRepository,
    val objectMapper: ObjectMapper
) {
    @Operation(
        summary = "(Internal method) Handle checker system callback",
        description = "Processes the callback from the checker system, updates the answer status, and calculates the score. Used only for checkers. Access disabled if used via gateway"
    )
    @PostMapping("/api/check_system_callback")
    fun checkerCallBack(@RequestBody data: CheckerCallback) {
        println()

        val answer = answerRepository.getById(data.meta)

        val countOfTests = data.results.size
        val countOfSuccessTests = data.results.count { it.success }

        val score: Int = countOfSuccessTests / countOfTests * 100

        answer.result = objectMapper.writeValueAsString(data)
        answer.status = AnswerStatus.COMPLETED;
        answer.score = score



        answerRepository.save(answer)
    }
}
