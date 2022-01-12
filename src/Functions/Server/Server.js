const fs = require('fs');

const servers = [];

const loadServers = () => {
    console.log('Carregando servidores');
    return new Promise((resolve, reject) => {
        fs.readFile('serverList.json', 'utf8', (err, data) => {
            if (err) {
                console.log(`ocorreu um erro ao tentar ler os registros no serverList.json${err}`);
                reject(err);
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
                resolve();
            }
        });
    });
};

const saveServer = (idNovoServidor) => {
    return new Promise((resolve, reject) => {
        fs.readFile('serverList.json', 'utf8', (err, data) => {
            if (err) {
                console.log(`occoreu um erro ao tentar ler um arquivo para salvar no serverList.json${err}`);
                reject(err);
            } else {
                console.log('Salvando novo servidor');
                const objLe = JSON.parse(data);
                objLe.servers.push(idNovoServidor);
                const objEscreve = JSON.stringify(objLe);
                fs.writeFile('serverList.json', objEscreve, 'utf8', () => {});
                resolve();
            }
        });
    });
};

const searchServer = async (idServidor) => {
    return new Promise((resolve, reject) => {
        fs.readFile('serverList.json', 'utf8', async (err, data) => {
            console.log('Procurando servidor');
            if (err) {
                console.log(`ocorreu um erro ao tentar ler os registros no serverList.json${err}`);
                reject(err);
            } else {
                const objLe = JSON.parse(data);
                // eslint-disable-next-line
                if (!objLe.servers.includes(idServidor)){
                    console.log('Não tem esse servidor, tentando salvar');
                    await saveServer(idServidor);
                    await loadServers();
                }
                resolve();
            }
        });
    });
};

module.exports = {
    loadServers,
    saveServer,
    searchServer,
    servers,
};
