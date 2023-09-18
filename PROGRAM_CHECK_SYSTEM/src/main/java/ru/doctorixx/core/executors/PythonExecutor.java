package ru.doctorixx.core.executors;

import ru.doctorixx.core.compilers.AbstractCompiler;
import ru.doctorixx.core.compilers.EmptyCompiler;

public class PythonExecutor extends CommandExecutor {


    public PythonExecutor(String filename, String directory) {
        super(filename, directory);
    }

    @Override
    protected String getRunCommand() {
        return "python3";
    }

    @Override
    protected AbstractCompiler getCompiler() {
        return new EmptyCompiler();
    }
}
