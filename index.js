const chatLog = document.getElementById('chat-log'),
    userInput = document.getElementById('user-input'),
    sendButton = document.getElementById('send-button'),
    buttonIcon = document.getElementById('button-icon'),
    info = document.querySelector('.info');

sendButton.addEventListener('click', sendMessage);
userInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const message = userInput.value.trim();
    if (message === '') {
        return;
    }
    else if (message === 'developer') {
        userInput.value = '';
        appendMessage('user', message);
        setTimeout(() => {
            appendMessage('bot', 'This Source Coded By JWilliams \nGithub : @JWill031');
            buttonIcon.classList.add('fa-solid', 'fa-paper-plane');
            buttonIcon.classList.remove('fas', 'fa-spinner', 'fa-pulse');
        }, 2000);
        return;
    }

    appendMessage('user', message);
    userInput.value = '';

    const url = 'https://chatgpt-best-price.p.rapidapi.com/v1/chat/completions';
    const options = {
	    method: 'POST',
	    headers: {
		    'content-type': 'application/json',
		    'X-RapidAPI-Key': '74157f9c40msh14976045e5e6fddp1b9973jsnfdf04a5c6712',
		    'X-RapidAPI-Host': 'chatgpt-best-price.p.rapidapi.com'
	    },
	    body: `{"model":"gpt-3.5-turbo","messages":[{"role":"user","content":"${message}"}]}`
    };

    fetch('https://chatgpt-best-price.p.rapidapi.com/v1/chat/completions', options).then((response) => response.json()).then((response) => {
        appendMessage('bot', response.choices[0].message.content);

        buttonIcon.classList.add('fa-solid', 'fa-paper-plane');
        buttonIcon.classList.remove('fas', 'fa-spinner', 'fa-pulse');
    }).catch((err) => {
        if (err.name === 'TypeError') {
            appendMessage('bot', 'Error : Check Your Api Key!');
            buttonIcon.classList.add('fa-solid', 'fa-paper-plane');
            buttonIcon.classList.remove('fas', 'fa-spinner', 'fa-pulse');
        }
    });
}

function appendMessage(sender, message) {
    info.style.display = "none";

    buttonIcon.classList.remove('fa-solid', 'fa-paper-plane');
    buttonIcon.classList.add('fas', 'fa-spinner', 'fa-pulse');

    const messageElement = document.createElement('div');
    const iconElement = document.createElement('div');
    const chatElement = document.createElement('div');
    const icon = document.createElement('i');

    chatElement.classList.add("chat-box");
    iconElement.classList.add("icon");
    messageElement.classList.add(sender);
    messageElement.innerText = message;

    if (sender === 'user') {
        icon.classList.add('fa-regular', 'fa-user');
        iconElement.setAttribute('id', 'user-icon');
    } else {
        icon.classList.add('fa-solid', 'fa-robot');
        iconElement.setAttribute('id', 'bot-icon');
    }

    iconElement.appendChild(icon);
    chatElement.appendChild(iconElement);
    chatElement.appendChild(messageElement);
    chatLog.appendChild(chatElement);
    chatLog.scrollTo = chatLog.scrollHeight;

}