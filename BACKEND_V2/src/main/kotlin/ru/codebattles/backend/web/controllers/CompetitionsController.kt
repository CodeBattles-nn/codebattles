package ru.codebattles.backend.web.controllers

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.web.bind.annotation.*
import ru.codebattles.backend.dto.CompetitionCreateDto
import ru.codebattles.backend.dto.CompetitionDto
import ru.codebattles.backend.dto.CompetitionsProblemsDto
import ru.codebattles.backend.dto.ProblemDto
import ru.codebattles.backend.entity.CompetitionsProblems
import ru.codebattles.backend.entity.User
import ru.codebattles.backend.services.AnswerService
import ru.codebattles.backend.services.CompetitionService


@RestController
@RequestMapping("/api/competitions")
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
    fun send(@PathVariable id: Long, @AuthenticationPrincipal user: User): String {
        answerService.createAnswer(user)

        return "aboba"
    }

    @GetMapping("{id}/problems")
    fun getProblemsByCompetition(@PathVariable id: Long): Iterable<CompetitionsProblems> {
        return competitionService.getProblemsById(id)
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
