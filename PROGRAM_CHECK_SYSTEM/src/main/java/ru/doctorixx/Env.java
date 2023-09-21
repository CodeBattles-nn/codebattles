package ru.doctorixx;

import java.util.HashMap;
import java.util.Map;

public class Env {

    public enum EnvVars{

        SERVER_ENDPOINT("SERVER_ENDPOINT"),

        ENV_EXECUTOR_ENABLE("ENV_EXECUTOR_ENABLE"),
        ENV_EXECUTOR_FILENAME("ENV_EXECUTOR_FILENAME"),
        ENV_EXECUTOR_COMPILER_COMMAND("ENV_EXECUTOR_COMPILER_COMMAND"),
        ENV_EXECUTOR_COMPILER_NEED("ENV_EXECUTOR_COMPILER_NEED"),
        ENV_EXECUTOR_RUN_COMMAND("ENV_EXECUTOR_RUN_COMMAND"),

        ;
        private final String value;

        EnvVars(String value) {
            this.value = value;
        }

        public String getValue() {
            return value;
        }
    }

    private static final Map<String, String> defaultEnv = new HashMap<>();
    private static final Map<String, String> env = System.getenv();

    static {
        defaultEnv.put(EnvVars.SERVER_ENDPOINT.value, "http://127.0.0.1:5000/api/check_system_callback");

        defaultEnv.put(EnvVars.ENV_EXECUTOR_COMPILER_COMMAND.value, "--");
        defaultEnv.put(EnvVars.ENV_EXECUTOR_COMPILER_NEED.value, "false");
        defaultEnv.put(EnvVars.ENV_EXECUTOR_RUN_COMMAND.value, "java");
        defaultEnv.put(EnvVars.ENV_EXECUTOR_ENABLE.value, "false");
        defaultEnv.put(EnvVars.ENV_EXECUTOR_FILENAME.value, "Main.java");
    }

    public static String get(String key) {
        return env.getOrDefault(key, defaultEnv.get(key));
    }

    public static String get(EnvVars value) {
        String key = value.getValue();
        return get(key);
    }

}
