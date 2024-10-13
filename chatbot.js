const qrcode = require('qrcode-terminal');
const { Client } = require('whatsapp-web.js'); 
const client = new Client();

client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Tudo certo! WhatsApp conectado.');
});

client.initialize();

const delay = ms => new Promise(res => setTimeout(res, ms));

// Controle do estado da conversa
const clientState = {};

client.on('message', async msg => {
    if (!msg || !msg.body) return; // Adiciona verificação para mensagens indefinidas

    const chat = await msg.getChat();
    if (msg.from.endsWith('@c.us')) {
        if (msg.body.match(/(menu|Menu|dia|tarde|noite|oi|Oi|Olá|olá|ola|Ola)/i)) {
            await delay(3000);
            await chat.sendStateTyping();
            await delay(3000);
            const contact = await msg.getContact();
            const name = contact.pushname || 'Cliente'; // Use um valor padrão caso pushname seja indefinido
            await client.sendMessage(msg.from, `Olá! ${name.split(" ")[0]}, obrigado por entrar em contato com a Toque Criativo. Somos especializados em convites digitais interativos. Para podermos ajudar, escolha uma opção:\n\n1 - Casamento\n2 - Save the Date\n3 - Infantil\n4 - 15 Anos\n5 - Outro(especifique). \n Responda com o número da opção que melhor descreve o que você procura.`);
            clientState[msg.from] = { menuSent: true };
        } else if (msg.body === '1') {
            await handleWedding(chat, msg.from);
        } else if (msg.body === '2') {
            await handleSaveTheDate(chat, msg.from);
        } else if (msg.body === '3') {
            await handleChildParty(chat, msg.from);
        } else if (msg.body === '4') {
            await handleFifteen(chat, msg.from);
        } else if (msg.body === '5') {
            await handleOther(chat, msg.from);
        } else {
            await handleInvalidResponse(chat, msg.from);
        }
    }
});

async function handleWedding(chat, from) {
    await delay(3000);
    await chat.sendStateTyping();
    await delay(3000);
    await client.sendMessage(from, 'Parabéns pelo casamento! Confira nosso catálogo de convites de casamento. Qualquer dúvida, estamos aqui!');
    await delay(3000);
    await chat.sendStateTyping();
    await delay(3000);
    await client.sendMessage(from, 'Segue nosso catálogo: https://drive.google.com/file/d/1xvxjdvMkhHIZ5W6neCY2Q2HL1UsL1hQQ/view?usp=sharing');
}

async function handleSaveTheDate(chat, from) {
    await delay(3000);
    await chat.sendStateTyping();
    await delay(3000);
    await client.sendMessage(from, 'O grande dia está chegando! Aqui está nosso catálogo de Save the Date. Precisa de ajuda? Fale com a gente!');
    await delay(3000);
    await chat.sendStateTyping();
    await delay(3000);
    await client.sendMessage(from, 'Link para cadastro: https://site.com');
}

async function handleChildParty(chat, from) {
    await delay(3000);
    await chat.sendStateTyping();
    await delay(3000);
    await client.sendMessage(from, 'Festa infantil à vista! Veja nosso catálogo de convites infantis. Qualquer dúvida, estamos à disposição!');
    await delay(3000);
    await chat.sendStateTyping();
    await delay(3000);
    await client.sendMessage(from, 'Link para cadastro: https://site.com');
}

async function handleFifteen(chat, from) {
    await delay(3000);
    await chat.sendStateTyping();
    await delay(3000);
    await client.sendMessage(from, '15 anos é um momento especial! Confira nosso catálogo de convites de debutantes. Fale conosco para personalizar!');
    await delay(3000);
    await chat.sendStateTyping();
    await delay(3000);
    await client.sendMessage(from, 'Link para cadastro: https://site.com');
}

async function handleOther(chat, from) {
    await delay(3000);
    await chat.sendStateTyping();
    await delay(3000);
    await client.sendMessage(from, 'Ótimo! Me conte mais sobre o que procura, e vamos criar o convite perfeito para você!');
}

async function handleInvalidResponse(chat, from) {
    await delay(3000); // Simula digitação
    await client.sendMessage(from, 'Desculpe, não entendi. Por favor, responda com um número correspondente ao que você procura.');
}
