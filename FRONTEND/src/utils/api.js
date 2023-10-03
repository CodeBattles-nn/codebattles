
const API_PORT = 5000

function getApiAddress() {
    return `${document.location.protocol}//${document.location.hostname}:${API_PORT}`
}

export default getApiAddress;