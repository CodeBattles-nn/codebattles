export const competitionStatuses = {
    NOT_STARTED: "NOT_STARTED",
    IN_PROGRESS: "IN_PROGRESS",
    ENDED: "ENDED",
}

export const competitionStatusesTranslate = {
    NOT_STARTED: "Не началось",
    IN_PROGRESS: "Идет",
    ENDED: "Завершено",
}

export const competitionStatusesCssColor = {
    NOT_STARTED: "bg-warning",
    IN_PROGRESS: "bg-success",
    ENDED: "bg-danger",
}

export const competitionStatusesCssColorText = {
    NOT_STARTED: "text-dark",
    IN_PROGRESS: "",
    ENDED: "",
}





export const getCompetitionStatusByDates = (start_time_str, end_time_str) => {
    const startTimeDate = new Date(start_time_str);
    const endTimeDate = new Date(end_time_str);

    const now = new Date();

    if (startTimeDate > now) return competitionStatuses.NOT_STARTED;
    if (endTimeDate < now) return competitionStatuses.ENDED;

    return competitionStatuses.IN_PROGRESS;

}