package ru.codebattles.backend.services


import io.jsonwebtoken.Jwts
import io.jsonwebtoken.SignatureAlgorithm
import io.jsonwebtoken.security.Keys
import org.springframework.stereotype.Service
import java.security.Key
import java.util.*

@Service
class JwtService {

    private val jwtSecret: Key = Keys.secretKeyFor(SignatureAlgorithm.HS256)
    private val jwtExpirationMs = 3600000 // 1 hour

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
