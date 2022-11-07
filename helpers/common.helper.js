function getEndpoint(response) {
    return response.payload.items[0].message.split('\n')[4].split('https://clientbase.us')[1]
}
export { getEndpoint }

