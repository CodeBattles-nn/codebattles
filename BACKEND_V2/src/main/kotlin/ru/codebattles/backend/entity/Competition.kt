package ru.codebattles.backend.entity

import jakarta.persistence.*
import lombok.Builder
import java.util.*

@Entity
@Table(name = "competitions")
@Builder
data class Competition(
    @ManyToMany
    val members: MutableSet<User> = mutableSetOf(),

    @ManyToMany
    val checkers: MutableSet<Checker> = mutableSetOf(),

    @ManyToOne
    val organizer: User,

    @Column(nullable = false)
    val name: String,

    @Column(nullable = false, length = 1000)
    val description: String,

    @Column(name = "started_at")
    val startedAt: Date? = null,

    @Column(name = "ended_at")
    val endedAt: Date? = null,

    ) : BaseEntity()
