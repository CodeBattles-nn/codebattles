package ru.codebattles.backend.web.controllers

import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.security.SecurityRequirement
import io.swagger.v3.oas.annotations.tags.Tag
import jakarta.annotation.security.RolesAllowed
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.web.bind.annotation.*
import ru.codebattles.backend.annotations.CompetitionAccessRequired
import ru.codebattles.backend.annotations.CompetitionId
import ru.codebattles.backend.annotations.CompetitionReadOnlyCheck
import ru.codebattles.backend.dto.*
import ru.codebattles.backend.dto.mapper.CompetitionsMapper
import ru.codebattles.backend.entity.Leaderboard
import ru.codebattles.backend.entity.User
import ru.codebattles.backend.repository.CompetitionRepository
import ru.codebattles.backend.services.AnswerService
import ru.codebattles.backend.services.CompetitionService
import ru.codebattles.backend.web.entity.CompetitionEditDto
import ru.codebattles.backend.web.entity.EditUsersRequest
import ru.codebattles.backend.web.entity.SendAnswerRequest

@Tag(name = "Competitions", description = "Endpoints for managing competitions")
@RestController
@RequestMapping("/api/competitions")
@SecurityRequirement(name = "JWT")
class CompetitionsController(
    private val competitionMapper: CompetitionsMapper
) {
    @Autowired
    private lateinit var competitionRepository: CompetitionRepository

    @Autowired
    private lateinit var competitionService: CompetitionService

    @Autowired
    private lateinit var answerService: AnswerService

    @Operation(
        summary = "[ADMIN] Create a new competition",
        description = "Creates a new competition object. Required admin role."
    )
    @RolesAllowed("ADMIN")
    @PostMapping
    fun create(@RequestBody instance: CompetitionEditDto, @AuthenticationPrincipal user: User): CompetitionDto {
        return competitionService.create(instance, user)
    }

    @Operation(
        summary = "Get competition by ID",
        description = "Retrieves competition details by its ID. Requires access to the competition."
    )
    @CompetitionAccessRequired
    @GetMapping("{compId}")
    fun getById(@CompetitionId @PathVariable compId: Long): CompetitionDto {
        return competitionService.getById(compId)
    }

    @Operation(
        summary = "Submit an answer",
        description = "Allows a user to submit an answer for a specific competition problem."
    )
    @CompetitionAccessRequired
    @PostMapping("{compId}/send")
    fun send(
        @CompetitionId @PathVariable compId: Long,
        @AuthenticationPrincipal user: User,
        @RequestBody data: SendAnswerRequest
    ): String {
        answerService.createAnswer(user, data)
        return "aboba"
    }

    @Operation(
        summary = "Get all answers",
        description = "Retrieves all answers submitted by the authenticated user for a specific competition."
    )
    @CompetitionAccessRequired
    @GetMapping("{compId}/sends")
    fun getAnswers(
        @CompetitionId @PathVariable compId: Long,
        @AuthenticationPrincipal user: User,
    ): List<AnswerDto> {
        return answerService.getAllAnswersByCompetitionsAndUserId(compId, user.id!!)
    }

    @Operation(
        summary = "Get competition problems",
        description = "Retrieves all problems associated with a specific competition."
    )
    @CompetitionAccessRequired
    @GetMapping("{compId}/problems")
    fun getProblemsByCompetition(@CompetitionId @PathVariable compId: Long): List<CompetitionsProblemsDto> {
        return competitionService.getProblemsById(compId)
    }

    @Operation(
        summary = "Get competition leaderboard",
        description = "Retrieves the leaderboard for a specific competition."
    )
    @CompetitionAccessRequired
    @GetMapping("{compId}/leaderboard")
    fun leaderboard(@CompetitionId @PathVariable compId: Long): Leaderboard {
        val competition = competitionService.getById(compId)

        if (competition.showRating) {
            return competitionService.getLeaderboardById(compId)
        }

        val emptyLeaderboard = Leaderboard(emptyList(), emptyMap())

        return emptyLeaderboard
    }

    @Operation(
        summary = "[ADMIN] Edit competition users",
        description = "Updates the list of users participating in a specific competition. Required admin role."
    )
    @PutMapping("{compId}/users")
    @RolesAllowed("ADMIN")
    @CompetitionReadOnlyCheck
    @ResponseStatus(HttpStatus.ACCEPTED)
    fun editUsers(@CompetitionId @PathVariable compId: Long, @RequestBody data: EditUsersRequest) {
        competitionService.patchUsers(compId, data.usersIds)
    }

    @RolesAllowed("ADMIN")
    @PutMapping("{compId}")
    @CompetitionReadOnlyCheck
    fun update(@CompetitionId @PathVariable compId: Long, @RequestBody profileData: CompetitionEditDto): CompetitionDto {
        val competition = competitionRepository.getById(compId)

        competitionMapper.update(profileData, competition)
        competitionRepository.save(competition)

        return competitionMapper.toDto(competition)
    }


    @Operation(
        summary = "[ADMIN] Edit competition checkers",
        description = "Updates the list of checkers for a specific competition. Required admin role."
    )
    @RolesAllowed("ADMIN")
    @PutMapping("{compId}/checkers")
    @CompetitionReadOnlyCheck
    @ResponseStatus(HttpStatus.ACCEPTED)
    fun editCheckers(@CompetitionId @PathVariable compId: Long, @RequestBody data: EditUsersRequest) {
        competitionService.patchCheckers(compId, data.usersIds)
    }

    @Operation(
        summary = "[ADMIN] Get competition users",
        description = "Retrieves the list of users participating in a specific competition. Required admin role."
    )
    @RolesAllowed("ADMIN")
    @GetMapping("{compId}/users")
    fun getUsers(@PathVariable compId: Long): List<UserDto> {
        return competitionService.getUsers(compId)
    }

    @Operation(
        summary = "Get competition problem by ID",
        description = "Retrieves a specific problem by its ID within a competition."
    )
    @CompetitionAccessRequired
    @GetMapping("{compId}/problems/{id}")
    fun getProblemsByIdByCompetition(
        @CompetitionId @PathVariable compId: Long,
        @PathVariable id: Long
    ): CompetitionsProblemsDto {
        return competitionService.getProblemById(compId, id)
    }

    @Operation(
        summary = "Join to public competition problem by ID",
        description = "Every user can join to public competition."
    )
    @PostMapping("{compId}/publicJoin")
    fun joinToPublicCompetition(
        @CompetitionId @PathVariable compId: Long,
        @AuthenticationPrincipal user: User
    ) {
        return competitionService.joinToPublicCompetition(compId,user.id!!)
    }

    @Operation(
        summary = "Get competitions available for user",
        description = "Retrieves all competitions accessible to the authenticated user."
    )
    @GetMapping("/me")
    fun getAllAvaliableForUser(@AuthenticationPrincipal user: User): List<CompetitionDto> {
        return competitionService.getAllByUser(user)
    }

    @Operation(
        summary = "[ADMIN] Get all competitions",
        description = "Retrieves a list of all competitions. Required admin role."
    )
    @RolesAllowed("ADMIN")
    @GetMapping
    fun getAll(): List<CompetitionDto> {
        return competitionService.getAll()
    }

    @Operation(
        summary = "Get all public competitions",
        description = "Retrieves a list of public competitions."
    )
    @GetMapping("/public")
    fun getPublic(): List<CompetitionDto> {
        return competitionMapper.toDtoS(
            competitionService.getAllByPublic(true)
        )
    }
}
