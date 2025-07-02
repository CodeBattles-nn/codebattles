package ru.doctorixx.api;

import ru.doctorixx.Env;
import ru.doctorixx.core.executors.*;

import java.util.HashMap;
import java.util.Map;

public class ExecutorsFactory {
    public static final Map<String, String> executors = new HashMap<>();

    private final boolean enabledEnvExecutor = Boolean.parseBoolean(Env.get(Env.EnvVars.ENV_EXECUTOR_ENABLE));

    static {
        executors.put("python", "hello.py");
        executors.put("java", "Main.java");
        executors.put("kumir", "kumir.kum");
    }

    public CommandExecutor get(String name) {
        if (enabledEnvExecutor){
            return new EnvExecutor(Env.get(Env.EnvVars.ENV_EXECUTOR_FILENAME), "adir");
        }

        if (executors.containsKey(name)) {
            switch (name) {
                case "python":
                    return new PythonExecutor("main.py", "adir");
                case "java":
                    return new JavaExecutor("Main.java", "adir");
                case "kumir":
                    return new KumirExecutor("main.kum", "adir");
            }
        }

//        System.out.println(Env.get(Env.EnvVars.ENV_EXECUTOR_ENABLE));

        throw new RuntimeException("No executors found by key: " + name);
    }
}
