package ru.codebattles.backend.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import ru.codebattles.backend.entity.Competition
import ru.codebattles.backend.entity.User

interface CompetitionRepository : JpaRepository<Competition, Long> {
    fun getByMembersContaining(user: User): List<Competition>
    fun existsByIdAndMembersId(id: Long, memberId: Long): Boolean
    fun getAllByPublic(public: Boolean): List<Competition>
}