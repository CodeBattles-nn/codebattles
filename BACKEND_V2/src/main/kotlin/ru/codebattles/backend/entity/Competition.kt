package ru.codebattles.backend.entity

import jakarta.persistence.*
import org.hibernate.annotations.ColumnDefault
import java.time.LocalDateTime

@Entity
@Table(name = "competitions")
data class Competition(
    @ManyToMany
    var members: MutableSet<User>? = mutableSetOf(),

    @ManyToMany
    var checkers: MutableSet<Checker>? = mutableSetOf(),

    @ManyToOne
    var organizer: User?,

    @Column(nullable = false)
    var name: String,

    @Column(nullable = false, length = 1000)
    var description: String,

    @Column(name = "started_at")
    var startedAt: LocalDateTime? = null,

    @Column(name = "ended_at")
    var endedAt: LocalDateTime? = null,

    @Column(name = "show_rating", nullable = false)
    var showRating: Boolean = true,

    @Column(name = "show_output", nullable = false)
    var showOutput: Boolean = true,

    @Column(name = "show_input", nullable = false)
    var showInput: Boolean = true,

    @Column(name = "public", nullable = false)
    @ColumnDefault("false")
    var public: Boolean = false,

    @Column(name = "read_only", nullable = false)
    @ColumnDefault("false")
    var readOnly: Boolean = false,

    ) : BaseEntity()
