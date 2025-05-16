package ru.codebattles.backend.aspects

import org.aspectj.lang.JoinPoint
import org.aspectj.lang.annotation.Aspect
import org.aspectj.lang.annotation.Before
import org.aspectj.lang.reflect.MethodSignature
import org.springframework.security.access.AccessDeniedException
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.stereotype.Component
import ru.codebattles.backend.annotations.CompetitionId
import ru.codebattles.backend.entity.User
import ru.codebattles.backend.services.CompetitionService

@Aspect
@Component
class CompetitionAccessAspect(
    private val competitionService: CompetitionService,
) {
    @Before("@annotation(ru.codebattles.backend.annotations.CompetitionAccessRequired)")
    fun checkAccess(joinPoint: JoinPoint) {
        val authentication = SecurityContextHolder.getContext().authentication
        if (authentication == null || !authentication.isAuthenticated) {
            throw IllegalStateException("User is not authenticated!")
        }
        val user: User = authentication.principal as User


        val method = (joinPoint.signature as MethodSignature).method
        val parameterAnnotations = method.parameterAnnotations
        val args = joinPoint.args

        for ((index, annotations) in parameterAnnotations.withIndex()) {
            if (annotations.any { it is CompetitionId }) {
                val competitionId = args[index] as? Long
                    ?: throw IllegalArgumentException("Invalid competition ID")

                if (!competitionService.checkAccessForCompetitionByUser(user, competitionId)) {
                    throw AccessDeniedException("No access to competition $competitionId")
                }
                return
            }
        }

        throw IllegalStateException("No parameter annotated with @CompetitionId found")
    }
}