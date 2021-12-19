const { MessageEmbed } = require('discord.js');

// inside a command, event listener, etc.
const EmbedUser = (msg, title, description) => {
    try {
        const EmbedMessageUser = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`${title}`)
            .setDescription(`${description}`)
            .setThumbnail(`${msg.author.displayAvatarURL({ size: 1024 })}`)
            .setTimestamp()
            .setFooter('Criador: @gui_leoni14')
            .setURL('https://github.com/GuiLeoni14/');
        msg.channel.send(EmbedMessageUser);
    } catch (err) {
        console.log(`Erro no embed${err}`);
    }
};

module.exports = {
    EmbedUser,
};
