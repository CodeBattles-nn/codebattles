package ru.codebattles.backend.web.entity

data class ProblemCreateRequest(
    val name: String,
    val description: String,
    val inData: String,
    val outData: String,
    val tests: String,
    val examples: String,
    val public: Boolean? = false
)