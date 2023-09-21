package ru.doctorixx.core.executors;

import ru.doctorixx.Env;
import ru.doctorixx.core.compilers.AbstractCompiler;

public class EnvExecutor extends CommandExecutor{
    public EnvExecutor(String filename, String directory) {
        super(filename, directory);
    }

    @Override
    protected String getRunCommand() {
        return Env.get(Env.EnvVars.ENV_EXECUTOR_RUN_COMMAND);
    }

    @Override
    protected AbstractCompiler getCompiler() {
        return new AbstractCompiler() {
            @Override
            public String getCompileCommand() {
                return Env.get(Env.EnvVars.ENV_EXECUTOR_COMPILER_COMMAND);
            }

            @Override
            public boolean isNeedToCompile() {
                return Boolean.parseBoolean(Env.get(Env.EnvVars.ENV_EXECUTOR_COMPILER_NEED));
            }
        };
    }
}
