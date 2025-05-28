package ru.codebattles.backend.repository

import org.springframework.data.jpa.repository.JpaRepository
import ru.codebattles.backend.entity.Checker

interface CheckerRepository : JpaRepository<Checker, Long> {
    fun findByIdIn(id: Set<Long>): MutableSet<Checker>}