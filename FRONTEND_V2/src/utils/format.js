export const formatDate = (dateString) => {
    const date = new Date(dateString);

    return date.toLocaleString('ru-RU', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        // timeZone: 'UTC'
    })
}



export const getCssClassBySendScore = (score) => {
    console.log(score)

    if (score === 100) return "table-success"
    if (score === 0) return "table-danger"
    if (score > 0) return "table-warning"

    return ""
}