package ru.codebattles.backend.web.controllers

import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue
import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.Parameter
import io.swagger.v3.oas.annotations.security.SecurityRequirement
import io.swagger.v3.oas.annotations.tags.Tag
import jakarta.annotation.security.RolesAllowed
import org.springframework.security.access.AccessDeniedException
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.web.bind.annotation.*
import ru.codebattles.backend.dto.AnswerDto
import ru.codebattles.backend.dto.mapper.AnswerMapper
import ru.codebattles.backend.entity.User
import ru.codebattles.backend.entity.UserRole
import ru.codebattles.backend.services.AnswerService
import ru.codebattles.backend.web.entity.checker.CheckerCallback

@Tag(name = "Answer", description = "Endpoints for answers")
@RestController
@RequestMapping("/api/answers")
@SecurityRequirement(name = "JWT")
class AnswerController(
    val answerService: AnswerService,
    val answerMapper: AnswerMapper,
    val objectMapper: ObjectMapper
) {

    @Operation(
        summary = "Get answer by ID",
        description = "Retrieves answer details by its ID. Requires access to the answer."
    )
    @GetMapping("{id}")
    fun getById(@PathVariable id: Long, @AuthenticationPrincipal user: User): AnswerDto {
        val answer = answerService.getById(id)
        val callback = objectMapper.readValue<CheckerCallback>(answer.result!!)

        if (!answer.competition.showOutput) {
            callback.results.map { result -> result.out = "???" }
        }
        if (!answer.competition.showInput) {
            answer.code = "???"
        }

        answer.result = objectMapper.writeValueAsString(callback)
        if (user.roles.contains(UserRole.ROLE_ADMIN) || answer.user.id == user.id) {
            return answerMapper.toDto(answer)
        }

        throw AccessDeniedException("You do not have access to this answer")
    }

    @Operation(
        summary = "[ADMIN] Get the last answer by problem and user ID",
        description = "Retrieves the most recent answer submitted by a specific user " +
                "for a specific competition problem. Required admin role."
    )
    @GetMapping("/last")
    @RolesAllowed("ADMIN")
    fun getLastSendByProblemAnswerAndUserId(
        @Parameter(description = "The ID of CompetitionProblem id", required = true)
        @RequestParam
        compProblemId: Long,

        @Parameter(description = "The ID of the user", required = true)
        @RequestParam
        userId: Long,
    ): AnswerDto {
        return answerService.getLastByUserIdAndCompetitionsAnswerId(userId, compProblemId)
    }
}
