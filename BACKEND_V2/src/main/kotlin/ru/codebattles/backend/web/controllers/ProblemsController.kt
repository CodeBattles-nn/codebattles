package ru.codebattles.backend.web.controllers

import io.swagger.v3.oas.annotations.security.SecurityRequirement
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.web.bind.annotation.*
import ru.codebattles.backend.dto.ProblemDto
import ru.codebattles.backend.entity.User
import ru.codebattles.backend.services.ProblemsService


@RestController
@RequestMapping("/api/problems")
@SecurityRequirement(name = "JWT")
class ProblemsController {
    @Autowired
    private lateinit var problemsService: ProblemsService

    @PostMapping
    fun create(@RequestBody instance: ProblemDto, @AuthenticationPrincipal user: User): ProblemDto {
        return problemsService.create(instance)
    }

    @GetMapping("{id}")
    fun getById(@PathVariable id: Long): ProblemDto {
        return problemsService.getById(id)
    }

    @GetMapping
    fun getAll(): Iterable<ProblemDto> {
        return problemsService.getAll()
    }
}
