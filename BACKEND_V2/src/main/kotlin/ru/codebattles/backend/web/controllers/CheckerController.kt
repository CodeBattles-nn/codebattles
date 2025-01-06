package ru.codebattles.backend.web.controllers

import io.swagger.v3.oas.annotations.security.SecurityRequirement
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import ru.codebattles.backend.dto.CheckerDto
import ru.codebattles.backend.dto.mapper.CheckerMapper
import ru.codebattles.backend.repository.CheckerRepository

@RestController
@RequestMapping("/api/checkers")
@SecurityRequirement(name = "JWT")
class CheckerController(
    val checkerRepository: CheckerRepository,
    val checkerMapper: CheckerMapper,
) {
    @GetMapping
    fun getAll(): List<CheckerDto> {
        return checkerMapper.toDtoS(
            checkerRepository.findAll()
        )
    }
}
