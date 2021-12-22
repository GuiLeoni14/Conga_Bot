const { prefix } = require('../global');
const { servers } = require('../Functions/Server/Server');
const { MusicCommands } = require('./MusicCommands');
const { EmbedUserErr } = require('../Components/Embed/EmbedUser');
const { resetVariaveis } = require('../global');
const { VoiceChannel } = require('../Functions/VoiceChannel/VoiceChannel');
const { CommandsVoice } = require('./CommandsVoice');
const { Help } = require('../Functions/Help/Help');

// Aqui ficam todos os comandos
const AllCommands = async (msg) => {
    if (!msg.guild) return;
    if (!msg.content.startsWith(prefix)) return;
    Help(msg);
    CommandsVoice(msg);
};

module.exports = {
    AllCommands,
};
