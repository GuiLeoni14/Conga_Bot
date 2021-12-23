const { youtube } = require('../../global');

const searchYoutube = ({ q, part, fields, type }) =>
    new Promise((resolve, reject) => {
        youtube.search.list({ q, part, fields, type }, (err, result) => {
            if (err) {
                reject(err);
            }
            resolve(result);
        });
    });

const searchYoutubeMusic = async (musica) => {
    try {
        // const musicaTocar = musica.slice(6);
        let musicaTocar = '';
        if (musica.includes('https://www.youtube.com/watch?v=')) {
            musicaTocar = `https://youtu.be/${musica.slice(-11)}`;
        } else {
            musicaTocar = musica;
        }
        console.log(`Musica tovar${musicaTocar}`);
        const result = await searchYoutube({
            q: musicaTocar,
            part: 'snippet',
            fields: 'items(id(videoId), snippet(title, channelTitle, thumbnails(default(url))))',
            type: 'video',
        });
        const montaItem = {
            // eslint-disable-next-line
                'tituloVideo': result.data.items[0].snippet.title,
            // eslint-disable-next-line
                'nomeCanal': result.data.items[0].snippet.channelTitle,
            // eslint-disable-next-line
                'id': `https://www.youtube.com/watch?v=${result.data.items[0].id.videoId}`,
            // eslint-disable-next-line
                'thumb': result.data.items[0].snippet.thumbnails.default.url,
        };
        return montaItem;
    } catch (err) {
        return err;
    }
};

module.exports = {
    searchYoutubeMusic,
};
