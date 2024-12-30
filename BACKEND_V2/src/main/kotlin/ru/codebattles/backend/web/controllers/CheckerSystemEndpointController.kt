package ru.codebattles.backend.web.controllers

import com.fasterxml.jackson.databind.ObjectMapper
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController
import ru.codebattles.backend.entity.AnswerStatus
import ru.codebattles.backend.repository.AnswerRepository
import ru.codebattles.backend.repository.CompetitionProblemsRepository
import ru.codebattles.backend.web.entity.checker.CheckerCallback

@RestController
class CheckerSystemEndpointController(
    val answerRepository: AnswerRepository,
    val competitionProblemsRepository: CompetitionProblemsRepository,
    val objectMapper: ObjectMapper
) {
    @PostMapping("/api/check_system_callback")
    fun checkerCallBack(@RequestBody data: CheckerCallback) {
        println()

        val answer = answerRepository.getById(data.meta)

        answer.result = objectMapper.writeValueAsString(data)
        answer.status = AnswerStatus.COMPLETED;

        answerRepository.save(answer)
    }
}
