package ru.codebattles.backend.services


import io.jsonwebtoken.Jwts
import io.jsonwebtoken.security.Keys
import org.springframework.stereotype.Service
import ru.codebattles.backend.core.properties.JwtTokenProperties
import java.security.Key
import java.util.*
import javax.crypto.SecretKey

@Service
class JwtService(
    private val properties: JwtTokenProperties
) {

    private val jwtSecret: Key = getSecretKey()
    private val jwtExpirationMs = 3600000 // 1 hour


    private final fun getSecretKey(): SecretKey {
        val secretKey = properties.secretKey
        val decodedKey = Base64.getDecoder().decode(secretKey)
        return Keys.hmacShaKeyFor(decodedKey)
    }

    fun generateToken(username: String): String {
        return Jwts.builder()
            .setSubject(username)
            .setIssuedAt(Date())
            .setExpiration(Date(System.currentTimeMillis() + jwtExpirationMs))
            .signWith(jwtSecret)
            .compact()
    }

    fun validateToken(token: String): Boolean {
        try {
            val claims = Jwts.parserBuilder()
                .setSigningKey(jwtSecret)
                .build()
                .parseClaimsJws(token)
            return !claims.body.expiration.before(Date())
        } catch (e: Exception) {
            return false
        }
    }

    fun getUsernameFromToken(token: String): String {
        val claims = Jwts.parserBuilder()
            .setSigningKey(jwtSecret)
            .build()
            .parseClaimsJws(token)
        return claims.body.subject
    }
}
