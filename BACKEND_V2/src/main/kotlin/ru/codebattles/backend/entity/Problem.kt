package ru.codebattles.backend.entity

import jakarta.persistence.*


@Entity
data class Problem(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    val name: String,

    @Column(name = "description", columnDefinition = "TEXT")
    val description: String,

    @Column(name = "in_data", columnDefinition = "TEXT")
    val inData: String,

    @Column(name = "out_data", columnDefinition = "TEXT")
    val outData: String,

    @Column(name = "tests", columnDefinition = "TEXT")
    val tests: String,

    @Column(name = "examples", columnDefinition = "TEXT")
    val examples: String
)