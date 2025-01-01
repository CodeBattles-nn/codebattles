package ru.codebattles.backend.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import ru.codebattles.backend.entity.Competition
import ru.codebattles.backend.entity.LeaderBoardAllTasksQuery
import ru.codebattles.backend.entity.LeaderBoardScoreOrderQuery

interface TestRepo : JpaRepository<Competition?, Long?> {
    @Query(
                "SELECT \n" +
                "  a.user_id as userId,\n" +
                "  cp.id as competitionProblemID, MAX(a.score) AS maxScore\n" +
                "  \n" +
                "  FROM public.competitions_problems as cp\n" +
                "JOIN answer a On a.competitions_problems_id = cp.id\n" +
                "GROUP BY a.user_id, cp.id\n",
        nativeQuery = true
    )
    fun getLeaderboard(): List<LeaderBoardAllTasksQuery>

    @Query(
        "SELECT \n" +
                "userId,\n" +
                "SUM(maxScore) as score,\n" +
                "MAX(maxTime) as time\n" +
                "\n" +
                "FROM\n" +
                "(\n" +
                "SELECT \n" +
                "  a.user_id as userId,\n" +
                "  cp.id as competitionProblemID,\n" +
                "  MAX(a.score) AS maxScore,\n" +
                "  MAX(a.created_at) as maxTime\n" +
                "  \n" +
                "  \n" +
                "  \n" +
                "  FROM public.competitions_problems as cp\n" +
                "JOIN answer a On a.competitions_problems_id = cp.id\n" +
                "WHERE cp.competition_id = 1\n" +
                "GROUP BY a.user_id, cp.id\n" +
                ") AS subquery\n" +
                "GROUP BY userId\n" +
                "ORDER BY score desc, time ",
        nativeQuery = true
    )
    fun getLeaderboardStats(): List<LeaderBoardScoreOrderQuery>
}
