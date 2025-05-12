package ru.codebattles.backend.web.entity

import io.swagger.v3.oas.annotations.media.Schema

@Schema(description = "Details for creating a new checker")
data class CheckerCreate(
    @Schema(description = "Display name of the checker", example = "Python Checker")
    val displayName: String,

    @Schema(description = "Language highlight name for the checker", example = "python")
    val languageHighlightName: String,

    @Schema(description = "Address of the checker service", example = "http://localhost:8080")
    val address: String,
)