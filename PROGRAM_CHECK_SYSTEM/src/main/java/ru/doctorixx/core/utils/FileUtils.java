package ru.doctorixx.core.utils;

import java.io.File;

public class FileUtils {
    public static void recursiveDelete(File file) {
        if (!file.exists())
            return;

        if (file.isDirectory()) {
            for (File f : file.listFiles()) {
                recursiveDelete(f);
            }
        }
        file.delete();
    }
}
