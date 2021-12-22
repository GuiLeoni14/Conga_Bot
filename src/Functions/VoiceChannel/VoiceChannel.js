const { prefix } = require('../../global');
const { servers } = require('../Server/Server');
const { EmbedUserErr } = require('../../Components/Embed/EmbedUser');
const { resetVariaveis } = require('../../global');

const VoiceChannel = async (msg) => {
    if (msg.content === `${prefix}join`) {
        servers[msg.guild.id].connection = await msg.member.voice.channel.join();
    }
    if (msg.content === `${prefix}leave`) {
        msg.member.voice.channel.leave();
        resetVariaveis(msg);
    }
};

module.exports = {
    VoiceChannel,
};
