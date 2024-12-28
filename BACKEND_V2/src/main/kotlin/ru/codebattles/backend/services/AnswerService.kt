package ru.codebattles.backend.services

import org.springframework.stereotype.Service
import ru.codebattles.backend.entity.Answer
import ru.codebattles.backend.entity.User
import ru.codebattles.backend.repository.AnswerRepository
import ru.codebattles.backend.repository.CheckerRepository
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
