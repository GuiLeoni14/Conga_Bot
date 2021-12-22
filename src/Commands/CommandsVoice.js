const { MusicCommands } = require('./MusicCommands');
const { EmbedUserErr } = require('../Components/Embed/EmbedUser');
const { VoiceChannel } = require('../Functions/VoiceChannel/VoiceChannel');

// Aqui ficam os comandos que necessitam ao usuário estar em um canal de voz
const CommandsVoice = async (msg) => {
    const [command, ...resto] = msg.content.split(' ');
    const voiceCommands = ['#play', '#skip', '#resume', '#pause', '#list', '#reset', '#join', '#leave'];
    if (!msg.member.voice.channel && voiceCommands.includes(command)) {
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
