package ru.codebattles.backend.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import ru.codebattles.backend.entity.Competition
import ru.codebattles.backend.entity.LeaderBoardAllTasksQuery
import ru.codebattles.backend.entity.LeaderBoardScoreOrderQuery

interface LeaderboardRepository : JpaRepository<Competition?, Long?> {
    @Query(
        """
    SELECT
        a.user_id AS userId,
        cp.id AS competitionProblemID,
        MAX(a.score) AS maxScore
    FROM public.competitions_problems AS cp
    JOIN answer a ON a.competitions_problems_id = cp.id
    WHERE cp.competition_id = :compId
    GROUP BY a.user_id, cp.id
    """,
        nativeQuery = true
    )
    fun getLeaderboard(@Param("compId") compId: Long): List<LeaderBoardAllTasksQuery>

    @Query(
        """
    SELECT 
        userId,
        userX,
        SUM(maxScore) AS score,
        MAX(maxTime) AS time
    FROM (
        SELECT 
            a.user_id AS userId,
            COALESCE(u.name, 'no name') AS userX,
            MAX(a.score) AS maxScore,
            MAX(a.created_at) AS maxTime
        FROM public.competitions_problems AS cp
        JOIN answer a ON a.competitions_problems_id = cp.id
        JOIN users_ u ON a.user_id = u.id
        WHERE cp.competition_id = :compId
        GROUP BY a.user_id, cp.id, u.name
    ) AS subquery
    GROUP BY userId, userX
    ORDER BY score DESC, time
""",
        nativeQuery = true
    )
    fun getLeaderboardStats(@Param("compId") compId: Long): List<LeaderBoardScoreOrderQuery>
}
