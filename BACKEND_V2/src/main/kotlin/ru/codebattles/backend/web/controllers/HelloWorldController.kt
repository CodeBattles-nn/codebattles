package ru.codebattles.backend.web.controllers

import lombok.AllArgsConstructor
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.transaction.annotation.Transactional
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RestController
import ru.codebattles.backend.entity.Competition
import ru.codebattles.backend.entity.User
import ru.codebattles.backend.repository.CompetitionRepository
import ru.codebattles.backend.repository.UserRepository

@RestController
class HelloWorldController {

    @Autowired
    private lateinit var userRepository: UserRepository

    @Autowired
    private lateinit var competitionRepository: CompetitionRepository

    @Autowired
    private lateinit var passwordEncoder: PasswordEncoder

    @GetMapping
    fun helloWorld(): String {
        return "Hello, world!"
    }

    @Transactional
    @PostMapping("/test")
    fun testCreateComp(

    ): String {

//        User.with

        val user = User(mpassword = passwordEncoder.encode("admin"), musername = "alex")

        val competition = Competition(name = "123", organizer = user, description = "some description")

        userRepository.save(user)
        competitionRepository.save(competition)

        return "ok"
    }
}