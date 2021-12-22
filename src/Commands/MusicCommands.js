const { prefix } = require('../global');
const { musicPlay, musicSkip, musicReset, musicPause, musicResume, musicList } = require('../Functions/Music/Music');

// Aqui ficam os comandos relacionados a musicas
const musicCommands = (msg) => {
    // eslint-disable-next-line
    const [comando_recebido, ...resto] = msg.content.split(' ');
    // eslint-disable-next-line
    switch (comando_recebido) {
        // eslint-disable-next-line
        case `${prefix}play`:
            console.log('Chamou Switch case PLAY');
            musicPlay(msg);
            break;
        case `${prefix}pause`:
            musicPause(msg);
            break;
        case `${prefix}resume`:
            musicResume(msg);
            break;
        case `${prefix}skip`:
            musicSkip(msg);
            break;
        case `${prefix}reset`:
            musicReset(msg);
            break;
        case `${prefix}list`:
            musicList(msg);
            break;
        default:
    }
};

module.exports = {
    musicCommands,
};
