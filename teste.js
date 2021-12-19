// eslint-disable-next-line
const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const google = require('googleapis');
const fs = require('fs');
const configs = require('./config.json');

const cliente = new Discord.Client();
const prefix = configs.PREFIX;
const youtube = new google.youtube_v3.Youtube({
    version: 'v3',
    auth: configs.GOOGLE_KEY,
});

const servers = [];
const loadServers = () => {
    fs.readFile('serverList.json', 'utf8', (err, data) => {
        if (err) {
            console.log(`ocorreu um erro ao tentar ler os registros no serverList.json${err}`);
        } else {
            const objLe = JSON.parse(data);
            // eslint-disable-next-line
            for (let i in objLe.servers) {
                servers[objLe.servers[i]] = {
                    connection: null,
                    dispatcher: null,
                    fila: [],
                    estouTocando: false,
                };
            }
        }
    });
};
const saveServer = (idNovoServidor) => {
    fs.readFile('serverList.json', 'utf8', (err, data) => {
        if (err) {
            console.log(`occoreu um erro ao tentar ler um arquivo para salvar no serverList.json${err}`);
        } else {
            const objLe = JSON.parse(data);
            objLe.servers.push(idNovoServidor);
            const objEscreve = JSON.stringify(objLe);
            fs.writeFile('serverList.json', objEscreve, 'utf8', () => {});
        }
    });
};
cliente.on('guildCreate', (guild) => {
    servers[guild.id] = {
        connection: null,
        dispatcher: null,
        fila: [],
        estouTocando: false,
    };
    saveServer(guild.id);
});

cliente.on('ready', () => {
    loadServers();
    console.log('Estou ligado');
});

const tocaMusicas = (msg) => {
    if (servers[msg.guild.id].estouTocando === false) {
        const tocando = servers[msg.guild.id].fila[0];
        console.log(tocando);
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

cliente.on('message', async (msg) => {
    if (!msg.guild) return;
    if (!msg.content.startsWith(prefix)) return;
    if (!msg.member.voice.channel) {
        msg.channel.send('Você precisa estar em um canal de voz');
        return;
    }
    if (msg.content === `${prefix}join`) {
        servers[msg.guild.id].connection = await msg.member.voice.channel.join();
    }
    if (msg.content === `${prefix}leave`) {
        msg.member.voice.channel.leave();
        // lembrar de criar um função responsável pelo reset
        servers[msg.guild.id].connection = null;
        servers[msg.guild.id].dispatcher = null;
        servers[msg.guild.id].fila = [];
        servers[msg.guild.id].estouTocando = false;
    }
    if (msg.content.startsWith(`${prefix}play`)) {
        // eslint-disable-next-line
        let musicaTocar = msg.content.slice(6);
        if (musicaTocar.length === 0) {
            msg.channel.send('Ué, eu preciso de algo para tocar...');
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
                    fields: 'items(id(videoId), snippet(title, channelTitle))',
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
                                    msg.channel.send(
                                        `Musica escolhida: ${listaResultados[idOpcEscolhida].tituloVideo} de ${listaResultados[idOpcEscolhida].nomeCanal}`,
                                    );
                                    servers[msg.guild.id].fila.push(listaResultados[idOpcEscolhida].id);
                                    console.log(
                                        `Adicionado pelo nome: ${servers[msg.guild.id].fila.push(
                                            listaResultados[idOpcEscolhida].id,
                                        )}`,
                                    );
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
    }
    if (msg.content === `${prefix}pause`) {
        servers[msg.guild.id].dispatcher.pause();
    }
    if (msg.content === `${prefix}resume`) {
        servers[msg.guild.id].dispatcher.resume();
    }
    if (msg.content === `${prefix}skip`) {
        servers[msg.guild.id].dispatcher.skip();
    }
});

// eslint-disable-next-line
cliente.login(configs.TOKEN_DISCORD);