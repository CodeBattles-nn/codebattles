package ru.codebattles.backend.entity

import jakarta.persistence.Entity

@Entity
data class Problem(
    val name: String,
    val description: String,
    val inData: String,
    val outData: String,
    val tests: String,
    val examples: String,
    val public: Boolean? = false
) : BaseEntity()