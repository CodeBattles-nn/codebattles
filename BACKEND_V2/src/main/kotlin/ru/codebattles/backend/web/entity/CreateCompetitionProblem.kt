package ru.codebattles.backend.web.entity

class CreateCompetitionProblem(
    val priority: Long,
    val slug: String,
    val competition_id: Long,
    val problem_id: Long,
)
