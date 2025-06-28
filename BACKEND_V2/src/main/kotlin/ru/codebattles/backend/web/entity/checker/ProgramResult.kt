package ru.codebattles.backend.web.entity.checker

import io.swagger.v3.oas.annotations.media.Schema

@Schema(description = "Result of a program execution")
data class ProgramResult(
    @Schema(description = "Indicates if the execution was successful", example = "true")
    var success: Boolean,

    @Schema(description = "Output of the program", example = "Hello, World!")
    var out: String,

    @Schema(description = "Status message of the execution", example = "OK")
    var msg: ProcessEndStatus,

    @Schema(description = "Execution time in milliseconds", example = "150")
    var time: Int
)