package ru.codebattles.backend.services

import org.springframework.stereotype.Service
import ru.codebattles.backend.dto.AnswerDto
import ru.codebattles.backend.dto.mapper.AnswerMapper
import ru.codebattles.backend.entity.Answer
import ru.codebattles.backend.entity.User
import ru.codebattles.backend.repository.AnswerRepository
import ru.codebattles.backend.repository.CheckerRepository
import ru.codebattles.backend.repository.CompetitionProblemsRepository
import ru.codebattles.backend.repository.CompetitionRepository
import ru.codebattles.backend.web.entity.SendAnswerRequest

@Service
class AnswerService(
    val answerRepository: AnswerRepository,
    val checkerRepository: CheckerRepository,
    val competitionRepository: CompetitionRepository,
    val competitionProblemsRepository: CompetitionProblemsRepository,
    val answerMapper: AnswerMapper,
) {
    fun createAnswer(user: User, data: SendAnswerRequest) {
        val checker = checkerRepository.findById(data.checker).orElseThrow()
        val competitionProblem = competitionProblemsRepository.findById(data.id).orElseThrow()
        answerRepository.save(
            Answer(
                competition = competitionProblem.competition,
                checker = checker,
                user = user,
                code = data.src,
            )
        )
    }

    fun getAllAnswersByCompetitionsAndUser(competition: Long, user: User): List<AnswerDto> {
        return answerMapper.toDtoS(
            answerRepository.getAllByUserAndCompetitionId(user, competition)
        )
    }

    fun getById(id: Long): AnswerDto {
        return answerMapper.toDto(
            answerRepository.findById(id).orElseThrow()
        )
    }
}
