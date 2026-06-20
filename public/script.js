const closeChatBtn = document.querySelector('#closeChatBtn');
const startChatBtn = document.querySelector('#startChatBtn');
const chatbox = document.querySelector('.chatbox');
const userMessageInput = document.querySelector('#userMessageInput');
const sendMessageBtn = document.querySelector('.sendMessageBtn');
const chatbotContent = document.querySelector('.chatbotContent');

let canUserMessage = true;

const closeChat = () => {
    chatbox.classList.add('hidden');
    startChatBtn.classList.remove('hidden');
}

const startChat = () => {
    chatbox.classList.remove('hidden');
    startChatBtn.classList.add('hidden');
    userMessageInput.focus();
}

const scrollToBottomChat = () => {
    chatbotContent.scrollTop = chatbotContent.scrollHeight;
}

const sendUserMessage = async () => {
    // fixing required....
    const message = userMessageInput.value;
    if (message.trim() != '' && canUserMessage) {
        userMessageInput.value = '';
        const messageContainer = document.createElement('div');
        messageContainer.innerText = message;
        messageContainer.classList.add('userMessage');
        chatbotContent.appendChild(messageContainer);
        scrollToBottomChat();
        sendMessageBtn.classList.replace('bg-green-500', 'bg-green-400');
        canUserMessage = false;
        const body = {
            query: message,
        }

        // For hosting on Vercel, /api/question is used. If not hosted on vercel, then you should use /question
        const response = await fetch('/api/question', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            sendBotMessage("Something went wrong. Please try again later. Sorry for inconvenience.")
        } else {
            const chabotResponse = await response.json();
            if (chabotResponse) {
                sendBotMessage(chabotResponse['result']);
            }
        }
    }
}

const sendBotMessage = (response) => {
    const message = response;
    const messageContainer = document.createElement('div');
    messageContainer.innerText = message;
    messageContainer.classList.add('chatbotMessage');
    chatbotContent.appendChild(messageContainer);
    scrollToBottomChat();
    console.log(message);
    canUserMessage = true;
    sendMessageBtn.classList.replace('bg-green-400', 'bg-green-500');
}

closeChatBtn.addEventListener('click', (e) => {
    closeChat();
})

startChatBtn.addEventListener('click', (e) => {
    startChat();
})

sendMessageBtn.addEventListener('click', (e) => {
    sendUserMessage();
})

userMessageInput.addEventListener("keydown", (e) => {

    if (e.key == 'Enter') {
        e.preventDefault();
        sendUserMessage();
    }
})