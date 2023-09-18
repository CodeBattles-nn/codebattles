package ru.doctorixx.core.structures;

public record ProgramResult(boolean success, String out, ProcessEndStatus msg, int time) {
    public static ProgramResult getSuccess() {
        return new ProgramResult(true, "", ProcessEndStatus.SUCCESS, 0);
    }
}
