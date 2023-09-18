package ru.doctorixx.core.utils;

import java.io.BufferedReader;
import java.io.IOException;

public class BufferUtils {
    public static String getOutput(BufferedReader reader) throws IOException {
        StringBuilder out = new StringBuilder();
        while (reader.ready()) {
            String readedLine = reader.readLine();
            out.append(readedLine).append("\n");
        }
        return out.toString().strip();
    }
}
