package ru.codebattles.backend.web.entity

import io.swagger.v3.oas.annotations.media.Schema
import java.time.LocalDateTime

data class CompetitionEditDto(

    @Schema(description = "Name of the competition", example = "Code Battles 2023")
    val name: String,

    @Schema(description = "Description of the competition", example = "A competitive coding event")
    val description: String,

    @Schema(description = "Start time of the competition", example = "2023-01-01T10:00:00")
    val startedAt: LocalDateTime? = null,

    @Schema(description = "End time of the competition", example = "2023-01-01T18:00:00")
    val endedAt: LocalDateTime? = null,

    @Schema(description = "If public everyone can join into competition", example = "true")
    var public: Boolean = false,

    var showInput: Boolean = true,
    var showOutput: Boolean = true,
    var showRating: Boolean = true,

)