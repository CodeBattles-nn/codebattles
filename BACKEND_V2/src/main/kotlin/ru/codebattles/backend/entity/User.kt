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

    var name: String? = "",

    @ElementCollection(targetClass = UserRole::class, fetch = FetchType.EAGER)
    @CollectionTable(
        name = "users_roles",
        joinColumns = [JoinColumn(name = "user_id")]
    )
    @Enumerated(EnumType.STRING)
    @Column(name = "role")
    var roles: MutableSet<UserRole> = mutableSetOf(),

    ) : UserDetails, BaseEntity() {
    override fun getAuthorities(): MutableCollection<out GrantedAuthority> {
        return roles.map { SimpleGrantedAuthority(it.name) }.toMutableList()
    }

    override fun getPassword() = mpassword
    override fun getUsername() = musername


    fun isAdmin(): Boolean {
        return authorities.contains(SimpleGrantedAuthority("ROLE_ADMIN")) || authorities.contains(SimpleGrantedAuthority("ADMIN"))
    }

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (other !is User) return false
        return this.id == other.id
    }

    override fun hashCode(): Int {
        return id?.hashCode() ?: 0
    }

}