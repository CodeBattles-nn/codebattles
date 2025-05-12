package ru.codebattles.backend.dto

import io.swagger.v3.oas.annotations.media.Schema

data class CheckerDto(
    @Schema(description = "Unique identifier of the checker", example = "1")
    val id: Long? = null,

    @Schema(description = "Display name of the checker", example = "Default Python3 Checker")
    val displayName: String,

    @Schema(description = "Programming language used by the checker", example = "python")
    val languageHighlightName: String,
)