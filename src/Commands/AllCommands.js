const { prefix } = require('../global');
const { commandsVoice } = require('./CommandsVoice');
const { help } = require('../Functions/Help/Help');

// Aqui ficam todos os comandos
const AllCommands = async (msg) => {
    if (!msg.guild) return;
    if (!msg.content.startsWith(prefix)) return;
    help(msg);
    commandsVoice(msg);
};

module.exports = {
    AllCommands,
};
