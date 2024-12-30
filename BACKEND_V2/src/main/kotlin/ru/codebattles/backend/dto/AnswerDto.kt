package ru.codebattles.backend.dto

import ru.codebattles.backend.entity.AnswerStatus
import java.util.Date

data class AnswerDto(
    val id: Long? = null,
    val user: UserDto,
    val status: AnswerStatus = AnswerStatus.IN_PROGRESS,
    val score: Int = 0,
    val code: String,
    val result: String,
    val checker: CheckerDto,
    val createdAt: Date
)

