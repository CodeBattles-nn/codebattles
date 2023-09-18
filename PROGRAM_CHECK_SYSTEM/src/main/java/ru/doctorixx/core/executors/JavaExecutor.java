package ru.doctorixx.core.executors;

import ru.doctorixx.core.compilers.AbstractCompiler;
import ru.doctorixx.core.compilers.EmptyCompiler;

public class JavaExecutor extends CommandExecutor {


    public JavaExecutor(String filename, String directory) {
        super(filename, directory);
    }

    @Override
    protected String getRunCommand() {
        return "java";
    }

    @Override
    protected AbstractCompiler getCompiler() {
        return new EmptyCompiler();
    }

}
