package ru.codebattles.backend.entity


import jakarta.persistence.*
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

    @ManyToMany(fetch = FetchType.EAGER)
    var roles: MutableSet<Role> = mutableSetOf(),

) : UserDetails, BaseEntity() {
    override fun getAuthorities(): MutableCollection<out GrantedAuthority> {
        return roles.map { SimpleGrantedAuthority(it.name) }.toMutableList()
    }

    override fun getPassword() = mpassword
    override fun getUsername() = musername


    fun isAdmin(): Boolean {
        return authorities.contains(SimpleGrantedAuthority("ROLE_ADMIN"))
    }


}