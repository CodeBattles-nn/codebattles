package ru.codebattles.backend.web.entity

import io.swagger.v3.oas.annotations.media.Schema

@Schema(description = "Request to send an answer")
data class SendAnswerRequest(
    @Schema(description = "ID of the checker", example = "1")
    val checker: Long,

    @Schema(description = "Source code submitted as the answer", example = "print(input())")
    val src: String,

    @Schema(description = "ID of the answer", example = "1001")
    val id: Long,
)