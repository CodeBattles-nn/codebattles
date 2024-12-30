package ru.codebattles.backend.web.entity.checker

@JvmRecord
data class CheckerCallback(
    val results: List<ProgramResult>,
    val meta: Long
)