package ru.codebattles.backend.entity

import jakarta.persistence.Entity
import lombok.Data

@Entity
data class Problem(
    val name: String,
    val description: String,
    val inData: String,
    val outData: String,
    val tests: String,
    val examples: String,
) : BaseEntity()