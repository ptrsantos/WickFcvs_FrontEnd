import { Injectable } from '@angular/core';
import { ArtigoEdicaoDto } from 'src/app/pages/dashboard/business/model/dtos/artigoEdicaoDto';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  public sessionStorageObterUsuario(): any {
    return JSON.parse(sessionStorage.getItem('usuario'));
  }

  public sessionStorageSalvarDadosUsuario(data: any) {
    this.sessionStorageSalvarTokenUsuario(data.accessToken);
    this.sessionStorageSalvarUsuario(data.userToken);
  }

  public sessionStorageLimparDadosLocaisUsuario() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('usuario')
  }

  public sessionStorageObterTokenUsuario(): string {
    return sessionStorage.getItem('token');
  }

  public sessionStorageSalvarTokenUsuario(token: string) {
    sessionStorage.setItem('token', token)
  }

  public sessionStorageSalvarUsuario(user: string) {
    sessionStorage.setItem('usuario', JSON.stringify(user));
  }

  public sessionStorageUsuarioLogado(){
    if(this.sessionStorageObterTokenUsuario().length > 0){
      return true
    }else{
      return false
    }
  }

  public sessionStorageSalvarArtigoEdicao(dados: any) {
    let objJson = JSON.stringify(dados)
    this.sessionStorageExcluirArtigoEdicao();
    sessionStorage.setItem('artigoEdicao', objJson);
  }

  public sessionStorageObterArtigoEdicao(): string {
    return sessionStorage.getItem('artigoEdicao');
  }

  public sessionStorageObterObjetoArtigoEdicao(): ArtigoEdicaoDto {
    let artigoEdicaoAux = JSON.parse(sessionStorage.getItem('artigoEdicao'))
    let artigoEdicao: ArtigoEdicaoDto = Object.assign({}, new ArtigoEdicaoDto, artigoEdicaoAux)
    return artigoEdicao;
  }

  public sessionStorageAtualizarArtigoEdicao(dados: any) {
    this.sessionStorageExcluirArtigoEdicao()
    this.sessionStorageSalvarArtigoEdicao(dados)
  }

  public sessionStorageExcluirArtigoEdicao() {
    sessionStorage.removeItem('artigoEdicao');
  }

  public sessionStorageSalvarArtigoEdicaoHome(dados: any) {
    let objJson = JSON.stringify(dados)
    this.sessionStorageExcluirArtigoEdicao();
    sessionStorage.setItem('artigoEdicaoHome', objJson);
  }

  public sessionStorageObterArtigoEdicaoHome(): string {
    return sessionStorage.getItem('artigoEdicaoHome');
  }

  public sessionStorageObterObjetoArtigoEdicaoHome(): ArtigoEdicaoDto {
    let artigoEdicaoAux = JSON.parse(sessionStorage.getItem('artigoEdicaoHome'))
    let artigoEdicao: ArtigoEdicaoDto = Object.assign({}, new ArtigoEdicaoDto, artigoEdicaoAux)
    return artigoEdicao;
  }

    public sessionStorageAtualizarArtigoEdicaoHome(dados: any) {
    this.sessionStorageExcluirArtigoEdicao()
    this.sessionStorageSalvarArtigoEdicao(dados)
  }

  public sessionStorageSalvarUltimaUrl(token: string) {
    sessionStorage.setItem('ultimaUrl', token)
  }

  public sessionStorageRetornaUltimaUrl() {
    return sessionStorage.getItem('ultimaUrl');
  }

  public sessionStorageSalvarUltimoId(token: string) {
    sessionStorage.setItem('ultimoId', token)
  }

  public sessionStorageRetornaUltimoId() {
    return sessionStorage.getItem('ultimoId');
  }

}
