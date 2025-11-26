const messages = []

const sendMsgController = (msg) => {
    messages.push(msg)
    return messages
}

const getMessagesController = () => {
    return messages
}

export {
    sendMsgController,
    getMessagesController
}