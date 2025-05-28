package ru.codebattles.backend.web.entity

import io.swagger.v3.oas.annotations.media.Schema

@Schema(description = "Details for creating a competition problem")
class CreateCompetitionProblem(
    @Schema(description = "Priority of the problem in the competition", example = "1")
    val priority: Long,

    @Schema(description = "Slug identifier for the problem", example = "problem-slug")
    val slug: String,

    @Schema(description = "ID of the competition", example = "1001")
    val competition_id: Long,

    @Schema(description = "ID of the problem", example = "2002")
    val problem_id: Long,
)