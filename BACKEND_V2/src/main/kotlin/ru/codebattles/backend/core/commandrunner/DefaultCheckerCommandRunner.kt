package ru.codebattles.backend.core.commandrunner

import org.springframework.boot.CommandLineRunner
import org.springframework.stereotype.Component
import ru.codebattles.backend.entity.Checker
import ru.codebattles.backend.entity.Variable
import ru.codebattles.backend.repository.CheckerRepository
import ru.codebattles.backend.repository.VariablesRepository

@Component
class DefaultCheckerCommandRunner(
    val variablesRepository: VariablesRepository,
    private val checkerRepository: CheckerRepository,
) : CommandLineRunner {

    val VARIABLE_KEY: String = "DEFAULT_CHECKER_EXECUTOR_COMPLETE"


    override fun run(vararg args: String?) {
        val notFirstExecute = variablesRepository.existsByKey(VARIABLE_KEY)
        if (notFirstExecute) return

        val checker = Checker(
            displayName = "Default Python3 Checker",
            languageHighlightName = "python",
            address = "http://checker-python:7070/api/v1/test"
        )

        checkerRepository.save(checker)
        variablesRepository.save(Variable(key = VARIABLE_KEY, value = "true"))
    }
}
