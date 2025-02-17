package ru.codebattles.backend.repository

import org.springframework.data.jpa.repository.JpaRepository
import ru.codebattles.backend.entity.Role

interface RolesRepository : JpaRepository<Role, Long> {
    fun findByName(name: String): Role?
    fun existsByName(name: String): Boolean
}