package ru.codebattles.backend.entity

import jakarta.persistence.Entity

@Entity
data class Checker(
    val displayName: String,
    val languageHighlightName: String,
    val address: String,
) : BaseEntity()
