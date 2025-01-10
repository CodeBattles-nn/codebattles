package ru.codebattles.backend.repository

import org.springframework.data.jpa.repository.JpaRepository
import ru.codebattles.backend.entity.Answer
import ru.codebattles.backend.entity.User

interface AnswerRepository : JpaRepository<Answer, Long> {
    fun getAllByUserAndCompetitionId(user: User, compId: Long): List<Answer>
    fun getAllByUserIdAndCompetitionId(userId: Long, compId: Long): List<Answer>

}