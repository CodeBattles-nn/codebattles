package ru.codebattles.backend.services

import org.springframework.http.HttpStatus
import org.springframework.stereotype.Service
import org.springframework.web.server.ResponseStatusException
import ru.codebattles.backend.dto.ProblemDto
import ru.codebattles.backend.dto.mapper.ProblemsMapper
import ru.codebattles.backend.repository.ProblemsRepository

@Service
class ProblemsService(
    val problemsRepository: ProblemsRepository,
    val problemsMapper: ProblemsMapper,
) {
    fun getById(id: Long): ProblemDto {
        val optionalProblem = problemsRepository.findById(id)
        if (optionalProblem.isPresent) {
            return problemsMapper.toDto(optionalProblem.get())
        }


        throw ResponseStatusException(HttpStatus.NOT_FOUND)
    }


    fun create(problemDto: ProblemDto): ProblemDto {
        val convertedFromDto = problemsMapper.fromDto(problemDto)
        val competition = problemsRepository.save(convertedFromDto)

        println()

        return problemsMapper.toDto(competition)
    }

    fun getAll(): Iterable<ProblemDto> {
        return problemsMapper.toDtoS(
            problemsRepository.findAll()
        )
    }
}
