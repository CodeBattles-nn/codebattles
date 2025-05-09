package ru.codebattles.backend.web.controllers

import io.swagger.v3.oas.annotations.security.SecurityRequirement
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.web.bind.annotation.*
import ru.codebattles.backend.annotations.CompetitionAccessRequired
import ru.codebattles.backend.dto.*
import ru.codebattles.backend.entity.Leaderboard
import ru.codebattles.backend.entity.User
import ru.codebattles.backend.services.AnswerService
import ru.codebattles.backend.services.CompetitionService
import ru.codebattles.backend.web.entity.EditUsersRequest
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

    @CompetitionAccessRequired
    @GetMapping("{compId}")
    fun getById(@PathVariable compId: Long): CompetitionDto {
        return competitionService.getById(compId)
    }

    @CompetitionAccessRequired
    @PostMapping("{compId}/send")
    fun send(
        @PathVariable compId: Long,
        @AuthenticationPrincipal user: User,
        @RequestBody data: SendAnswerRequest
    ): String {
        answerService.createAnswer(user, data)
        return "aboba"
    }

    @CompetitionAccessRequired
    @GetMapping("{compId}/sends")
    fun getAnswers(
        @PathVariable compId: Long,
        @AuthenticationPrincipal user: User,
    ): List<AnswerDto> {
        return answerService.getAllAnswersByCompetitionsAndUserId(compId, user.id!!);
    }

    @CompetitionAccessRequired
    @GetMapping("{compId}/problems")
    fun getProblemsByCompetition(@PathVariable compId: Long): List<CompetitionsProblemsDto> {
        return competitionService.getProblemsById(compId)

    }

    @CompetitionAccessRequired
    @GetMapping("{compId}/leaderboard")
    fun leaderboard(@PathVariable compId: Long): Leaderboard {
        return competitionService.getLeaderboardById(compId)
    }


    @PutMapping("{compId}/users")
    @ResponseStatus(HttpStatus.ACCEPTED)
    fun editUsers(@PathVariable compId: Long, @RequestBody data: EditUsersRequest) {
        competitionService.patchUsers(compId, data.usersIds)
    }

    @PutMapping("{compId}/checkers")
    @ResponseStatus(HttpStatus.ACCEPTED)
    fun editCheckers(@PathVariable compId: Long, @RequestBody data: EditUsersRequest) {
        competitionService.patchCheckers(compId, data.usersIds)
    }

    @GetMapping("{compId}/users")
    fun getUsers(@PathVariable compId: Long): List<UserDto> {
        return competitionService.getUsers(compId)
    }

    @CompetitionAccessRequired
    @GetMapping("{compId}/problems/{id}")
    fun getProblemsByIdByCompetition(@PathVariable compId: Long, @PathVariable id: Long): CompetitionsProblemsDto {
        return competitionService.getProblemById(compId, id)
    }

    @CompetitionAccessRequired
    @GetMapping("/me")
    fun getAllAvaliableForUser(@AuthenticationPrincipal user: User): List<CompetitionDto> {
        return competitionService.getAllByUser(user)
    }

    @GetMapping
    fun getAll(): List<CompetitionDto> {
        return competitionService.getAll()
    }
}
