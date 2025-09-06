package ru.codebattles.backend.repository

import org.springframework.data.jpa.repository.JpaRepository
import ru.codebattles.backend.entity.Posts

interface PostRepository : JpaRepository<Posts, Long> {
    fun findByShowAtMainTrue(): List<Posts>
}
