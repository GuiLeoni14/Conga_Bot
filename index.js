// eslint-disable-next-line
const { configs, cliente, prefix, resetVariaveis, TOKKEN } = require('./src/global');
const { Admin } = require('./src/Functions/Admin/Admin');
const { servers, saveServer, loadServers } = require('./src/Functions/Server/Server');
const { AllComands } = require('./src/Commands/AllComands');
const { searchYoutubeMusic } = require('./src/Functions/Music/Youtube');

cliente.on('ready', () => {
    cliente.user.setActivity('#help', { type: 'PLAYING' });
    loadServers();
    console.log('Estou ligado');
});

cliente.on('guildCreate', (guild) => {
    servers[guild.id] = {
        connection: null,
        dispatcher: null,
        fila: [],
        estouTocando: false,
    };
    saveServer(guild.id);
});

cliente.on('message', async (msg) => {
    AllComands(msg);
    if (msg.content === `${prefix}admin`) {
        try {
            const teste = await searchYoutubeMusic('https://youtu.be/2_xBCeBmaS8');
            console.log(teste);
        } catch (err) {
            console.log(err);
        }
    }
});

// eslint-disable-next-line
cliente.login(TOKKEN);