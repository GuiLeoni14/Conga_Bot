const { EmbedListHelp, EmbedListMusic } = require('../../Components/Embed/EmbedListCommands');
const { prefix } = require('../../global');

const Help = (msg) => {
    if (msg.content === `${prefix}help`) {
        EmbedListHelp(msg);
    }
    if (msg.content === `${prefix}music`) {
        EmbedListMusic(msg);
    }
};

module.exports = {
    Help,
};
