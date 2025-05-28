package ru.codebattles.backend

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.context.properties.EnableConfigurationProperties
import org.springframework.boot.runApplication
import ru.codebattles.backend.core.properties.JwtTokenProperties

@SpringBootApplication
@EnableConfigurationProperties(JwtTokenProperties::class)
class BackendV2Application

fun main(args: Array<String>) {
	runApplication<BackendV2Application>(*args)
}
