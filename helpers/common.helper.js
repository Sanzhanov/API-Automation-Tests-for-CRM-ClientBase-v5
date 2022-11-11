function getEndPoint(response) {
    return response.payload.items[0].message.split('\n')[4].split('https://clientbase.us')[1]
}

function changeUserID(userID) {
    return userID.replace(userID[0], 0)
}

export { getEndPoint, changeUserID }