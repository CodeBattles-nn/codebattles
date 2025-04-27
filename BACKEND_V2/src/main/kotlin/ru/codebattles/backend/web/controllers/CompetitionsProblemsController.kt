package ru.codebattles.backend.web.controllers

import com.fasterxml.jackson.databind.JsonNode
import org.springdoc.core.annotations.ParameterObject
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.web.PagedModel
import org.springframework.web.bind.annotation.*
import ru.codebattles.backend.dto.CompetitionsProblemsDto
import ru.codebattles.backend.dto.mapper.CompetitionsProblemsMapper
import ru.codebattles.backend.entity.CompetitionsProblems
import ru.codebattles.backend.services.CompetitionsProblemsService
import java.io.IOException

@RestController
@RequestMapping("/api/competitionsProblems")
class CompetitionsProblemsController(
    private val competitionsProblemsService: CompetitionsProblemsService,
    private val competitionsProblemsMapper: CompetitionsProblemsMapper,
) {
    @Deprecated("Dont use global getter")
    @GetMapping
    fun getAll(@ParameterObject pageable: Pageable): PagedModel<CompetitionsProblems> {
        val competitionsProblems: Page<CompetitionsProblems> = competitionsProblemsService.getAll(pageable)
        return PagedModel(competitionsProblems)
    }

    @GetMapping("/{id}")
    fun getOne(@PathVariable id: Long): CompetitionsProblemsDto {

        return competitionsProblemsMapper.toDto(
            competitionsProblemsService.getOne(id)
        )
    }

    @GetMapping("/by-ids")
    fun getMany(@RequestParam ids: List<Long>): List<CompetitionsProblemsDto> {
        return competitionsProblemsMapper.toDtoS(
            competitionsProblemsService.getMany(ids)
        )
    }

    @PostMapping
    fun create(@RequestBody competitionsProblems: CompetitionsProblems): CompetitionsProblems {
        return competitionsProblemsService.create(competitionsProblems)
    }

    @PatchMapping("/{id}")
    @Throws(IOException::class)
    fun patch(@PathVariable id: Long, @RequestBody patchNode: JsonNode): CompetitionsProblemsDto {
        return competitionsProblemsMapper.toDto(
            competitionsProblemsService.patch(id, patchNode)
        )
    }

    @PatchMapping
    @Throws(IOException::class)
    fun patchMany(@RequestParam ids: List<Long>, @RequestBody patchNode: JsonNode): List<Long> {
        return competitionsProblemsService.patchMany(ids, patchNode)
    }

    @DeleteMapping("/{id}")
    fun delete(@PathVariable id: Long): CompetitionsProblemsDto {
        return competitionsProblemsMapper.toDto(
            competitionsProblemsService.delete(id)!!
        )
    }

    @DeleteMapping
    fun deleteMany(@RequestParam ids: List<Long>) {
        competitionsProblemsService.deleteMany(ids)
    }
}
