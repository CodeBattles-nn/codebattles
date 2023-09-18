package ru.doctorixx.api.structures;

import ru.doctorixx.core.structures.Test;

import java.util.List;

public record APIRequest(String source, String compiler, List<Test> tests, String meta) {
}
