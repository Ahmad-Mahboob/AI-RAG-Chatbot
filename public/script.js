const closeChatBtn = document.querySelector('#closeChatBtn');
const startChatBtn = document.querySelector('#startChatBtn');
const chatbox = document.querySelector('.chatbox');
const userMessageInput = document.querySelector('#userMessageInput');
const sendMessageBtn = document.querySelector('.sendMessageBtn');
const chatbotContent = document.querySelector('.chatbotContent');
const startChattingBtn = document.querySelector('.startChattingBtn');

let canUserMessage = true;
let isBotResponding = false;

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
    const message = userMessageInput.value;
    if (message.trim() != '' && canUserMessage) {
        userMessageInput.value = '';
        const messageContainer = document.createElement('div');
        messageContainer.innerText = message;
        messageContainer.classList.add('userMessage');
        chatbotContent.appendChild(messageContainer);
        sendBotMessage("Thinking...");
        scrollToBottomChat();
        sendMessageBtn.classList.replace('bg-green-500', 'bg-green-400');
        canUserMessage = false;
        const body = {
            query: message,
        }
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
                console.log(chabotResponse['result']);
            }
        }
        console.log(response);
    }
}

const sendBotMessage = (response) => {
    if (!isBotResponding) {
        const message = response;
        const messageContainer = document.createElement('div');
        messageContainer.innerHTML = `Thinking<div class="flex items-end gap-0.75">
              <span
                class="w-1 h-1 bg-gray-100 rounded-full animate-loader"
              ></span>
              <span
                style="animation-delay: 0.17s"
                class="w-1 h-1 bg-gray-100 rounded-full animate-loader"
              ></span>
              <span
                style="animation-delay: 0.33s"
                class="w-1 h-1 bg-gray-100 rounded-full animate-loader"
              ></span>
            </div>`;
        messageContainer.classList.add('chatbotMessage');
        chatbotContent.appendChild(messageContainer);
        isBotResponding = true;
    } else {
        const botMessages = document.querySelectorAll('.chatbotMessage');
        const botLatestMsg = botMessages[botMessages.length - 1];
        botLatestMsg.classList.add('flex-col')
        botLatestMsg.innerHTML = response;
        isBotResponding = false;
        canUserMessage = true;
    }
    scrollToBottomChat();
    // console.log(message);
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

startChattingBtn.addEventListener('click', (e) => {
    startChat();
})