package ru.codebattles.backend.dto

data class CompetitionsProblemsDto(
    val id: Long,
    val priority: Int,
    val problem: ProblemDto,
)