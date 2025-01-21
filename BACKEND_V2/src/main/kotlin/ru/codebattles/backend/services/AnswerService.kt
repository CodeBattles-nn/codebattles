package ru.codebattles.backend.services

import com.fasterxml.jackson.core.type.TypeReference
import com.fasterxml.jackson.databind.ObjectMapper
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
import ru.codebattles.backend.web.entity.checker.CheckerTaskRequest
import ru.codebattles.backend.web.entity.checker.Test

@Service
class AnswerService(
    val answerRepository: AnswerRepository,
    val checkerRepository: CheckerRepository,
    val competitionRepository: CompetitionRepository,
    val competitionProblemsRepository: CompetitionProblemsRepository,
    val checkerApiService: CheckerApiService,
    val answerMapper: AnswerMapper,
    val objectMapper: ObjectMapper
) {
    fun createAnswer(user: User, data: SendAnswerRequest) {
        val checker = checkerRepository.findById(data.checker).orElseThrow()
        val competitionProblem = competitionProblemsRepository.findById(data.id).orElseThrow()
        val savedAnswer = answerRepository.save(
            Answer(
                competition = competitionProblem.competition,
                checker = checker,
                user = user,
                code = data.src,
                competitionsProblems = competitionProblem
            )
        )

        val request = CheckerTaskRequest(
            source = data.src,
            compiler = "python",
            tests = objectMapper.readValue(competitionProblem.problem.tests,
                object : TypeReference<List<Test>>() {}
            ),
            savedAnswer.id.toString()
        )

        checkerApiService.sendCheckerTask(request, checker.address)
    }

    fun getAllAnswersByCompetitionsAndUser(competition: Long, user: User): List<AnswerDto> {
        return answerMapper.toDtoS(
            answerRepository.getAllByUserAndCompetitionId(user, competition)
        )
    }

    fun getAllAnswersByCompetitionsAndUserId(competition: Long, userId: Long): List<AnswerDto> {
        return answerMapper.toDtoS(
            answerRepository.getAllByUserIdAndCompetitionId(userId, competition)
        )
    }

    fun getLastByUserIdAndCompetitionsAnswerId(userId: Long, competitionProblemId: Long): AnswerDto {
        return answerMapper.toDto(
            answerRepository.getFirstByUserIdAndCompetitionsProblemsIdOrderByCreatedAtDesc(userId, competitionProblemId)
        )
    }

    fun getById(id: Long): AnswerDto {
        return answerMapper.toDto(
            answerRepository.findById(id).orElseThrow()
        )
    }
}
