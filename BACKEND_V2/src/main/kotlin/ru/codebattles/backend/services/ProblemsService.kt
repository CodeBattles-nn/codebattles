package ru.codebattles.backend.services

import com.fasterxml.jackson.databind.JsonNode
import com.fasterxml.jackson.databind.ObjectMapper
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Service
import org.springframework.web.server.ResponseStatusException
import ru.codebattles.backend.dto.CreateProblemDto
import ru.codebattles.backend.dto.ProblemDto
import ru.codebattles.backend.dto.mapper.ProblemsMapper
import ru.codebattles.backend.entity.Problem
import ru.codebattles.backend.repository.ProblemsRepository
import java.io.IOException

@Service
class ProblemsService(
    val problemsRepository: ProblemsRepository,
    val problemsMapper: ProblemsMapper,
    private val objectMapper: ObjectMapper
) {
    fun getById(id: Long): ProblemDto {
        val optionalProblem = problemsRepository.findById(id)
        if (optionalProblem.isPresent) {
            return problemsMapper.toDto(optionalProblem.get())
        }


        throw ResponseStatusException(HttpStatus.NOT_FOUND)
    }

    fun getByIdNotDto(id: Long): Problem {
        val optionalProblem = problemsRepository.findById(id)
        if (optionalProblem.isPresent) {
            return optionalProblem.get()
        }


        throw ResponseStatusException(HttpStatus.NOT_FOUND)
    }


    fun create(problemDto: CreateProblemDto): ProblemDto {
        val problem = Problem(
            name = problemDto.name,
            description = problemDto.description,
            inData = problemDto.inData,
            outData = problemDto.outData,
            tests = problemDto.tests,
            examples = problemDto.examples,
        )

        println()

        val competition = problemsRepository.save(problem)

        println()

        return problemsMapper.toDto(competition)
    }

    @Throws(IOException::class)
    fun patch(id: Long, patchNode: JsonNode): Problem {
        val problem: Problem = problemsRepository.findById(id).orElseThrow {
            ResponseStatusException(HttpStatus.NOT_FOUND, "Entity with id `$id` not found")
        }
        objectMapper.readerForUpdating(problem).readValue<Problem>(patchNode)
        return problemsRepository.save(problem)
    }

    fun getAll(): Iterable<ProblemDto> {
        return problemsMapper.toDtoS(
            problemsRepository.findAll()
        )
    }
}
