package ru.codebattles.backend.web.entity.checker

import io.swagger.v3.oas.annotations.media.Schema

@Schema(description = "Result of a program execution")
@JvmRecord
data class ProgramResult(
    @Schema(description = "Indicates if the execution was successful", example = "true")
    val success: Boolean,

    @Schema(description = "Output of the program", example = "Hello, World!")
    val out: String,

    @Schema(description = "Status message of the execution", example = "OK")
    val msg: ProcessEndStatus,

    @Schema(description = "Execution time in milliseconds", example = "150")
    val time: Int
)