import { ArtigoEdicaoDto } from '../../pages/dashboard/business/model/dtos/artigoEdicaoDto';
import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { TemaDto } from 'src/app/pages/dashboard/business/model/dtos/temaDto';

@Injectable({
  providedIn: 'root',
})
export class DexieService {
  public db: Dexie;
  // public tabelaArtigoEdicao: Dexie.Table<ArtigoEdicaoDto,  any> = null;
  // public tabelaTemas: Dexie.Table<Tema, Tema> = null;
  public tabelaTemasDto: Dexie.Table<TemaDto, TemaDto> = null;

  constructor() {
    this.iniciarIndexedDb();
  }

  private iniciarIndexedDb() {
    try {
      this.db = new Dexie('wiki');

      // this.db.version(1).stores({
      //     artigoEdicao: '++id, edicaoId, edicaoConteudo, edicaoData, reponsavelEmail, artigoId, artigoTitulo, artigoDescricao, temaId, temaTitulo'
      // });

      // this.db.version(1).stores({
      //   tema: 'id, titulo, artigos'
      // })
      this.db.version(1).stores({
        temaDto: 'id, titulo, artigos, dataUltimaEdicao, autorUltimaEdicao',
      });
    } catch (error) {
      (error);
    }

    //this.tabelaArtigoEdicao = this.db.table('artigoEdicao');
    // this.tabelaTemas = this.db.table('tema');
    this.tabelaTemasDto = this.db.table('temaDto');
  }

  // async salvarArtigoEdicao(artigoEdicao: ArtigoEdicaoDto){
  //     try {
  //         await this.db.open();
  //         await this.tabelaArtigoEdicao.add(artigoEdicao)
  //         .then(response => (response))
  //         .catch(error => (error))
  //     } catch (error) {
  //         (error)
  //     }
  // }

  // async salvarTemas(temas: Tema[]){
  //     try {
  //       if(temas.length > 0){
  //         await this.db.open();
  //         this.tabelaTemas.clear();
  //         await this.tabelaTemas.bulkAdd(temas)
  //         .then(response => (response))
  //         .catch(error => (error))
  //       }
  //     } catch (error) {
  //         (error)
  //     }
  // }

  async salvarTemasDto(temasDto: TemaDto[]) {
    try {
      if (temasDto.length > 0) {
        await this.db.open();
        this.tabelaTemasDto.clear();
        await this.tabelaTemasDto
          .bulkAdd(temasDto)
          .then((response) => (response))
          .catch((error) => (error));
      }
    } catch (error) {
      (error);
    }
  }

  async retornaTemaPorIndexId(idParam: any) {
    try {
      await this.db.open();
      // let intId = parseInt(idParameter);
      return await this.tabelaTemasDto
        .where({'id': idParam})
        .first()
        .then((response) => {

          let temaDto: TemaDto = Object.assign({}, new TemaDto(), response);
          return temaDto;
        })
        .catch((error) => (error));
    } catch (error) {
      (error);
    }
  }

  // async retornaArtigoEdicaoPorIndexId(id: string){
  //     try {
  //         await this.db.open()
  //         let intId = parseInt(id);
  //         return await this.tabelaArtigoEdicao.get(intId)
  //         .then(response => {
  //             let artigoEdicao: ArtigoEdicaoDto = Object.assign({}, new ArtigoEdicaoDto(), response)
  //             return artigoEdicao;
  //         })
  //         .catch(error => (error))

  //     } catch (error) {
  //         (error)
  //     }
  // }

  // async retornaArtigoEdicaoPorArtigoId(id: string){
  //     try {
  //         await this.db.open()
  //         let intId = parseInt(id);
  //         return await this.tabelaArtigoEdicao.get({artigoId: id})
  //         .then(response => {
  //             let artigoEdicao: ArtigoEdicaoDto = Object.assign({}, new ArtigoEdicaoDto(), response)
  //             return artigoEdicao;
  //         })
  //         .catch(error => (error))

