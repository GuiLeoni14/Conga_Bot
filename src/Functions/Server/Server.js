const fs = require('fs');

const servers = [];

const loadServers = () => {
    console.log('Carregando servidores');
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
            console.log('Salvando novo servidor');
            const objLe = JSON.parse(data);
            objLe.servers.push(idNovoServidor);
            const objEscreve = JSON.stringify(objLe);
            fs.writeFile('serverList.json', objEscreve, 'utf8', () => {});
        }
    });
};

module.exports = {
    loadServers,
    saveServer,
    servers,
};
