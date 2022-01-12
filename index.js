// eslint-disable-next-line
const { configs, cliente, prefix, resetVariaveis, TOKKEN } = require('./src/global');
const { Admin } = require('./src/Functions/Admin/Admin');
const { servers, saveServer, loadServers, searchServer } = require('./src/Functions/Server/Server');
const { allCommands } = require('./src/Commands/AllCommands');
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
    await searchServer(msg.guild.id);
    console.log('Ja salvou o servidor');
    allCommands(msg);
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