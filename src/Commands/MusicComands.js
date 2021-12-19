const { prefix } = require('../global');
const { servers } = require('../Functions/Server/Server');
const { MusicPlay, MusicSkip, MusicReset, MusicPause, MusicResume, MusicList } = require('../Functions/Music/Music');

const MusicComands = (msg) => {
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
    MusicComands,
};
