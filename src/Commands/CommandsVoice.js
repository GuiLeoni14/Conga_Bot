const { prefix } = require('../global');
const { servers } = require('../Functions/Server/Server');
const { MusicCommands } = require('./MusicCommands');
const { EmbedUserErr } = require('../Components/Embed/EmbedUser');
const { resetVariaveis } = require('../global');
const { VoiceChannel } = require('../Functions/VoiceChannel/VoiceChannel');
const { Help } = require('../Functions/Help/Help');

// Aqui ficam os comandos que necessitam ao usuário estar em um canal de voz
const CommandsVoice = async (msg) => {
    if (!msg.member.voice.channel) {
        console.log('If do voice');
        EmbedUserErr(
            msg,
            'Comando Invalido',
            `O comando ${msg.content}: necessita que você esteja em um canal de voz!`,
        );
        return;
    }
    MusicCommands(msg);
    VoiceChannel(msg);
};

module.exports = {
    CommandsVoice,
};
