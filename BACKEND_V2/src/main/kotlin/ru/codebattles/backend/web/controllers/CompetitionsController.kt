package ru.codebattles.backend.web.controllers

import io.swagger.v3.oas.annotations.security.SecurityRequirement
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.web.bind.annotation.*
import ru.codebattles.backend.dto.AnswerDto
import ru.codebattles.backend.dto.CompetitionCreateDto
import ru.codebattles.backend.dto.CompetitionDto
import ru.codebattles.backend.dto.CompetitionsProblemsDto
import ru.codebattles.backend.entity.*
import ru.codebattles.backend.services.AnswerService
import ru.codebattles.backend.services.CompetitionService
import ru.codebattles.backend.web.entity.SendAnswerRequest


@RestController
@RequestMapping("/api/competitions")
@SecurityRequirement(name = "JWT")
class CompetitionsController {
    @Autowired
    private lateinit var competitionService: CompetitionService

    @Autowired
    private lateinit var answerService: AnswerService

    @PostMapping
    fun create(@RequestBody instance: CompetitionCreateDto, @AuthenticationPrincipal user: User): CompetitionDto {
        return competitionService.create(instance, user)
    }

    @GetMapping("{id}")
    fun getById(@PathVariable id: Long): CompetitionDto {
        return competitionService.getById(id)
    }

    @PostMapping("{id}/send")
    fun send(@PathVariable id: Long, @AuthenticationPrincipal user: User, @RequestBody data: SendAnswerRequest): String {
        answerService.createAnswer(user, data)
        return "aboba"
    }

    @GetMapping("{id}/sends")
    fun getAnswers(@PathVariable id: Long, @AuthenticationPrincipal user: User): List<AnswerDto> {
        return answerService.getAllAnswersByCompetitionsAndUser(id, user);
    }

    @GetMapping("{id}/problems")
    fun getProblemsByCompetition(@PathVariable id: Long): List<CompetitionsProblemsDto> {
        return competitionService.getProblemsById(id)

    }    @GetMapping("{id}/leaderboard")
    fun leaderboard(@PathVariable id: Long): Leaderboard {
        return competitionService.getLeaderboardById(id)
    }

    @GetMapping("{compId}/problems/{id}")
    fun getProblemsByIdByCompetition(@PathVariable compId: Long, @PathVariable id: Long): CompetitionsProblemsDto {
        return competitionService.getProblemById(compId, id)
    }

    @GetMapping
    fun getAllAvaliableForUser(@AuthenticationPrincipal user: User): List<CompetitionDto> {
        return competitionService.getAllByUser(user)
    }
}
