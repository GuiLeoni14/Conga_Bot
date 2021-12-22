const { prefix } = require('../global');
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
