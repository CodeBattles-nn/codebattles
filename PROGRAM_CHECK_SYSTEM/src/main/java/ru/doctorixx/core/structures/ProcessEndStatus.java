package ru.doctorixx.core.structures;

public enum ProcessEndStatus {
    SUCCESS("OK"),
    RUNTIME_ERROR("RE"),
    COMPILE_ERROR("CE"),
    TIME_LIMIT("TL"),
    WRONG_ANSWER("WA"),
    NOT_EXECUTED("NE"),
    ;

    private final String msg;

    ProcessEndStatus(String msg){

        this.msg = msg;
    }

    @Override
    public String toString() {
        return msg;
    }
}
