package ru.codebattles.backend.dto

import io.swagger.v3.oas.annotations.media.Schema
import ru.codebattles.backend.entity.AnswerStatus
import java.util.*

data class AnswerDto(
    @Schema(description = "Unique identifier of the answer", example = "1")
    val id: Long? = null,

    @Schema(description = "User who submitted the answer")
    val user: UserDto,

    @Schema(
        description = "Current status of the answer",
        example = "IN_PROGRESS",
    )
    val status: AnswerStatus = AnswerStatus.IN_PROGRESS,

    @Schema(description = "Score awarded for the answer", example = "100")
    val score: Int? = null,

    @Schema(description = "Code submitted by the user", example = "print('Hello, World!')")
    val code: String,

    @Schema(description = "Result of the code execution", example = "Success")
    val result: String? = null,

    @Schema(description = "Checker used to evaluate the answer")
    val checker: CheckerDto,

    @Schema(description = "Timestamp when the answer was created", example = "2023-01-01T12:00:00Z")
    val createdAt: Date,

    @Schema(description = "Details of the competition problem associated with the answer")
    val competitionsProblems: CompetitionsProblemsDto? = null
)

