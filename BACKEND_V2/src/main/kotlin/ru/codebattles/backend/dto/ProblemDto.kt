package ru.codebattles.backend.dto

import io.swagger.v3.oas.annotations.media.Schema

data class ProblemDto(
    @Schema(description = "Unique identifier of the problem", example = "1")
    val id: Long,

    @Schema(description = "Name of the problem", example = "Sum of Two Numbers")
    val name: String,

    @Schema(description = "Description of the problem", example = "Calculate the sum of two integers.")
    val description: String,

    @Schema(description = "Input data for the problem", example = "1 2")
    val inData: String,

    @Schema(description = "Expected output data for the problem", example = "3")
    val outData: String,

    @Schema(description = "Example cases for the problem", example = "Input: 1 2, Output: 3")
    val examples: String,

    @Schema(description = "Indicates if the problem is public", example = "true")
    val public: Boolean? = false
)