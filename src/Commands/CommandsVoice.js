const { musicCommands } = require('./MusicCommands');
const { embedUserErr } = require('../Components/Embed/EmbedUser');
const { voiceChannel } = require('../Functions/VoiceChannel/VoiceChannel');

// Aqui ficam os comandos que necessitam ao usuário estar em um canal de voz
const commandsVoice = async (msg) => {
    const [command, ...resto] = msg.content.split(' ');
    const voiceCommands = ['#play', '#skip', '#resume', '#pause', '#list', '#reset', '#join', '#leave'];
    if (!msg.member.voice.channel && voiceCommands.includes(command)) {
        embedUserErr(
            msg,
            'Comando Invalido',
            `O comando ${msg.content}: necessita que você esteja em um canal de voz!`,
        );
        return;
    }
    musicCommands(msg);
    voiceChannel(msg);
};

module.exports = {
    commandsVoice,
};
