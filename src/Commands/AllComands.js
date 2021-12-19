const { prefix } = require('../global');
const { servers } = require('../Functions/Server/Server');
const { EmbedUser } = require('../Components/Embed/EmbedUser');
const { EmbedListHelp, EmbedListMusic } = require('../Components/Embed/EmbedListCommands');
const { MusicComands } = require('./MusicComands');
const { resetVariaveis, EmbedUserObj } = require('../global');

const AllComands = async (msg) => {
    if (!msg.guild) return;
    if (!msg.content.startsWith(prefix)) return;
    if (!msg.member.voice.channel) {
        EmbedUser(
            msg,
            (EmbedUserObj.title = 'Comando Invalido'),
            (EmbedUserObj.description = `O comando ${msg.content}: necessita que você esteja em um canal de voz!`),
        );
        return;
    }
    MusicComands(msg);
    if (msg.content === `${prefix}join`) {
        servers[msg.guild.id].connection = await msg.member.voice.channel.join();
    }
    if (msg.content === `${prefix}leave`) {
        msg.member.voice.channel.leave();
        resetVariaveis(msg);
    }
    if (msg.content === `${prefix}tassinari`) {
        msg.reply('https://cdn.discordapp.com/attachments/693977565404069948/920482277908152402/Design_sem_nome.mp4');
    }
    if (msg.content === `${prefix}mikakuke`) {
        msg.reply('https://cdn.discordapp.com/attachments/839138493623042128/917925019210899506/mikakuefidumactua.mp4');
    }
    if (msg.content === `${prefix}help`) {
        EmbedListHelp(msg);
    }
    if (msg.content === `${prefix}commandsmusic`) {
        EmbedListMusic(msg);
    }
};

module.exports = {
    AllComands,
};
