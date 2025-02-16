package ru.codebattles.backend.dto


data class CreateProblemDto(
    val name: String,
    val description: String,
    val inData: String,
    val outData: String,
    val tests: String,
    val examples: String,
)