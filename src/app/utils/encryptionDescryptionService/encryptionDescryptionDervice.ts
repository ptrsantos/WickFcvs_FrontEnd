import { ArtigoEdicaoDto } from '../../pages/dashboard/business/model/dtos/artigoEdicaoDto';
import { Injectable } from '@angular/core';
import { SessionStorageService } from '../sessionStorage/import { Injectable } from \'@angular/sessionStorageService';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class EncryptionDescryptionService extends SessionStorageService {

  constructor() {
    super();
  }

  public SalvarArtigoEdicaoEncriptado(artigo: string) {
    try {
      let chave = this.sessionStorageObterUsuario().id;
      let data = CryptoJS.AES.encrypt(artigo, chave.trim());
      this.sessionStorageSalvarArtigoEdicao(data);
    } catch (e) {
      console.log("Erro ao encriptar: ", e)
    }
  }
  public ObterArtigoEdicaoDesencriptado(): ArtigoEdicaoDto {
    try {
      let artigoEdicao: ArtigoEdicaoDto = null
      let chave = this.sessionStorageObterUsuario().id;
      let artigoEdicaoJson = this.sessionStorageObterArtigoEdicao();

      if(artigoEdicaoJson.length > 0){
        let bytes = CryptoJS.AES.decrypt(artigoEdicaoJson, chave.trim());
        let conferencia = bytes.toString(CryptoJS.enc.Utf8)
        let dados = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        artigoEdicao = Object.assign({}, new ArtigoEdicaoDto(), dados);
      }
      return artigoEdicao;
    }
    catch (e) {
      console.log("Erro ao encriptar: ", e)
    }
  }
  public ExluirArtigoEdicaoEncriptado() {
    this.sessionStorageExcluirArtigoEdicao()
  }


}
