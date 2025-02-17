package ru.codebattles.backend.repository

import org.springframework.data.jpa.repository.JpaRepository
import ru.codebattles.backend.entity.Variable


interface VariablesRepository : JpaRepository<Variable, Long> {
    fun findByKey(key: String): Variable?
    fun existsByKey(key: String): Boolean
}