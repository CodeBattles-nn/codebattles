export const formatDate = (dateString) => {
    if (!dateString) return undefined

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
    console.debug(score)

    if (score === 100) return "table-success"
    if (score === 0) return "table-danger"
    if (score > 0) return "table-warning"

    return ""
}