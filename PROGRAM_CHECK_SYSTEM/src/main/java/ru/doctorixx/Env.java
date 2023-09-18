package ru.doctorixx;

import java.util.HashMap;
import java.util.Map;

public class Env {

    public enum EnvVars{

        SERVER_ENDPOINT("SERVER_ENDPOINT")

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
    }

    public static String get(String key) {
        return env.getOrDefault(key, defaultEnv.get(key));
    }

    public static String get(EnvVars value) {
        String key = value.getValue();
        return get(key);
    }

}
