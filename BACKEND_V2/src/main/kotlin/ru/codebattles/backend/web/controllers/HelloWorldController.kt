package ru.codebattles.backend.web.controllers

import com.fasterxml.jackson.databind.ObjectMapper
import io.swagger.v3.oas.annotations.security.SecurityRequirement
import jakarta.annotation.security.RolesAllowed
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.transaction.annotation.Transactional
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RestController
import ru.codebattles.backend.entity.Competition
import ru.codebattles.backend.entity.LeaderBoardAllTasksQuery
import ru.codebattles.backend.entity.User
import ru.codebattles.backend.repository.CompetitionRepository
import ru.codebattles.backend.repository.TestRepo
import ru.codebattles.backend.repository.UserRepository
import java.util.stream.Collectors


@RestController
@SecurityRequirement(name = "JWT")
//@Hidden
class HelloWorldController {

    @Autowired
    private lateinit var userRepository: UserRepository

    @Autowired
    private lateinit var competitionRepository: CompetitionRepository

    @Autowired
    private lateinit var passwordEncoder: PasswordEncoder

    @Autowired
    private lateinit var testRepo: TestRepo

    @Autowired
    private lateinit var objectMapper: ObjectMapper

    @GetMapping
    fun helloWorld(): String {
        return "Hello, world!"
    }

    @RolesAllowed("USER")
    @GetMapping("/mumu")
    fun helloWorlвывфсd(@AuthenticationPrincipal user: User): String {
        return "Hello, world!"
    }

    @Transactional
    @PostMapping("/test")
    fun testCreateComp(

    ): String {

        val user = User(mpassword = passwordEncoder.encode("admin"), musername = "alex")

        val competition = Competition(name = "123", organizer = user, description = "some description")

        userRepository.save(user)
        competitionRepository.save(competition)

        return "ok"
    }

    @PostMapping("/test2")
    fun testLeader(

    ): String {
        val leaderboard = testRepo.getLeaderboard()

        val employeesByDepartment: Map<Long, List<LeaderBoardAllTasksQuery>> = leaderboard.stream()
            .collect(Collectors.groupingBy(LeaderBoardAllTasksQuery::userId))

        return "ok"
    }
}