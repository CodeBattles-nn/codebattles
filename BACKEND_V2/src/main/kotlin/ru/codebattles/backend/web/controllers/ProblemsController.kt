package ru.codebattles.backend.web.controllers

import com.fasterxml.jackson.databind.JsonNode
import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.tags.Tag
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

@Tag(name = "Problems", description = "Endpoints for managing problems")
@RestController
@RequestMapping("/api/problems")
@SecurityRequirement(name = "JWT")
class ProblemsController {

    @Autowired
    private lateinit var problemsRepository: ProblemsRepository

    @Autowired
    private lateinit var problemsService: ProblemsService

    @Operation(
        summary = "Create a new problem",
        description = "Creates a new problem using the provided data."
    )
    @PostMapping
    fun create(@RequestBody instance: CreateProblemDto, @AuthenticationPrincipal user: User): ProblemDto {
        return problemsService.create(instance)
    }

    @Operation(
        summary = "Get problem by ID",
        description = "Retrieves a problem by its ID."
    )
    @GetMapping("{id}")
    fun getById(@PathVariable id: Long): ProblemDto {
        return problemsService.getById(id)
    }

    @Operation(
        summary = "Get problem by ID (Admin)",
        description = "Retrieves a problem by its ID with admin-level access."
    )
    @GetMapping("{id}/admin")
    fun getByIdAdmin(@PathVariable id: Long): Problem {
        val problemOptional = problemsRepository.findById(id)
        return problemOptional.get()
    }

    @Operation(
        summary = "Get all problems",
        description = "Retrieves a list of all problems."
    )
    @GetMapping
    fun getAll(): Iterable<ProblemDto> {
        return problemsService.getAll()
    }

    @Operation(
        summary = "Update a problem",
        description = "Applies partial updates to a problem by its ID."
    )
    @PatchMapping("/{id}")
    @Throws(IOException::class)
    fun patch(@PathVariable id: Long, @RequestBody patchNode: JsonNode): Problem {
        return problemsService.patch(id, patchNode)
    }
}