package ru.codebattles.backend.services;

import com.fasterxml.jackson.databind.JsonNode
import com.fasterxml.jackson.databind.ObjectMapper
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Service
import org.springframework.web.server.ResponseStatusException
import ru.codebattles.backend.entity.CompetitionsProblems
import ru.codebattles.backend.repository.CompetitionProblemsRepository
import java.io.IOException
import java.util.*

@Service
class CompetitionsProblemsService(
    private val competitionProblemsRepository: CompetitionProblemsRepository,
    private val objectMapper: ObjectMapper,
) {


    fun getAll(pageable: Pageable): Page<CompetitionsProblems> {
        return competitionProblemsRepository.findAll(pageable)
    }

    fun getOne(id: Long): CompetitionsProblems {
        val competitionsProblemsOptional: Optional<CompetitionsProblems> = competitionProblemsRepository.findById(id)
        return competitionsProblemsOptional.orElseThrow {
            ResponseStatusException(HttpStatus.NOT_FOUND, "Entity with id `$id` not found")
        }
    }

    fun getMany(ids: List<Long>): List<CompetitionsProblems> {
        return competitionProblemsRepository.findAllById(ids)
    }

    fun create(competitionsProblems: CompetitionsProblems): CompetitionsProblems {
        return competitionProblemsRepository.save(competitionsProblems)
    }

    @Throws(IOException::class)
    fun patch(id: Long, patchNode: JsonNode): CompetitionsProblems {
        val competitionsProblems: CompetitionsProblems = competitionProblemsRepository.findById(id).orElseThrow {
            ResponseStatusException(HttpStatus.NOT_FOUND, "Entity with id `$id` not found")
        }
        objectMapper.readerForUpdating(competitionsProblems).readValue<CompetitionsProblems>(patchNode)
        return competitionProblemsRepository.save(competitionsProblems)
    }

    @Throws(IOException::class)
    fun patchMany(ids: List<Long>, patchNode: JsonNode): List<Long> {
        val competitionsProblems: Collection<CompetitionsProblems> = competitionProblemsRepository.findAllById(ids)
        for (competitionsProblem in competitionsProblems) {
            objectMapper.readerForUpdating(competitionsProblem).readValue<CompetitionsProblems>(patchNode)
        }
        val resultCompetitionsProblems: List<CompetitionsProblems> =
            competitionProblemsRepository.saveAll(competitionsProblems)
        return resultCompetitionsProblems.mapNotNull(CompetitionsProblems::id)
    }

    fun delete(id: Long): CompetitionsProblems? {
        val competitionsProblems: CompetitionsProblems? = competitionProblemsRepository.findById(id).orElse(null)
        if (competitionsProblems != null) {
            competitionProblemsRepository.delete(competitionsProblems)
        }
        return competitionsProblems
    }

    fun deleteMany(ids: List<Long>) {
        competitionProblemsRepository.deleteAllById(ids)
    }

}