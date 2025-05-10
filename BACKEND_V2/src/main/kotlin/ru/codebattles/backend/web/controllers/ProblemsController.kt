package ru.codebattles.backend.web.controllers

import com.fasterxml.jackson.databind.JsonNode
import io.swagger.v3.oas.annotations.security.SecurityRequirement
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.web.bind.annotation.*
import ru.codebattles.backend.dto.CreateProblemDto
import ru.codebattles.backend.dto.ProblemDto
import ru.codebattles.backend.entity.Problem
import ru.codebattles.backend.entity.User
import ru.codebattles.backend.repository.ProblemsRepository
import ru.codebattles.backend.services.ProblemsService
import java.io.IOException


@RestController
@RequestMapping("/api/problems")
@SecurityRequirement(name = "JWT")
class ProblemsController {
    @Autowired
    private lateinit var problemsRepository: ProblemsRepository

    @Autowired
    private lateinit var problemsService: ProblemsService

    @PostMapping
    fun create(@RequestBody instance: CreateProblemDto, @AuthenticationPrincipal user: User): ProblemDto {
        return problemsService.create(instance)
    }

    @GetMapping("{id}")
    fun getById(@PathVariable id: Long): ProblemDto {
        return problemsService.getById(id)
    }

    @GetMapping("{id}/admin")
    fun getByIdAdmin(@PathVariable id: Long): Problem {

        val problemOptional = problemsRepository.findById(id)

        return problemOptional.get()
    }

    @GetMapping
    fun getAll(): Iterable<ProblemDto> {
        return problemsService.getAll()
    }

    @PatchMapping("/{id}")
    @Throws(IOException::class)
    fun patch(@PathVariable id: Long, @RequestBody patchNode: JsonNode): Problem {
        return problemsService.patch(id, patchNode)
    }


}
