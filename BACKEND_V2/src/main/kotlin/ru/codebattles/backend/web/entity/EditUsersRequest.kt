package ru.codebattles.backend.web.entity

import io.swagger.v3.oas.annotations.media.Schema

@Schema(description = "Request to edit users")
data class EditUsersRequest(
    @Schema(description = "Set of user IDs to be edited", example = "1,2,3")
    val usersIds: Set<Long>
)