package ru.codebattles.backend.web.controllers

import com.fasterxml.jackson.databind.JsonNode
import io.swagger.v3.oas.annotations.security.SecurityRequirement
import org.springframework.web.bind.annotation.*
import ru.codebattles.backend.dto.CheckerDto
import ru.codebattles.backend.dto.mapper.CheckerMapper
import ru.codebattles.backend.entity.Checker
import ru.codebattles.backend.repository.CheckerRepository
import ru.codebattles.backend.services.CheckerService
import java.io.IOException

@RestController
@RequestMapping("/api/checkers")
@SecurityRequirement(name = "JWT")
class CheckerController(
    val checkerRepository: CheckerRepository,
    val checkerMapper: CheckerMapper, private val checkerService: CheckerService,
) {
    @GetMapping
    fun getAll(): List<CheckerDto> {
        return checkerMapper.toDtoS(
            checkerRepository.findAll()
        )
    }

    @GetMapping("/{id}")
    fun getById(@PathVariable id: Long): CheckerDto {
        return checkerMapper.toDto(
            checkerRepository.getById(id)
        )
    }

    @GetMapping("/{id}/admin")
    fun getByIdADMIN(@PathVariable id: Long): Checker {

        val checkerOptional = checkerRepository.findById(id)


        return checkerOptional.get()
    }

    @PatchMapping("/{id}")
    @Throws(IOException::class)
    fun patch(@PathVariable id: Long, @RequestBody patchNode: JsonNode): Checker {
        return checkerService.patch(id, patchNode)
    }

}
