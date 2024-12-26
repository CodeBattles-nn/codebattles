package ru.codebattles.backend

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class BackendV2Application

fun main(args: Array<String>) {
	runApplication<BackendV2Application>(*args)
}
