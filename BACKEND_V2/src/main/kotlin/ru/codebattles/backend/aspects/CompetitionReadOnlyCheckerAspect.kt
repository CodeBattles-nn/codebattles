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
class CompetitionReadOnlyCheckerAspect(
    private val competitionService: CompetitionService,
) {
    @Before("@annotation(ru.codebattles.backend.annotations.CompetitionReadOnlyCheck)")
    fun checkAccess(joinPoint: JoinPoint) {
        val method = (joinPoint.signature as MethodSignature).method
        val parameterAnnotations = method.parameterAnnotations
        val args = joinPoint.args

        for ((index, annotations) in parameterAnnotations.withIndex()) {
            if (annotations.any { it is CompetitionId }) {
                val competitionId = args[index] as? Long
                    ?: throw IllegalArgumentException("Invalid competition ID")

                if (competitionService.getById(competitionId).readOnly) {
                    throw AccessDeniedException("No access to competition $competitionId (read only access)")
                }
                return
            }
        }

        throw IllegalStateException("No parameter annotated with @CompetitionId found")
    }
}