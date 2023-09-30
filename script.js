const searchIcon = document.querySelector(".search-icon");
const searchForm = document.querySelector(".search-from");

searchIcon.addEventListener("click", () => {
    searchForm.classList.add("active");
    cartItemsContainer.classList.remove("active")
});

const cartIcon = document.querySelector(".cart-icon ");
const cartItemsContainer = document.querySelector(".cart-items-container")

cartIcon.addEventListener("click", () => {
    cartItemsContainer.classList.add("active");
    searchForm.classList.remove("active");
});

//usuario
document.querySelector('input[name="usuario"').addEventListener('keyup', () => {
    if (document.querySelector('input[name="usuario"] + span') !== null) {
        document.querySelector('input[name="usuario"] + span').remove()
    }
})

//senha
document.querySelector('input[name="senha"]').addEventListener('keyup', () => {
    if (document.querySelector('input[name="senha"] + span') !== null) {
        document.querySelector('input[name="senha"] + span').remove();

    }
})

//introdução a validação de formularios

Document.formulario_login.addEventListener('submit', (Event) => {

    //buscar valores dos campos 
    let email = document.getElementById("email").value;
    let senha = document.getElementById("senha").value;
    console.log(email, senha);



    //validar usuario

    if (usuario === "") {
        submit = false

        //ERROR
        let tmp = document.querySelector('input[name="usuario"]')
        tmp.insertAdjacentHTML('afterend', '<span class="error">Usuario é obrigatório.</SPAN>')
    }

    //validar senha

    if (senha === "") {
        submit = false

        //ERROR 
        let tmp = document.querySelector('input[name="senha"]');
        tmp.insertAdjacentHTML('afterend', '<span class="error">Senha é Obrigatória</SPAN>');
    }


    //verificar se o formulario pode ser submetido
    if (!submit) {
        Event.preventDefault();

        setTimeout(() => {
            document.querySelectorAll(".error").forEach(e => e.remove())
        }, 2000);
    }

})

// chatbot//
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const chatbox = document.querySelector(".chatbox");
const chatbotToggler = document.querySelector(".chatbot-toggler");
const chatbotCloseBtn = document.querySelector(".Close-btn");
let userMessage;
const API_KEY = "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";
const inputIniHeight = chatInput.scrollHeight;

const createChatli = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    let chatContent = className === "outgoing" ? ` <p></p>` : ` <span class="material-symbols-outlinde"></span><p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message
    return chatLi
}
const generateResponse = (incomingChatLi) => {
    const API_URL = "https://api.openai.com/v1/chat/completions";
    const messageElement = incomingChatLi.querySelector("p");
    const requestOptions = {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            message: [{ role: "user", content: userMessage }]
        })

    }
    fetch(API_URL, requestOptions).then(res => res.JSON()).then(data => {
        messageElement.textContent = data.choices[0].message.content;
    }).catch((error) => {
        messageElement.classList.add("error");
        messageElement.textContent = "Oops! something went wrong. Please try again.";
    }).finally(() => chatbox.scrollTo(0, chatbox.scrollHeight));
}

const handlechat = () => {
    userMessage = chatInput.value.trim();
    if (!userMessage) return;
    chatInput.value = "";
    chatInput.style.height = `$(inputIniHeight)px`;

    chatbox.appendChild(createChatli(userMessage, "outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);

    setTimeout(() => {
        const incomingChatLi = createChatli("Thinking...", "incoming");
        chatbox.appendChild(incomingChatLi);
        chatbox.scrollTo(0, chatbox.scrollHeight);
        generateResponse(incomingChatLi);
    }, 600);
}


chatInput.addEventListener("input", () => {
    chatInput.style.height = `$(inputIniHeight)px`;
    chatInput.style.height = `$(inputIniHeight.scrollHeight)px`;
});
chatInput.addEventListener("keydown", (e) => {
    if (e.key === 'Enter' && !e.shiftkey && window.innerWidth > 800) {
        e.preventDefault();
        handlechat();
    }
});

sendChatBtn.addEventListener("click", handlechat);
chatbotCloseBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"))