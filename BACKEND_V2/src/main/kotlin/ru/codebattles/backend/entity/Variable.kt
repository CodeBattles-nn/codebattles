package ru.codebattles.backend.entity


import jakarta.persistence.*

@Entity
@Table(name = "variables")
data class Variable(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    @Column(name = "name", unique = true, nullable = false)
    val key: String,

    @Column(name = "value", nullable = true)
    val value: String?,
)