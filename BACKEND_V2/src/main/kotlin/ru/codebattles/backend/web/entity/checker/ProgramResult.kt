package ru.codebattles.backend.web.entity.checker


@JvmRecord
data class ProgramResult(
    val success: Boolean,
    val out: String,
    val msg: ProcessEndStatus,
    val time: Int
)
