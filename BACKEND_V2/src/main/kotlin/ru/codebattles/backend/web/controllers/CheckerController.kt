package ru.codebattles.backend.web.controllers

import com.fasterxml.jackson.databind.JsonNode
import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.security.SecurityRequirement
import io.swagger.v3.oas.annotations.tags.Tag
import jakarta.annotation.security.RolesAllowed
import org.springframework.web.bind.annotation.*
import ru.codebattles.backend.dto.CheckerDto
import ru.codebattles.backend.dto.mapper.CheckerMapper
import ru.codebattles.backend.entity.Checker
import ru.codebattles.backend.repository.CheckerRepository
import ru.codebattles.backend.services.CheckerService
import ru.codebattles.backend.web.entity.CheckerCreate
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
        summary = "[ADMIN] Get all checkers",
        description = "Retrieves a list of all checkers. Required admin role."
    )
    @RolesAllowed("ADMIN")
    @GetMapping
    fun getAll(): List<CheckerDto> {
        return checkerMapper.toDtoS(
            checkerRepository.findAll()
        )
    }

    @Operation(
        summary = "[ADMIN] Get checker by ID",
        description = "Retrieves a checker by its ID. Required admin role."
    )
    @RolesAllowed("ADMIN")
    @GetMapping("/{id}")
    fun getById(@PathVariable id: Long): CheckerDto {
        return checkerMapper.toDto(
            checkerRepository.getById(id)
        )
    }

    @Operation(
        summary = "[ADMIN] Get checker by ID (extra fields)",
        description = "Retrieves a checker by its ID with admin-level access. Required admin role."
    )
    @RolesAllowed("ADMIN")
    @GetMapping("/{id}/admin")
    fun getByIdADMIN(@PathVariable id: Long): Checker {
        val checkerOptional = checkerRepository.findById(id)
        return checkerOptional.get()
    }

    @Operation(
        summary = "[ADMIN] Update a checker",
        description = "Applies partial updates to a checker by its ID. Required admin role."
    )
    @RolesAllowed("ADMIN")
    @PatchMapping("/{id}")
    @Throws(IOException::class)
    fun patch(@PathVariable id: Long, @RequestBody patchNode: JsonNode): Checker {
        return checkerService.patch(id, patchNode)
    }

    @Operation(
        summary = "[ADMIN] Create a checker",
        description = "Creates a new checker. Required admin role."
    )
    @RolesAllowed("ADMIN")
    @PostMapping
    fun create(@RequestBody checkerCreateDto: CheckerCreate): Checker {

        val checker = Checker(
            checkerCreateDto.displayName,
            checkerCreateDto.languageHighlightName,
            checkerCreateDto.address,
        )

        return checkerService.create(checker)
    }

    @Operation(
        summary = "[ADMIN] Delete a checker",
        description = "Deletes a specific checker by its ID. Required admin role."
    )
    @RolesAllowed("ADMIN")
    @DeleteMapping("/{id}")
    fun delete(@PathVariable id: Long): Checker? {
        return checkerService.delete(id)
    }


}