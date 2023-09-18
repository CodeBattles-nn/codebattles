package ru.doctorixx.core.compilers;

public class EmptyCompiler extends AbstractCompiler {
    @Override
    public String getCompileCommand() {
        throw new RuntimeException("Try to compile empty compiler");
    }

    @Override
    public boolean isNeedToCompile() {
        return false;
    }
}
