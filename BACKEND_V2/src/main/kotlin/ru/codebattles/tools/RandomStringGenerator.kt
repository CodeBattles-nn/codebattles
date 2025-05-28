package ru.codebattles.tools

import java.security.SecureRandom

fun generateSecureRandomString(length: Int): String {
    val chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    val secureRandom = SecureRandom()
    return (1..length)
        .map { chars[secureRandom.nextInt(chars.length)] }
        .joinToString("")
}