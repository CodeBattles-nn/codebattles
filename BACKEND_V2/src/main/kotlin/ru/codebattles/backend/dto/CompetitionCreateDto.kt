package ru.codebattles.backend.dto

import java.time.LocalDateTime

data class CompetitionCreateDto(
    val name: String,
    val description: String,
    val startedAt: LocalDateTime? = null,
    val endedAt: LocalDateTime? = null
)