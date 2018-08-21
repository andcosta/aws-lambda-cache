'use strict';

class DiskCache {
  constructor() {
    this._defaulExpiresAt = 5; // 5 Minutes.
  }

  set(key, value, expiresAtMinutes) {
    var payload = {
      expiresAt: new Date(new Date().getTime() + this._expiresAt(expiresAtMinutes) * 60000).getTime(),
      payload: value
    };

    fs.writeFileSync(`/tmp/${key}.json`, JSON.stringify(payload));
  }

  get(key) {
    var result = undefined;

    try {
      var item = fs.readFileSync(`/tmp/${key}.json`, 'utf8');

      if (item) {
        var jsonItem = JSON.parse(item);

        if (new Date().getTime() >= jsonItem.expiresAt) {
          this.remove(key);
          result = undefined;
        } else {
          result = jsonItem.payload;
        }
      }
    } catch (err) {
      result = undefined;
    }

    return result;
  }
}

module.exports = DiskCache;

/*

const fs = require('fs');

// EXISTE arquivo
          // ***
          var existeArquivo = fs.existsSync(`/tmp/${idCompany}.json`);
          arquivoTmp.existeArquivo = existeArquivo;

          var existeArquivo2 = fs.existsSync(`/tmp/xxx${idCompany}.json`);
          arquivoTmp.existeArquivo2 = existeArquivo2;

          // LÊ arquivo
          // ***
          var content = fs.readFileSync(`/tmp/${idCompany}.json`, 'utf8');
          arquivoTmp.arquivoLido2 = JSON.parse(content);

          // DELETE arquivo
          // ***
          await fs.unlink(`/tmp/1-${idCompany}.json`);
          await fs.unlink(`/tmp/3-${idCompany}.json`);

          // LIST arquivo
          // ***
          const listaFiles = [];
          fs.readdirSync('/tmp/').forEach(file => {
            listaFiles.push(file);
          });
          arquivoTmp.arquivoLista = listaFiles;

          // TODO:
          //
          // - informar o tamanho do diretório /temp/

          result.arquivoTmp = arquivoTmp;

          body = result;
          statusCode = result.statusCode;

*/
