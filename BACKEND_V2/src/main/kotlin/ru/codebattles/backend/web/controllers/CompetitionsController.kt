package ru.codebattles.backend.web.controllers

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import ru.codebattles.backend.dto.CompetitionDto
import ru.codebattles.backend.services.CompetitionService


@RestController
@RequestMapping("/api/competitions")
class CompetitionsController {
    @Autowired
    private lateinit var competitionService: CompetitionService

    @GetMapping("{id}")
    fun getById(@PathVariable id: Long): CompetitionDto {
        return competitionService.getById(id)
    }
}
