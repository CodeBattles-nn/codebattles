package ru.doctorixx.api.structures;

import ru.doctorixx.core.structures.ProgramResult;

import java.util.List;

public record ApiResponse(List<ProgramResult> results, String meta) {
}
