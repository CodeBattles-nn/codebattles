package ru.codebattles.backend.services

import org.springframework.http.HttpStatus
import org.springframework.stereotype.Service
import org.springframework.web.server.ResponseStatusException
import ru.codebattles.backend.dto.CompetitionCreateDto
import ru.codebattles.backend.dto.CompetitionDto
import ru.codebattles.backend.dto.CompetitionsProblemsDto
import ru.codebattles.backend.dto.mapper.CompetitionsCreateMapper
import ru.codebattles.backend.dto.mapper.CompetitionsMapper
import ru.codebattles.backend.dto.mapper.CompetitionsProblemsMapper
import ru.codebattles.backend.entity.CompetitionsProblems
import ru.codebattles.backend.entity.LeaderBoardAllTasksQuery
import ru.codebattles.backend.entity.Leaderboard
import ru.codebattles.backend.entity.User
import ru.codebattles.backend.repository.CompetitionProblemsRepository
import ru.codebattles.backend.repository.CompetitionRepository
import ru.codebattles.backend.repository.TestRepo
import java.util.stream.Collectors

@Service
class CompetitionService(
    private val competitionRepository: CompetitionRepository,
    private val competitionProblemsRepository: CompetitionProblemsRepository,
    private val competitionsProblemsMapper: CompetitionsProblemsMapper,
    private val competitionsMapper: CompetitionsMapper,
    private val competitionsCreateMapper: CompetitionsCreateMapper,
    private val testRepo: TestRepo,
) {
    fun getById(id: Long): CompetitionDto {
        val optionalCompetition = competitionRepository.findById(id)
        if (optionalCompetition.isPresent) {
            return competitionsMapper.toDto(optionalCompetition.get())
        }


        throw ResponseStatusException(HttpStatus.NOT_FOUND)
    }

    fun getProblemsById(id: Long): Iterable<CompetitionsProblems> {
        return competitionProblemsRepository.getAllByCompetitionId(id)
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
            competitionProblemsRepository.getFirstByCompetitionIdAndProblemId(id, problemId)
        )
    }

    fun getAllByUser(user: User): List<CompetitionDto> {
        return competitionsMapper.toDtoS(
            competitionRepository.getByMembersContaining(user)
        )
    }

    fun create(competitionDto: CompetitionCreateDto, user: User): CompetitionDto {
        val convertedFromDto = competitionsCreateMapper.fromDto(competitionDto, user)
        val competition = competitionRepository.save(convertedFromDto)

        println()

        return competitionsMapper.toDto(competition)
    }
}
