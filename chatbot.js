const qrcode = require('qrcode-terminal');
const { Client, Buttons, List, MessageMedia } = require('whatsapp-web.js'); 
const client = new Client();

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Tudo certo! WhatsApp conectado.');
});

client.initialize();

const delay = ms => new Promise(res => setTimeout(res, ms));

// Controle do estado da conversa
const clientState = {};

client.on('message', async msg => {

    // Verificação do estado inicial (menu principal)
    if (msg.body.match(/(menu|Menu|dia|tarde|noite|oi|Oi|Olá|olá|ola|Ola)/i) && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        const contact = await msg.getContact();
        const name = contact.pushname;
        await client.sendMessage(msg.from, 'Olá! '+ name.split(" ")[0] + ',obrigado por entrar em contato com a Toque Criativo. Somos especializados em convites digitais interativos. Para podermos ajudar, escolha uma opção:\n\n1 - Casamento\n2 - Save the Date\n3 - Infantil\n4 - 15 Anos\n5 - Outro(especifique). \n Responda com o número da opção que melhor descreve o que você procura. Estamos prontos para criar o convite perfeito para você!'); 
        clientState[msg.from] = { menuSent: true }; // Controla se o menu foi enviado para este usuário
    }

    // Lógica para cada opção escolhida
    if (msg.body !== null && msg.body === '1' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, 'Parabéns pelo casamento! Confira nosso catálogo de convites de casamento. Qualquer dúvida, estamos aqui!');
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, 'Segue nosso catálogo: https://drive.google.com/file/d/1xvxjdvMkhHIZ5W6neCY2Q2HL1UsL1hQQ/view?usp=sharing');
    }

    if (msg.body !== null && msg.body === '2' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, 'O grande dia está chegando! Aqui está nosso catálogo de Save the Date. Precisa de ajuda? Fale com a gente!');
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, 'Link para cadastro: https://site.com');
    }

    if (msg.body !== null && msg.body === '3' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, 'Festa infantil à vista! Veja nosso catálogo de convites infantis. Qualquer dúvida, estamos à disposição!');
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, 'Link para cadastro: https://site.com');
    }

    if (msg.body !== null && msg.body === '4' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, '15 anos é um momento especial! Confira nosso catálogo de convites de debutantes. Fale conosco para personalizar!');
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, 'Link para cadastro: https://site.com');
    }

    if (msg.body !== null && msg.body === '5' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, 'Ótimo! Me conte mais sobre o que procura, e vamos criar o convite perfeito para você!');
    }

    // Adicionando a lógica para capturar respostas inválidas
    if (!msg.body.match(/(casamento|1|save the date|2|infantil|3|15 anos|4|outro|5)/i) && msg.from.endsWith('@c.us')) {
        await delay(3000); // Simula digitação
        await client.sendMessage(msg.from, 'Desculpe, não entendi. Por favor, responda com um número correspondente ao que você procura.');
    }

});