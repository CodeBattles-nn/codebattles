package ru.codebattles.backend.web.controllers

import com.fasterxml.jackson.databind.JsonNode
import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.tags.Tag
import io.swagger.v3.oas.annotations.security.SecurityRequirement
import org.springframework.web.bind.annotation.*
import ru.codebattles.backend.dto.CheckerDto
import ru.codebattles.backend.dto.mapper.CheckerMapper
import ru.codebattles.backend.entity.Checker
import ru.codebattles.backend.repository.CheckerRepository
import ru.codebattles.backend.services.CheckerService
import java.io.IOException

@Tag(name = "Checkers", description = "Endpoints for managing checkers")
@RestController
@RequestMapping("/api/checkers")
@SecurityRequirement(name = "JWT")
class CheckerController(
    val checkerRepository: CheckerRepository,
    val checkerMapper: CheckerMapper,
    private val checkerService: CheckerService,
) {
    @Operation(
        summary = "Get all checkers",
        description = "Retrieves a list of all checkers."
    )
    @GetMapping
    fun getAll(): List<CheckerDto> {
        return checkerMapper.toDtoS(
            checkerRepository.findAll()
        )
    }

    @Operation(
        summary = "Get checker by ID",
        description = "Retrieves a checker by its ID."
    )
    @GetMapping("/{id}")
    fun getById(@PathVariable id: Long): CheckerDto {
        return checkerMapper.toDto(
            checkerRepository.getById(id)
        )
    }

    @Operation(
        summary = "Get checker by ID (Admin)",
        description = "Retrieves a checker by its ID with admin-level access."
    )
    @GetMapping("/{id}/admin")
    fun getByIdADMIN(@PathVariable id: Long): Checker {
        val checkerOptional = checkerRepository.findById(id)
        return checkerOptional.get()
    }

    @Operation(
        summary = "Update a checker",
        description = "Applies partial updates to a checker by its ID."
    )
    @PatchMapping("/{id}")
    @Throws(IOException::class)
    fun patch(@PathVariable id: Long, @RequestBody patchNode: JsonNode): Checker {
        return checkerService.patch(id, patchNode)
    }
}