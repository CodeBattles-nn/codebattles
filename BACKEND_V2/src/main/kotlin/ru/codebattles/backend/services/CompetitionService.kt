package ru.codebattles.backend.services

import org.springframework.http.HttpStatus
import org.springframework.stereotype.Service
import org.springframework.web.server.ResponseStatusException
import ru.codebattles.backend.dto.CompetitionCreateDto
import ru.codebattles.backend.dto.CompetitionDto
import ru.codebattles.backend.dto.CompetitionsProblemsDto
import ru.codebattles.backend.dto.UserDto
import ru.codebattles.backend.dto.mapper.CompetitionsMapper
import ru.codebattles.backend.dto.mapper.CompetitionsProblemsMapper
import ru.codebattles.backend.dto.mapper.UserMapper
import ru.codebattles.backend.entity.Competition
import ru.codebattles.backend.entity.LeaderBoardAllTasksQuery
import ru.codebattles.backend.entity.Leaderboard
import ru.codebattles.backend.entity.User
import ru.codebattles.backend.repository.CompetitionProblemsRepository
import ru.codebattles.backend.repository.CompetitionRepository
import ru.codebattles.backend.repository.TestRepo
import ru.codebattles.backend.repository.UserRepository
import java.util.stream.Collectors

@Service
class CompetitionService(
    private val competitionRepository: CompetitionRepository,
    private val userRepository: UserRepository,
    private val userMapper: UserMapper,
    private val competitionProblemsRepository: CompetitionProblemsRepository,
    private val competitionsProblemsMapper: CompetitionsProblemsMapper,
    private val competitionsMapper: CompetitionsMapper,
    private val testRepo: TestRepo,
) {

    fun getAll(): List<CompetitionDto> {
        return competitionsMapper.toDtoS(
            competitionRepository.findAll()
        )
    }

    fun getById(id: Long): CompetitionDto {
        val optionalCompetition = competitionRepository.findById(id)
        if (optionalCompetition.isPresent) {
            return competitionsMapper.toDto(optionalCompetition.get())
        }


        throw ResponseStatusException(HttpStatus.NOT_FOUND)
    }

    fun getByIdNotDto(id: Long): Competition {
        val optionalCompetition = competitionRepository.findById(id)
        if (optionalCompetition.isPresent) {
            return optionalCompetition.get()
        }


        throw ResponseStatusException(HttpStatus.NOT_FOUND)
    }

    fun getProblemsById(id: Long): List<CompetitionsProblemsDto> {
        return competitionsProblemsMapper.toDtoS(
            competitionProblemsRepository.getAllByCompetitionId(id)
        )

    }

    fun getLeaderboardById(id: Long): Leaderboard {
        val leaderboard = testRepo.getLeaderboard()
        val leaderboardScores = testRepo.getLeaderboardStats()

        val answersByScore: Map<Long, List<LeaderBoardAllTasksQuery>> = leaderboard.stream()
            .collect(Collectors.groupingBy(LeaderBoardAllTasksQuery::userId))

        return Leaderboard(
            data = answersByScore,
            score = leaderboardScores
        )
    }

    fun getProblemById(id: Long, problemId: Long): CompetitionsProblemsDto {
        return competitionsProblemsMapper.toDto(
            competitionProblemsRepository.getFirstByCompetitionIdAndId(id, problemId)
        )
    }

    fun patchUsers(compId: Long, usersIds: Set<Long>) {
        val competition = competitionRepository.findById(compId).orElseThrow()
        competition.members = userRepository.findByIdIn(usersIds)
        competitionRepository.save(competition)
    }

    fun joinUser(compId: Long, userId: Long) {
        val competition = competitionRepository.findById(compId).orElseThrow()
        val user = userRepository.getById(userId)
        competition.members?.add(user)
        competitionRepository.save(competition)
    }

    fun getUsers(compId: Long): List<UserDto> {
        val competition = competitionRepository.findById(compId).orElseThrow()

        return userMapper.toDtoS(competition.members!!)
    }


    fun getAllByUser(user: User): List<CompetitionDto> {
        return competitionsMapper.toDtoS(
            competitionRepository.getByMembersContaining(user)
        )
    }

    fun create(competitionDto: CompetitionCreateDto, user: User): CompetitionDto {
        val competition = Competition(
            organizer = user,
            name = competitionDto.name,
            description = competitionDto.description,
        )

        competitionRepository.save(
            competition
        )

        return competitionsMapper.toDto(
            competition
        )
    }
}
