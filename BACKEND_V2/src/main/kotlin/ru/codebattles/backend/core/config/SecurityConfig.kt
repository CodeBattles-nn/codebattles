package ru.codebattles.backend.core.config

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.security.web.SecurityFilterChain
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter
import ru.codebattles.backend.core.filter.JwtAuthenticationFilter


@Configuration
class SecurityConfig(
    private val jwtAuthenticationFilter: JwtAuthenticationFilter
) {

    @Bean
    fun authenticationManager(authConfig: AuthenticationConfiguration): AuthenticationManager {
        return authConfig.authenticationManager
    }
//
//    @Bean
//    fun securityFilterChain(http: HttpSecurity): SecurityFilterChain {
//        http
//            .csrf { it.disable() } // Отключить CSRF при необходимости
//            .authorizeHttpRequests {
//                it
//                    .requestMatchers("/test/**").permitAll()
//                    .requestMatchers("/api/auth/login").permitAll()
////                    .requestMatchers(
////                        "/api/auth/login",
////                        "/api/auth/register",
////                        "/api/**",
////                        "/swagger-ui/**",
////                        "/v3/api-docs/**",
////                        "/swagger-ui.html",
////                        "/favicon.ico",
////                        "/webjars/**"
////                    ).permitAll()// Разрешить доступ без авторизации
//                    .anyRequest().authenticated() // Все остальные запросы требуют авторизации
//                    .and()
//                    .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter::class.java)
//            }
//            .formLogin { it } // Включить стандартный логин через форму
//        return http.build()
//    }

    @Bean
    fun securityFilterChain(http: HttpSecurity): SecurityFilterChain {
        http.csrf().disable()
            .authorizeRequests()
            .requestMatchers("/api/auth/**").permitAll()
            .anyRequest().authenticated()
            .and()
            .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter::class.java)
        return http.build()
    }

    @Bean
    fun encoder(): PasswordEncoder {
        return BCryptPasswordEncoder()
    }
}
