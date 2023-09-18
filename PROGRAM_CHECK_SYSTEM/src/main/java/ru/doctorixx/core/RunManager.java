package ru.doctorixx.core;

import ru.doctorixx.core.structures.ProcessEndStatus;
import ru.doctorixx.core.structures.ProgramResult;
import ru.doctorixx.core.structures.Test;

import java.util.ArrayList;
import java.util.List;

public class RunManager {
    private final ExecutionManager executionManager;

    private final List<ProgramResult> programResults = new ArrayList<>();

    public RunManager(ExecutionManager executionManager) {
        this.executionManager = executionManager;
    }

    public List<ProgramResult> test(List<Test> tests) {
        if (programResults.size() != 0) {
            throw new RuntimeException("Secondary test run");
        }

        for (Test test : tests) {
            executionManager.setInputData(test.in());
            ProgramResult result = executionManager.executeOne();


            if (!result.success()) {
                programResults.add(result);
            } else if (!result.out().equals(test.out())) {
                programResults.add(new ProgramResult(false, result.out(), ProcessEndStatus.WRONG_ANSWER, result.time()));

            } else {
                programResults.add(result);
            }

        }

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
