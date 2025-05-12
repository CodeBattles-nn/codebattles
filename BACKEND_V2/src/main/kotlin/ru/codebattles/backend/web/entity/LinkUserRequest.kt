package ru.codebattles.backend.web.entity

import io.swagger.v3.oas.annotations.media.Schema

@Schema(description = "Request to link a user to a competition")
data class LinkUserRequest(
    @Schema(description = "ID of the user", example = "1")
    val userId: Long,

    @Schema(description = "ID of the competition", example = "1001")
    val competitionId: Long,
)