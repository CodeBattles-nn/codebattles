package ru.codebattles.backend.entity

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.Table
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.userdetails.UserDetails

@Entity
@Table(name = "users_")
data class User(
    @Column(name = "username")
    var musername: String?,
    @Column(name = "password")
    var mpassword: String?,
) : UserDetails, BaseEntity() {
    override fun getAuthorities(): MutableCollection<out GrantedAuthority> {
        return mutableListOf(
            SimpleGrantedAuthority("ROLE_USER"),
            SimpleGrantedAuthority("ROLE_ADMIN"),
        )
    }

    override fun getPassword() = mpassword
    override fun getUsername() = musername


}