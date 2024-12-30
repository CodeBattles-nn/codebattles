package ru.codebattles.backend.web.entity

data class SendAnswerRequest(
    val checker: Long,
    val src: String,
    val id: Long,
)