  //     } catch (error) {
  //         (error)
  //     }
  // }

  // async atualizarArtigoEdicao(artigoEdicao: ArtigoEdicaoDto){
  //     try{
  //         await this.db.open()
  //         let artigoId = artigoEdicao.artigoId.toString()
  //         await this.tabelaArtigoEdicao.where(':id').equals(2).modify(x => {
  //             x.edicaoId = artigoEdicao.edicaoId
  //             x.edicaoConteudo = artigoEdicao.edicaoConteudo;
  //             x.edicaoData = artigoEdicao.edicaoData;
  //             x.reponsavelEmail = artigoEdicao.reponsavelEmail
  //             x.artigoId = artigoEdicao.artigoId
  //             x.artigoTitulo = artigoEdicao.artigoTitulo;
  //             x.temaTitulo = artigoEdicao.temaTitulo
  //             x.temaId = artigoEdicao.temaId
  //           }).catch(error => {
  //             console.error(error)
  //           })
  //     }catch(error){
  //         (error)
  //     }
  // }

  // async atualizarArtigoEdicao(artigoEdicao: ArtigoEdicaoDto){
  //     try{
  //         await this.db.open()
  //         let artigoId = artigoEdicao.artigoId.toString()
  //         await this.tabelaArtigoEdicao.update(
  //             2,
  //             {   edicaoId: artigoEdicao.artigoId,
  //                 edicaoConteudo: artigoEdicao.edicaoConteudo,
  //                 edicaoData: artigoEdicao.edicaoData,
  //                 reponsavelEmail: artigoEdicao.reponsavelEmail,
  //                 artigoId: artigoEdicao.artigoId,
  //                 artigoTitulo: artigoEdicao.artigoTitulo,
  //                 temaTitulo: artigoEdicao.temaTitulo,
  //                 temaId: artigoEdicao.temaId
  //             }

  //         ).then((updated) => {
  //             if(updated)
  //                 ("atualizarArtigoEdicao salvo com sucesso")
  //             else
  //                 ("atualizarArtigoEdicão erro ao salvar")
  //         })
  //           .catch(error => (error))

  //     }catch(error){
  //         (error)
  //     }
  // }

  // async atualizarArtigoEdicaoHome(artigoEdicao: ArtigoEdicaoDto){
  //     try{
  //         await this.db.open()
  //         let artigoId = artigoEdicao.artigoId.toString()
  //         await this.tabelaArtigoEdicao.where(':id').equals(1).modify(x => {
  //             x.edicaoId = artigoEdicao.edicaoId
  //             x.edicaoConteudo = artigoEdicao.edicaoConteudo;
  //             x.edicaoData = artigoEdicao.edicaoData;
  //             x.reponsavelEmail = artigoEdicao.reponsavelEmail
  //             x.artigoId = artigoEdicao.artigoId
  //             x.artigoTitulo = artigoEdicao.artigoTitulo;
  //             x.temaTitulo = artigoEdicao.temaTitulo
  //             x.temaId = artigoEdicao.temaId
  //           }).catch(error => {
  //             console.error(error)
  //           })
  //     }catch(error){
  //         (error)
  //     }
  // }

  // async salvarIndexedDbArtigoTema(tema: Tema){
  //     try {
  //         await this.tabelaTemas.add(tema)
  //     } catch (error) {
  //         (error)
  //     }

  // }

  // async retornaUltimoArtigo(){
  //     try {
  //         let artigoEdicao: ArtigoEdicaoDto = await this.tabelaArtigoEdicao.orderBy('id').last();
  //         return artigoEdicao;
  //     } catch (error) {
  //         (error)
  //     }
  // }

  // async listarTemas(){
  //     try {
  //         return await this.tabelaTemas.toArray();
  //     } catch (error) {
  //         (error)
  //     }
  // }
}
