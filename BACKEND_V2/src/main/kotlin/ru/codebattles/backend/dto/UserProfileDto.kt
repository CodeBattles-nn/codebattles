package ru.codebattles.backend.dto

data class UserProfileDto(
    val id: Long,
    val username: String,
    val name: String,
    val roles: List<String>,
)