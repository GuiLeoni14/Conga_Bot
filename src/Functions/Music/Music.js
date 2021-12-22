const { servers } = require('../Server/Server');
const { ytdl, youtube, Discord } = require('../../global');
const { configs } = require('../../global');
const { EmbedUserErr } = require('../../Components/Embed/EmbedUser');
const {
    EmbedMusicErr,
    EmbedMusicAdd,
    EmbedMusicList,
    EmbedMusicTocando,
} = require('../../Components/Embed/EmbedMusic');

const tocaMusicas = (msg) => {
    if (servers[msg.guild.id].estouTocando === false) {
        const tocando = servers[msg.guild.id].fila[0];
        console.log(`Musica que estou tocando: ${tocando}`);
        EmbedMusicTocando(msg, servers[msg.guild.id].fila[0]);
        servers[msg.guild.id].estouTocando = true;
        servers[msg.guild.id].dispatcher = servers[msg.guild.id].connection.play(ytdl(tocando, configs.YTDLOP));
        servers[msg.guild.id].dispatcher.on('finish', () => {
            servers[msg.guild.id].fila.shift();
            servers[msg.guild.id].estouTocando = false;
            if (servers[msg.guild.id].fila.length > 0) {
                console.log('Tem outra musica, tentando tocar');
                tocaMusicas(msg);
            } else {
                servers[msg.guild.id].dispatcher = null;
            }
        });
    } else {
        console.log('Estou tocando esta True');
    }
};

const MusicPlay = async (msg) => {
    console.log('Chamou MusicPlay');
    const musicaTocar = msg.content.slice(6);
    if (musicaTocar.length === 0) {
        EmbedMusicErr(
            msg,
            `Comando Invalido: ${msg.content}`,
            `Você não informou nada para tocar: ${msg.content} não disponível!`,
        );
        return;
    }
    if (servers[msg.guild.id].connection === null) {
        try {
            servers[msg.guild.id].connection = await msg.member.voice.channel.join();
        } catch (err) {
            console.log(`Erro:${err}`);
        }
    }
    if (ytdl.validateURL(musicaTocar)) {
        try {
            servers[msg.guild.id].fila.push(musicaTocar);
            console.log(`Adicionado: ${musicaTocar}`);
            tocaMusicas(msg);
        } catch (err) {
            console.log(`Erro:${err}`);
        }
    } else {
        youtube.search.list(
            {
                q: musicaTocar,
                part: 'snippet',
                fields: 'items(id(videoId), snippet(title, channelTitle, thumbnails(default(url))))',
                type: 'video',
            },
            async (err, result) => {
                if (err) {
                    console.log(err);
                }
                if (result) {
                    const listaResultados = [];
                    // eslint-disable-next-line
                    for (let i in result.data.items) {
                        const montaItem = {
                            // eslint-disable-next-line
                            'tituloVideo': result.data.items[i].snippet.title,
                            // eslint-disable-next-line
                            'nomeCanal': result.data.items[i].snippet.channelTitle,
                            // eslint-disable-next-line
                            'id': `https://www.youtube.com/watch?v=${result.data.items[i].id.videoId}`,
                            // eslint-disable-next-line
                            'thumb': result.data.items[i].snippet.thumbnails.default.url,
                        };
                        listaResultados.push(montaItem);
                    }
                    const embed = new Discord.MessageEmbed()
                        .setColor([16, 6, 224])
                        .setAuthor('CongaBot - @gui_leoni14')
                        .setDescription('Escolha sua música 1 - 5');
                    // eslint-disable-next-line
                    for (let i in listaResultados) {
                        embed.addField(
                            `${Number(i) + 1}: ${listaResultados[i].tituloVideo}`,
                            listaResultados[i].nomeCanal,
                        );
                    }
                    msg.channel.send(embed).then((embedMessage) => {
                        const possiveisReacoes = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣'];
                        // eslint-disable-next-line
                        for (let i = 0; i < possiveisReacoes.length; i++) {
                            embedMessage.react(possiveisReacoes[i]);
                        }
                        const filter = (reaction, user) => {
                            return possiveisReacoes.includes(reaction.emoji.name) && user.id === msg.author.id;
                        };
                        embedMessage
                            .awaitReactions(filter, { max: 1, time: 20000, erros: ['time'] })
                            .then((collected) => {
                                const reaction = collected.first();
                                const idOpcEscolhida = possiveisReacoes.indexOf(reaction.emoji.name);
                                EmbedMusicAdd(
                                    msg,
                                    listaResultados[idOpcEscolhida].tituloVideo,
                                    listaResultados[idOpcEscolhida].nomeCanal,
                                    listaResultados[idOpcEscolhida].thumb,
                                );
                                servers[msg.guild.id].fila.push(listaResultados[idOpcEscolhida].id);
                                console.log(servers[msg.guild.id].fila);
                                tocaMusicas(msg);
                            })
                            .catch((erro) => {
                                msg.reply('Hum... parece que você não escolheu uma opção válida');
                                console.log(erro);
                            });
                    });
                }
            },
        );
    }
};

