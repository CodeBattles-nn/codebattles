package ru.codebattles.backend.config

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.security.web.SecurityFilterChain


@Configuration
class SecurityConfig {

    @Bean
    fun securityFilterChain(http: HttpSecurity): SecurityFilterChain {
        http
            .csrf { it.disable() } // Отключить CSRF при необходимости
            .authorizeHttpRequests {
                it
                    .requestMatchers("/test/**").permitAll()
//                    .requestMatchers(
//                        "/api/auth/login",
//                        "/api/auth/register",
//                        "/api/**",
//                        "/swagger-ui/**",
//                        "/v3/api-docs/**",
//                        "/swagger-ui.html",
//                        "/favicon.ico",
//                        "/webjars/**"
//                    ).permitAll()// Разрешить доступ без авторизации
                    .anyRequest().authenticated() // Все остальные запросы требуют авторизации
            }
            .formLogin { it } // Включить стандартный логин через форму
        return http.build()
    }

    @Bean
    fun encoder(): PasswordEncoder {
        return BCryptPasswordEncoder()
    }
}
