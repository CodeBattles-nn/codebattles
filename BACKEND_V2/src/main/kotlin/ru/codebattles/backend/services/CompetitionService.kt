package ru.codebattles.backend.services

import org.springframework.http.HttpStatus
import org.springframework.stereotype.Service
import org.springframework.web.server.ResponseStatusException
import ru.codebattles.backend.dto.CompetitionDto
import ru.codebattles.backend.dto.mapper.CompetitionsMapper
import ru.codebattles.backend.repository.CompetitionRepository

@Service
class CompetitionService(
    private val competitionRepository: CompetitionRepository,
    private val competitionsMapper: CompetitionsMapper,
) {
    fun getById(id: Long): CompetitionDto {
        val optionalCompetition = competitionRepository.findById(id)
        if (optionalCompetition.isPresent) {
            return competitionsMapper.toDto(optionalCompetition.get())
        }


        throw ResponseStatusException(HttpStatus.NOT_FOUND)
    }
}
