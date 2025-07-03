package ru.doctorixx.core.executors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import ru.doctorixx.Env;
import ru.doctorixx.core.compilers.AbstractCompiler;
import ru.doctorixx.core.structures.ProcessEndStatus;
import ru.doctorixx.core.structures.ProgramResult;
import ru.doctorixx.core.utils.BufferUtils;
import ru.doctorixx.core.utils.ProcessUtils;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.LinkedList;
import java.util.List;

public abstract class CommandExecutor {
    private static final Logger logger = LoggerFactory.getLogger(CommandExecutor.class);

    public static final int TIME_LIMIT = 1000;

    private String filename;
    private String directory;
    private boolean compiled;

    protected CommandExecutor(String filename, String directory) {
        this.filename = filename;
        this.directory = directory;
    }

    abstract protected String getRunCommand();

    abstract protected AbstractCompiler getCompiler();

    private ProgramResult execute(String in, String mainCommand) throws IOException {
        List<String> command = new LinkedList<>();

        command.add(mainCommand);
        command.addAll(List.of(mainCommand.split(" ")));
        logger.debug("Command split result: {}", Arrays.deepToString(mainCommand.split(" ")));

        boolean needToAddFileName = Boolean.parseBoolean(Env.get(Env.EnvVars.ENV_EXECUTOR_WITH_FILENAME));
        if (needToAddFileName) {
            mainCommand = mainCommand + " " + filename;
        }

        ProcessBuilder builder = new ProcessBuilder("sh", "-c", mainCommand)
                .directory(new File(directory));
        Process pr = builder.start();

        BufferedReader stdout = new BufferedReader(new InputStreamReader(pr.getInputStream()));
        BufferedReader stderr = new BufferedReader(new InputStreamReader(pr.getErrorStream()));

        Writer stdin = new OutputStreamWriter(pr.getOutputStream(), StandardCharsets.UTF_8);

        stdin.write(in);
        stdin.write("\n");
        stdin.flush();

        long millis = System.currentTimeMillis();
        long runMillis = Math.abs(millis - System.currentTimeMillis());

        while (ProcessUtils.processAlive(pr)) {
            if (runMillis >= TIME_LIMIT) {
                pr.destroy();
                logger.warn("Process terminated due to time limit ({} ms)", TIME_LIMIT);
                return new ProgramResult(false, "", ProcessEndStatus.TIME_LIMIT, (int) runMillis);
            }
            runMillis = Math.abs(millis - System.currentTimeMillis());
        }

        String line = BufferUtils.getOutput(stdout);
        String errStr = BufferUtils.getOutput(stderr);

        if (errStr.isEmpty() || errStr.isBlank()) {
            logger.debug("Process completed successfully in {} ms", runMillis);
            return new ProgramResult(true, line, ProcessEndStatus.SUCCESS, (int) runMillis);
        } else {
            logger.warn("Process completed with errors: {}", errStr);
            return new ProgramResult(false, errStr, ProcessEndStatus.RUNTIME_ERROR, (int) runMillis);
        }
    }

    public ProgramResult execute(String in) throws IOException {
        if (!compiled) {
            ProgramResult compileResult = compile();
            if (!compileResult.success()) {
                logger.error("Compilation failed: {}", compileResult.out());
                return compileResult;
            }

            compiled = true;
            filename = getCompiler().filenameModifyAfterComplete(filename);
        }

        return execute(in, getRunCommand());
    }

    public ProgramResult executeAndAlwaysCompile(String in) throws IOException {
        ProgramResult compileResult = compile();
        if (!compileResult.success()) {
            logger.error("Compilation failed: {}", compileResult.out());
            return compileResult;
        }

        compiled = true;
        filename = getCompiler().filenameModifyAfterComplete(filename);

        return execute(in, getRunCommand());
    }

    private ProgramResult compile() throws IOException {
        AbstractCompiler compiler = getCompiler();
        if (compiler.isNeedToCompile()) {
            logger.debug("Compiling program...");
            ProgramResult result = execute("", compiler.getCompileCommand());
            if (result.success()) {
                logger.debug("Compilation successful");
                return result;
            } else {
                logger.error("Compilation error: {}", result.out());
                return new ProgramResult(false, result.out(), ProcessEndStatus.COMPILE_ERROR, 0);
            }
        }
        return ProgramResult.getSuccess();
    }

    public String getDirectory() {
        return directory;
    }

    public void setDirectory(String directory) {
        this.directory = directory;
    }

    public String getFilename() {
        return filename;
    }

    public String mutateProgramBeforeRun(String program) {
        return program;
    }
}