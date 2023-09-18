package ru.doctorixx.core.compilers;

public abstract class AbstractCompiler {
    public abstract String getCompileCommand();

    public boolean isNeedToCompile() {
        return true;
    }

    public String filenameModifyAfterComplete(String in) {
        return in;
    }
}
