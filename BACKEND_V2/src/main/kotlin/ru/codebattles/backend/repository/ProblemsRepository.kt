package ru.codebattles.backend.repository

import org.springframework.data.jpa.repository.JpaRepository
import ru.codebattles.backend.entity.Problem

interface ProblemsRepository : JpaRepository<Problem, Long> {}