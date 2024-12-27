package ru.codebattles.backend.web.controllers

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.web.bind.annotation.*
import ru.codebattles.backend.dto.CompetitionCreateDto
import ru.codebattles.backend.dto.CompetitionDto
import ru.codebattles.backend.dto.ProblemDto
import ru.codebattles.backend.entity.User
import ru.codebattles.backend.services.CompetitionService


@RestController
@RequestMapping("/api/competitions")
class CompetitionsController {
    @Autowired
    private lateinit var competitionService: CompetitionService

    @PostMapping
    fun create(@RequestBody instance: CompetitionCreateDto, @AuthenticationPrincipal user: User): CompetitionDto {
        return competitionService.create(instance, user)
    }

    @GetMapping("{id}")
    fun getById(@PathVariable id: Long): CompetitionDto {
        return competitionService.getById(id)
    }

    @GetMapping("{id}/problems")
    fun getProblemsById(@PathVariable id: Long): List<ProblemDto> {
        return competitionService.getProblemsById(id)
    }

    @GetMapping
    fun getAllAvaliableForUser(@AuthenticationPrincipal user: User): List<CompetitionDto> {
        return competitionService.getAllByUser(user)
    }
}
