package ru.doctorixx.core;

import ru.doctorixx.core.executors.CommandExecutor;
import ru.doctorixx.core.structures.ProgramResult;
import ru.doctorixx.core.utils.FileUtils;

import java.io.File;
import java.io.FileWriter;

public class ExecutionManager {

    private static int lastProgramId;
    private final CommandExecutor executor;
    private final File executeHomeDirectory;
    private String inputData;
    private String fileData;
    private boolean hasNewId;
    private int myId;

    public ExecutionManager(CommandExecutor executor, String inputData, String fileData) {
        this.executor = executor;
        this.executeHomeDirectory = new File(executor.getDirectory());
        this.inputData = inputData;
        this.fileData = fileData;
    }


    synchronized static private int generateNewProgramId() {
        lastProgramId++;
        if (lastProgramId + 5 >= Integer.MAX_VALUE) {
            lastProgramId = 5;
        }
        return lastProgramId;
    }

    public ProgramResult executeOne() {
        return execute(generateNewProgramId());
    }


    public ProgramResult executeMany() {
        if (!hasNewId) {
            myId = generateNewProgramId();
            hasNewId = true;
        }
        return execute(myId);
    }

    private ProgramResult execute(int runId) {
        ProgramResult out;
        File tempdir = new File(executeHomeDirectory + "\\" + runId);
        try {

            if (!hasNewId) {
                tempdir.mkdir();


                fileData = executor.mutateProgramBeforeRun(fileData);

                try (FileWriter writer = new FileWriter(new File(tempdir, executor.getFilename()))) {
                    writer.write(fileData);
                    writer.flush();
                }


                executor.setDirectory(tempdir.getAbsolutePath());
            }


            out = executor.execute(inputData);


        } catch (Exception e) {
            throw new RuntimeException(e);
        } finally {
            FileUtils.recursiveDelete(tempdir);
            tempdir.deleteOnExit();
        }

        return out;
    }

    public String getInputData() {
        return inputData;
    }

    public void setInputData(String inputData) {
        this.inputData = inputData;
    }
}
