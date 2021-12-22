const { embedListHelp, embedListMusic } = require('../../Components/Embed/EmbedListCommands');
const { prefix } = require('../../global');

const help = (msg) => {
    if (msg.content === `${prefix}help`) {
        embedListHelp(msg);
    }
    if (msg.content === `${prefix}music`) {
        embedListMusic(msg);
    }
};

module.exports = {
    help,
};
