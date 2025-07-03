package ru.doctorixx.core;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import ru.doctorixx.core.structures.ProcessEndStatus;
import ru.doctorixx.core.structures.ProgramResult;
import ru.doctorixx.core.structures.Test;

import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;

public class RunManager {
    private static final Logger logger = LoggerFactory.getLogger(RunManager.class.getName());

    private final ExecutionManager executionManager;
    private final List<ProgramResult> programResults = new ArrayList<>();

    public RunManager(ExecutionManager executionManager) {
        this.executionManager = executionManager;
    }

    public List<ProgramResult> test(List<Test> tests) {
        if (!programResults.isEmpty()) {
            logger.error("Attempted to run tests more than once.");
            throw new RuntimeException("Secondary test run");
        }

        boolean timeLimitExceeded = false;
        logger.info("Starting test execution...");

        for (int i = 0; i < tests.size(); i++) {
            Test test = tests.get(i);

            if (timeLimitExceeded) {
                logger.warn("Skipping test " + i + " due to previous time limit exceeded.");
                programResults.add(new ProgramResult(false, "", ProcessEndStatus.NOT_EXECUTED, 0));
                continue;
            }

            logger.info("Running test " + i);
            executionManager.setInputData(test.in());
            ProgramResult result = executionManager.executeOne();
            logger.info("Executed test " + i);

            if (result.msg().equals(ProcessEndStatus.TIME_LIMIT)) {
                logger.warn("Test " + i + " exceeded time limit.");
                timeLimitExceeded = true;
            }

            if (!result.success()) {
                logger.info("Test " + i + " failed with status: " + result.msg());
                programResults.add(result);
            } else if (!result.out().equals(test.out())) {
                logger.info("Test " + i + " produced wrong output. Expected: '" + test.out() + "', Got: '" + result.out() + "'");
                programResults.add(new ProgramResult(false, result.out(), ProcessEndStatus.WRONG_ANSWER, result.time()));
            } else {
                logger.info("Test " + i + " passed.");
                programResults.add(result);
            }
        }

        logger.info("Test execution completed. Total: " + programResults.size());
        return programResults;
    }

    public int getTestCount() {
        return programResults.size();
    }

    public int getSuccessTestCount() {
        int count = 0;
        for (ProgramResult result : programResults) {
            if (result.success()) count++;
        }
        return count;
    }
}
