package ru.doctorixx.core.utils;

public class ProcessUtils {
    public static boolean processAlive(Process process) {

        // If process is alive, process.exitValue() throws exception
        // process.isAlive() works wrong on linux ubuntu
        // 22.05.2023
        try {
            process.exitValue();
            return false;
        } catch (Exception ignored) {
            return true;
        }
    }
}
