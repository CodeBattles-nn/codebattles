package ru.doctorixx.core.executors;

import ru.doctorixx.core.compilers.AbstractCompiler;
import ru.doctorixx.core.structures.ProcessEndStatus;
import ru.doctorixx.core.structures.ProgramResult;
import ru.doctorixx.core.utils.BufferUtils;
import ru.doctorixx.core.utils.ProcessUtils;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.util.LinkedList;
import java.util.List;


public abstract class CommandExecutor {

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
        command.add(filename);

        ProcessBuilder builder = new ProcessBuilder(command)
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
                return new ProgramResult(false, "", ProcessEndStatus.TIME_LIMIT, (int) runMillis);


            }
            runMillis = Math.abs(millis - System.currentTimeMillis());
        }

        String line = BufferUtils.getOutput(stdout);
        String errStr = BufferUtils.getOutput(stderr);

        if (errStr.isEmpty() || errStr.isBlank()) {
            return new ProgramResult(true, line, ProcessEndStatus.SUCCESS, (int) runMillis);
        } else {
            return new ProgramResult(false, errStr, ProcessEndStatus.RUNTIME_ERROR, (int) runMillis);
        }

    }


    public ProgramResult execute(String in) throws IOException {
        if (!compiled) {
            ProgramResult compileResult = compile();
            if (!compileResult.success()) {
                return compileResult;
            }

            compiled = true;
            filename = getCompiler().filenameModifyAfterComplete(filename);
        }

        return execute(in, getRunCommand());

    }

    private ProgramResult compile() throws IOException {
        AbstractCompiler compiler = getCompiler();
        if (compiler.isNeedToCompile()) {
            ProgramResult result = execute("", compiler.getCompileCommand());
            if (result.success()) {
                return result;
            } else {
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


