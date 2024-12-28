package ru.codebattles.backend.services

import org.springframework.http.HttpStatus
import org.springframework.stereotype.Service
import org.springframework.web.server.ResponseStatusException
import ru.codebattles.backend.dto.CompetitionCreateDto
import ru.codebattles.backend.dto.CompetitionDto
import ru.codebattles.backend.dto.CompetitionsProblemsDto
import ru.codebattles.backend.dto.mapper.CompetitionsCreateMapper
import ru.codebattles.backend.dto.mapper.CompetitionsMapper
import ru.codebattles.backend.dto.mapper.CompetitionsProblemsMapper
import ru.codebattles.backend.dto.mapper.ProblemsMapper
import ru.codebattles.backend.entity.Answer
import ru.codebattles.backend.entity.CompetitionsProblems
import ru.codebattles.backend.entity.User
import ru.codebattles.backend.repository.AnswerRepository
import ru.codebattles.backend.repository.CheckerRepository
import ru.codebattles.backend.repository.CompetitionProblemsRepository
import ru.codebattles.backend.repository.CompetitionRepository

@Service
class AnswerService(
    val answerRepository: AnswerRepository,
    val checkerRepository: CheckerRepository,
    val competitionRepository: CompetitionRepository
) {
    fun createAnswer(user: User) {
        answerRepository.save(
            Answer(
                competition = competitionRepository.getById(1),
                checker = checkerRepository.getById(1),
                user = user,
                code = "print(\"hello, world\")"
            )
        )
    }
}
