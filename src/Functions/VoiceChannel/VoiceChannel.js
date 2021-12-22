const { prefix } = require('../../global');
const { servers } = require('../Server/Server');
const { resetVariaveis } = require('../../global');

const voiceChannel = async (msg) => {
    if (msg.content === `${prefix}join`) {
        servers[msg.guild.id].connection = await msg.member.voice.channel.join();
    }
    if (msg.content === `${prefix}leave`) {
        msg.member.voice.channel.leave();
        resetVariaveis(msg);
    }
};

module.exports = {
    voiceChannel,
};
