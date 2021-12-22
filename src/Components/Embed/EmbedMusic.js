const { MessageEmbed } = require('discord.js');
const { searchYoutubeMusic } = require('../../Functions/Music/Youtube');

const embedMusicErr = (msg, title, description) => {
    const EmbedMessageMusicErr = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle(`${title}`)
        .setDescription(`${description}`)
        .setThumbnail(`${msg.author.displayAvatarURL({ size: 1024 })}`)
        .setTimestamp()
        .setFooter('Criador: @gui_leoni14')
        .setURL('https://github.com/GuiLeoni14/');
    msg.reply(EmbedMessageMusicErr);
};

const embedMusicAdd = (msg, title, nomeCanal, thumb) => {
    const EmbedMessageMusicAdd = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle(`Música Escolhida: ${title}`)
        .setAuthor(`${nomeCanal}`, `${thumb}`)
        .setThumbnail(`${thumb}`)
        .setTimestamp()
        .setFooter('Criador: @gui_leoni14')
        .setURL('https://github.com/GuiLeoni14/');
    msg.reply(EmbedMessageMusicAdd);
};

const embedMusicList = (msg, listMusic) => {
    const EmbedMessageMusicAdd = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Lista de Músicas')
        .setThumbnail(`${msg.author.displayAvatarURL({ size: 1024 })}`)
        .setTimestamp()
        .setFooter('Criador: @gui_leoni14')
        .setURL('https://github.com/GuiLeoni14/');
    // eslint-disable-next-line
    for (let c = 0; c < listMusic.length; c++) {
        const quantidadeMusicas = c + 1;
        EmbedMessageMusicAdd.setDescription(`Quantidade de musicas na lista: ${quantidadeMusicas}`);
        EmbedMessageMusicAdd.addField(`Música: ${quantidadeMusicas}`, listMusic[c]);
    }
    msg.reply(EmbedMessageMusicAdd);
};

const embedMusicTocando = async (msg, musica) => {
    const musicaAtributos = await searchYoutubeMusic(musica);
    const EmbedMessageMusicTocando = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle(`Começando a tocar: ${musicaAtributos.tituloVideo}`)
        .setAuthor(`Pedida por: ${msg.author.username}`, `${msg.author.displayAvatarURL({ size: 1024 })}`)
        .setThumbnail(`${musicaAtributos.thumb}`)
        .setTimestamp()
        .setFooter('Criador: @gui_leoni14')
        .setURL(`${musicaAtributos.id}`);
    msg.reply(EmbedMessageMusicTocando);
};

module.exports = {
    embedMusicErr,
    embedMusicAdd,
    embedMusicList,
    embedMusicTocando,
};
