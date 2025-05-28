package ru.codebattles.backend.core.properties

import org.springframework.boot.context.properties.ConfigurationProperties

@ConfigurationProperties("codebattles.jwt")
data class JwtTokenProperties (
    val secretKey: String?,
)