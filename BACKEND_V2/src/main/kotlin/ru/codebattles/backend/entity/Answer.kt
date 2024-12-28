package ru.codebattles.backend.entity

import jakarta.persistence.*

enum class AnswerStatus {
    IN_PROGRESS,
    COMPLETED,
}

@Entity
data class Answer(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,

    @ManyToOne
    val competition: Competition,
    @ManyToOne
    val user: User,
    @Enumerated(EnumType.STRING)
    val status: AnswerStatus = AnswerStatus.IN_PROGRESS,
    val score: Int = 0,

    val code: String,

    @ManyToOne
    val checker: Checker

)

