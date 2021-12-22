require('dotenv').config();
const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const google = require('googleapis');
const fs = require('fs');
const configs = require('../config.json');
const { servers } = require('./Functions/Server/Server');
const { embedUserErr } = require('./Components/Embed/EmbedUser');

const cliente = new Discord.Client();
const prefix = configs.PREFIX;
const TOKKEN = process.env.TOKEN_DISCORD;
const youtube = new google.youtube_v3.Youtube({
    version: 'v3',
    auth: process.env.GOOGLE_KEY,
});
const resetVariaveis = (msg) => {
    servers[msg.guild.id].connection = null;
    servers[msg.guild.id].dispatcher = null;
    servers[msg.guild.id].fila = [];
    servers[msg.guild.id].estouTocando = false;
};

const requiredVoiceChannel = (msg) => {
    if (!msg.member.voice.channel) {
        console.log('If do voice');
        embedUserErr(
            msg,
            'Comando Invalido',
            `O comando ${msg.content}: necessita que você esteja em um canal de voz!`,
        );
    }
};

module.exports = {
    Discord,
    ytdl,
    google,
    fs,
    configs,
    cliente,
    prefix,
    youtube,
    resetVariaveis,
    TOKKEN,
    requiredVoiceChannel,
};
