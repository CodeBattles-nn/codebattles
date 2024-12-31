package ru.codebattles.backend.dto

import ru.codebattles.backend.entity.AnswerStatus
import java.util.*

data class AnswerDto(
    val id: Long? = null,
    val user: UserDto,
    val status: AnswerStatus = AnswerStatus.IN_PROGRESS,
    val score: Int? = null,
    val code: String,
    val result: String? = null,
    val checker: CheckerDto,
    val createdAt: Date,
    val competitionsProblems: CompetitionsProblemsDto? = null
)

