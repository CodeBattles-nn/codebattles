package ru.codebattles.backend.web.controllers

import com.fasterxml.jackson.databind.JsonNode
import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.security.SecurityRequirement
import io.swagger.v3.oas.annotations.tags.Tag
import org.springdoc.core.annotations.ParameterObject
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.web.PagedModel
import org.springframework.web.bind.annotation.*
import ru.codebattles.backend.dto.CompetitionsProblemsDto
import ru.codebattles.backend.dto.mapper.CompetitionsProblemsMapper
import ru.codebattles.backend.entity.CompetitionsProblems
import ru.codebattles.backend.services.CompetitionsProblemsService
import ru.codebattles.backend.web.entity.CreateCompetitionProblem
import java.io.IOException

@Tag(name = "Competition Problems", description = "Endpoints for managing competition problems")
@RestController
@RequestMapping("/api/competitionsProblems")
@SecurityRequirement(name = "JWT")
class CompetitionsProblemsController(
    private val competitionsProblemsService: CompetitionsProblemsService,
    private val competitionsProblemsMapper: CompetitionsProblemsMapper,
) {
    @Operation(
        summary = "Get all competition problems",
        description = "Retrieves a paginated list of all competition problems."
    )
    @Deprecated("Dont use global getter")
    @GetMapping
    fun getAll(@ParameterObject pageable: Pageable): PagedModel<CompetitionsProblems> {
        val competitionsProblems: Page<CompetitionsProblems> = competitionsProblemsService.getAll(pageable)
        return PagedModel(competitionsProblems)
    }

    @Operation(
        summary = "Get competition problem by ID",
        description = "Retrieves details of a specific competition problem by its ID."
    )
    @GetMapping("/{id}")
    fun getOne(@PathVariable id: Long): CompetitionsProblemsDto {

        return competitionsProblemsMapper.toDto(
            competitionsProblemsService.getOne(id)
        )
    }

    @Operation(
        summary = "Get multiple competition problems",
        description = "Retrieves details of multiple competition problems by their IDs."
    )
    @GetMapping("/by-ids")
    fun getMany(@RequestParam ids: List<Long>): List<CompetitionsProblemsDto> {
        return competitionsProblemsMapper.toDtoS(
            competitionsProblemsService.getMany(ids)
        )
    }

    @Operation(
        summary = "Create a competition problem",
        description = "Creates a new competition problem."
    )
    @PostMapping
    fun create(@RequestBody data: CreateCompetitionProblem): CompetitionsProblemsDto {
        return competitionsProblemsMapper.toDto(
            competitionsProblemsService.create(data)
        )
    }

    @Operation(
        summary = "Update a competition problem",
        description = "Applies partial updates to a specific competition problem."
    )
    @PatchMapping("/{id}")
    @Throws(IOException::class)
    fun patch(@PathVariable id: Long, @RequestBody patchNode: JsonNode): CompetitionsProblemsDto {
        return competitionsProblemsMapper.toDto(
            competitionsProblemsService.patch(id, patchNode)
        )
    }

    @Operation(
        summary = "Update multiple competition problems",
        description = "Applies partial updates to multiple competition problems."
    )
    @PatchMapping
    @Throws(IOException::class)
    fun patchMany(@RequestParam ids: List<Long>, @RequestBody patchNode: JsonNode): List<Long> {
        return competitionsProblemsService.patchMany(ids, patchNode)
    }


    @Operation(
        summary = "Delete a competition problem",
        description = "Deletes a specific competition problem by its ID."
    )
    @DeleteMapping("/{id}")
    fun delete(@PathVariable id: Long): CompetitionsProblemsDto {
        return competitionsProblemsMapper.toDto(
            competitionsProblemsService.delete(id)!!
        )
    }

    @Operation(
        summary = "Delete multiple competition problems",
        description = "Deletes multiple competition problems by their IDs."
    )
    @DeleteMapping
    fun deleteMany(@RequestParam ids: List<Long>) {
        competitionsProblemsService.deleteMany(ids)
    }
}
