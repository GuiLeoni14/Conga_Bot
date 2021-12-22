const { prefix, RequiredVoiceChannel } = require('../global');
const { EmbedUserErr } = require('../Components/Embed/EmbedUser');
const { servers } = require('../Functions/Server/Server');
const { MusicPlay, MusicSkip, MusicReset, MusicPause, MusicResume, MusicList } = require('../Functions/Music/Music');

// Aqui ficam os comandos relacionados a musicas
const MusicCommands = (msg) => {
    // eslint-disable-next-line
    const [comando_recebido, ...resto] = msg.content.split(' ');
    // eslint-disable-next-line
    switch (comando_recebido) {
        // eslint-disable-next-line
        case `${prefix}play`:
            console.log('Chamou Switch case PLAY');
            MusicPlay(msg);
            break;
        case `${prefix}pause`:
            MusicPause(msg);
            break;
        case `${prefix}resume`:
            MusicResume(msg);
            break;
        case `${prefix}skip`:
            MusicSkip(msg);
            break;
        case `${prefix}reset`:
            MusicReset(msg);
            break;
        case `${prefix}list`:
            MusicList(msg);
            break;
        default:
    }
};

module.exports = {
    MusicCommands,
};