const MusicPause = (msg) => {
    if (!servers[msg.guild.id].estouTocando) {
        EmbedMusicErr(
            msg,
            `Comando Invalido: ${msg.content}`,
            `Nenhuma musica está sendo tocada no momento: ${msg.content} não disponível!`,
        );
        return;
    }
    servers[msg.guild.id].dispatcher.pause();
};

const MusicResume = (msg) => {
    if (!servers[msg.guild.id].estouTocando) {
        EmbedMusicErr(
            msg,
            `Comando Invalido: ${msg.content}`,
            `Nenhuma musica está sendo tocada no momento: ${msg.content} não disponível!`,
        );
        return;
    }
    servers[msg.guild.id].dispatcher.resume();
};

const MusicSkip = (msg) => {
    if (msg.member.voice.channel.id !== msg.guild.me.voice.channel.id) {
        EmbedMusicErr(
            msg,
            `Comando Invalido: ${msg.content}`,
            `Você não está no mesmo canal de voz do bot: ${msg.content} não disponível!`,
        );
        return;
    }
    console.log(`Musicas na Fila:${servers[msg.guild.id].fila}`);
    if (servers[msg.guild.id].fila.length > 1) {
        servers[msg.guild.id].estouTocando = false;
        servers[msg.guild.id].fila.shift();
        console.log('estou no skip');
        tocaMusicas(msg);
    } else if (servers[msg.guild.id].fila.length === 1) {
        EmbedMusicErr(
            msg,
            `Comando Invalido: ${msg.content}`,
            `Existe apenas uma musica na fila: ${msg.content} não disponível!`,
        );
    } else {
        EmbedMusicErr(
            msg,
            `Comando Invalido: ${msg.content}`,
            `Não existe músicas na fila: ${msg.content} não disponível!`,
        );
    }
};

const MusicReset = (msg) => {
    servers[msg.guild.id].fila = [];
    servers[msg.guild.id].estouTocando = false;
    tocaMusicas(msg);
    // servers[msg.guild.id].fila.splice(0, servers[msg.guild.id].fila.length);
    // servers[msg.guild.id].estouTocando = false;
    // servers[msg.guild.id].dispatcher = null;
    console.log('Resetado');
};

const MusicList = (msg) => {
    if (servers[msg.guild.id].fila.length <= 0) {
        EmbedMusicErr(
            msg,
            `Comando Invalido: ${msg.content}`,
            `Não existe músicas na lista: ${msg.content} não disponível!`,
        );
        return;
    }
    EmbedMusicList(msg, servers[msg.guild.id].fila);
};

module.exports = {
    tocaMusicas,
    MusicPlay,
    MusicPause,
    MusicResume,
    MusicSkip,
    MusicReset,
    MusicList,
};
