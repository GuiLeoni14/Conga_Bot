const { MessageEmbed } = require('discord.js');

// inside a command, event listener, etc.
const EmbedListHelp = (msg) => {
    try {
        const EmbedMessageListHelp = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`Olá ${msg.author.username}, seja bem-vindo a sessão de comandos`)
            .setDescription('Aqui estão listados todos os comandos do bot')
            .setThumbnail(`${msg.author.displayAvatarURL({ size: 1024 })}`)
            .addFields(
                { name: '#music', value: 'Lista todos os comandos relacionados a músicas' },
                { name: '#admin', value: 'Lista todos os comandos de administradores' },
            )
            .setTimestamp()
            .setFooter('Criador: @gui_leoni14')
            .setURL('https://github.com/GuiLeoni14/');
        msg.channel.send(EmbedMessageListHelp);
    } catch (err) {
        console.log(`Erro no embed${err}`);
    }
};

const EmbedListMusic = (msg) => {
    try {
        const EmbedMessageListMusic = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`Olá ${msg.author.username}, seja bem-vindo a sessão de comandos das musicas`)
            .setDescription('Aqui estão listados todos os comandos relacionados a músicas do bot')
            .setThumbnail(`${msg.author.displayAvatarURL({ size: 1024 })}`)
            .addFields(
                { name: '#play', value: 'Toca a música desejada [pelo link || pelo nome]' },
                { name: '#skip', value: 'Toca a próxima música da lista' },
                { name: '#pause', value: 'Pausa a música que está tocando no momento' },
                { name: '#resume', value: 'Volta a tocar a música que estava pausada' },
            )
            .setTimestamp()
            .setFooter('Criador: @gui_leoni14')
            .setURL('https://github.com/GuiLeoni14/');
        msg.channel.send(EmbedMessageListMusic);
    } catch (err) {
        console.log(`Erro no embed${err}`);
    }
};

module.exports = {
    EmbedListHelp,
    EmbedListMusic,
};
