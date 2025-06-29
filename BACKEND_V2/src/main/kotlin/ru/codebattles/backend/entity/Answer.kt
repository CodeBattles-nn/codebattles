package ru.codebattles.backend.entity


import jakarta.persistence.*

enum class AnswerStatus {
    IN_PROGRESS,
    COMPLETED,
}

@Entity
data class Answer(
    @ManyToOne
    val competition: Competition,
    @ManyToOne
    val user: User,
    @Enumerated(EnumType.STRING)
    var status: AnswerStatus = AnswerStatus.IN_PROGRESS,
    var score: Int? = null,

    @Column(columnDefinition = "TEXT")
    var code: String,

    @ManyToOne
    val checker: Checker,

    @Column(columnDefinition = "TEXT")
    var result: String? = null,

    @ManyToOne
    val competitionsProblems: CompetitionsProblems? = null

    ) : BaseEntity()

