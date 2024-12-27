package ru.codebattles.backend.dto


data class ProblemDto(
    val id: Long,
    val name: String,
    val description: String,
    val inData: String,
    val outData: String,
    val examples: String,
    val public: Boolean? = false
)