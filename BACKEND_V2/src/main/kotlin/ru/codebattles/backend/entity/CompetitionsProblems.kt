package ru.codebattles.backend.entity

import jakarta.persistence.Entity
import jakarta.persistence.ManyToOne

@Entity
data class CompetitionsProblems(
    val priority: Int,
    @ManyToOne
    val competition: Competition,
    @ManyToOne
    val problem: Problem,
) : BaseEntity()