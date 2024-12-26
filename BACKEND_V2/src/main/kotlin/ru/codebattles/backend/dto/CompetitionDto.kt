package ru.codebattles.backend.dto

import java.time.LocalDateTime

data class CompetitionDto(
    val id: Long,
    val members: Set<UserDto> = emptySet(),
    val checkers: Set<CheckerDto> = emptySet(),
    val name: String,
    val description: String,
    val startedAt: LocalDateTime? = null,
    val endedAt: LocalDateTime? = null
)