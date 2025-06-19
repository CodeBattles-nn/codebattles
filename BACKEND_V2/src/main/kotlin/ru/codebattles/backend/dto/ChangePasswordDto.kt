package ru.codebattles.backend.dto

data class ChangePasswordDto(
    val currentPassword: String,
    val newPassword: String
) 