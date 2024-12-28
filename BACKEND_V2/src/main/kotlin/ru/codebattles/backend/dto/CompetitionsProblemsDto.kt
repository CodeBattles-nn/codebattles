package ru.codebattles.backend.dto

import jakarta.persistence.Entity
import jakarta.persistence.ManyToOne
import ru.codebattles.backend.entity.BaseEntity
import ru.codebattles.backend.entity.Competition
import ru.codebattles.backend.entity.Problem

data class CompetitionsProblemsDto(
    val id: Long,
    val priority: Int,
    val problem: ProblemDto,
)