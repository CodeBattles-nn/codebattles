package ru.codebattles.backend.repository

import org.springframework.data.jpa.repository.JpaRepository
import ru.codebattles.backend.entity.Competition

interface CompetitionRepository : JpaRepository<Competition, Long>