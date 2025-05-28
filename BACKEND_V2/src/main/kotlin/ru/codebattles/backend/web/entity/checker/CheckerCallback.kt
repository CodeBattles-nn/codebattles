package ru.codebattles.backend.web.entity.checker

import io.swagger.v3.oas.annotations.media.Schema

@Schema(description = "Callback response from the checker")
@JvmRecord
data class CheckerCallback(
    @Schema(description = "List of program results")
    val results: List<ProgramResult>,

    @Schema(description = "Metadata associated with the callback", example = "12345")
    val meta: Long
)