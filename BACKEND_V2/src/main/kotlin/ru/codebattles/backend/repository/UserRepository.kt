package ru.codebattles.backend.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import ru.codebattles.backend.entity.User


@Repository
interface UserRepository : JpaRepository<User, Long> {
    fun findByMusername(username: String): User
    fun findByIdIn(ids: Set<Long>): MutableSet<User>
}