package ru.codebattles.backend.entity

import jakarta.persistence.*
import java.util.*

@Entity
@Table(name = "competitions")
data class Competition(
    @ManyToMany
    var members: MutableSet<User>? = mutableSetOf(),

    @ManyToMany
    var checkers: MutableSet<Checker>? = mutableSetOf(),

    @ManyToOne
    val organizer: User?,

    @Column(nullable = false)
    val name: String,

    @Column(nullable = false, length = 1000)
    val description: String,

    @Column(name = "started_at")
    val startedAt: Date? = null,

    @Column(name = "ended_at")
    val endedAt: Date? = null,

    @Column(name = "show_rating", nullable = false)
    val showRating: Boolean = true,

    @Column(name = "show_output", nullable = false)
    val showOutput: Boolean = true,

    @Column(name = "show_input", nullable = false)
    val showInput: Boolean = true,

    ) : BaseEntity()
