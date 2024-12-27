package ru.codebattles.backend.repository

import org.springframework.data.jpa.repository.JpaRepository
import ru.codebattles.backend.entity.CompetitionsProblems

interface CompetitionProblemsRepository : JpaRepository<CompetitionsProblems, Long> {
    fun getAllByCompetitionId(id: Long): Iterable<CompetitionsProblems>
}