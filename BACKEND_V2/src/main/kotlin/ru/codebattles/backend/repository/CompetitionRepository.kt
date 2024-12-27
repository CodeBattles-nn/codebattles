package ru.codebattles.backend.repository

import org.springframework.data.jpa.repository.JpaRepository
import ru.codebattles.backend.entity.Competition
import ru.codebattles.backend.entity.User

interface CompetitionRepository : JpaRepository<Competition, Long> {
    fun getByMembersContaining(user: User): List<Competition>
}