package ru.doctorixx.core;

import ru.doctorixx.Env;
import ru.doctorixx.core.executors.CommandExecutor;
import ru.doctorixx.core.structures.ProgramResult;
import ru.doctorixx.core.utils.FileUtils;

import java.io.File;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.OutputStreamWriter;
import java.nio.charset.StandardCharsets;

import static ru.doctorixx.Env.EnvVars.ENV_EXECUTOR_WITH_BOM;

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
        File tempdir = new File(executeHomeDirectory + "/" + runId);
        try {

            if (!hasNewId) {
                tempdir.mkdir();


                fileData = executor.mutateProgramBeforeRun(fileData);

                try (OutputStreamWriter writer = new OutputStreamWriter(
                        new FileOutputStream(new File(tempdir, executor.getFilename())), StandardCharsets.UTF_8)) {

                    boolean useBOM = Env.get(ENV_EXECUTOR_WITH_BOM).equals("true");
                    if (useBOM) {
                        writer.write('\ufeff'); // Записываем BOM (0xEF, 0xBB, 0xBF)
                    }

                    writer.write(fileData);
                    writer.flush();
                }


                executor.setDirectory(tempdir.getAbsolutePath());
            }


            out = executor.executeAndAlwaysCompile(inputData);


        } catch (Exception e) {
            throw new RuntimeException(e);
        } finally {
//            FileUtils.recursiveDelete(tempdir);
            //tempdir.deleteOnExit();
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
