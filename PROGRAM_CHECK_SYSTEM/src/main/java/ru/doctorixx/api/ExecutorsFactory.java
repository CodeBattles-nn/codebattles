package ru.doctorixx.api;

import ru.doctorixx.core.executors.CommandExecutor;
import ru.doctorixx.core.executors.JavaExecutor;
import ru.doctorixx.core.executors.KumirExecutor;
import ru.doctorixx.core.executors.PythonExecutor;

import java.util.HashMap;
import java.util.Map;

public class ExecutorsFactory {
    public static final Map<String, String> executors = new HashMap<>();

    static {
        executors.put("python", "hello.py");
        executors.put("java", "Main.java");
        executors.put("kumir", "kumir.kum");
    }

    public CommandExecutor get(String name){
        if (executors.containsKey(name)){
            switch (name){
                case "python":
                    return new PythonExecutor("main.py", "adir");
                case "java":
                    return new JavaExecutor("Main.java", "adir");
                case "kumir":
                    return new KumirExecutor("main.kum", "adir");
            }
        }
        throw new RuntimeException("No executors found by key: " + name);
    }
}
