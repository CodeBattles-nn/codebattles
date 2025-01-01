package ru.codebattles.backend.entity

import java.util.*

data class LeaderBoardAllTasksQuery(
    val userId: Long,
    val competitionproblemId: Long,
    val maxScore: Long

)

data class LeaderBoardScoreOrderQuery(
    val userId: Long,
    val score: Long,
    val time: Date

)

data class Leaderboard(
    val score: List<LeaderBoardScoreOrderQuery>,
    val data: Map<Long, List<LeaderBoardAllTasksQuery>>
)
