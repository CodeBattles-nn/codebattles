package ru.codebattles.backend.dto

import io.swagger.v3.oas.annotations.media.Schema

data class CompetitionsProblemsDto(
    @Schema(description = "Unique identifier of the competition problem", example = "1")
    val id: Long,

    @Schema(description = "Priority of problem for sorting", example = "12")
    val priority: Int,

    @Schema(description = "Unique identifier of the competition problem")
    val problem: ProblemDto,

    @Schema(description = "Unique identifier of the competition problem")
    val slug: String,
)