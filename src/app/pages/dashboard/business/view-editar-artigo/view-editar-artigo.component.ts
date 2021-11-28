import { ArtigoEdicaoDto } from '../model/dtos/artigoEdicaoDto';
import { Artigo } from '../model/entities/artigo';
import { async } from '@angular/core/testing';
import { _filter } from '../../../forms/auto-complete/states-group/states-group.component';
import { DexieService } from 'src/app/utils/dexieService/dexieService';
import { AppComponent } from 'src/app/app.component';
import { Component, Inject, OnInit, ViewChild, AfterViewInit, AfterContentInit, AfterViewChecked } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { InclusaoViewModel } from '../model/view-models/inclusaoViewModel';
import { EncryptionDescryptionService } from 'src/app/utils/encryptionDescryptionService/encryptionDescryptionDervice';
import { CkeditorComponent } from '../ckeditor/ckeditor.component';
import { templateSourceUrl } from '@angular/compiler';
import { LayoutComponent } from 'src/app/pages/layout/layout.component';
import { SessionStorageService } from 'src/app/utils/sessionStorage/import { Injectable } from \'@angular/sessionStorageService';
import { EdicaoViewModel } from '../model/view-models/edicaoViewModel';
import { ArtigoDto } from '../model/dtos/artigoDto';
import { Tema } from '../model/entities/tema';
import { Edicao } from '../model/entities/edicao';
import { EdicaoArtigoDto } from '../model/dtos/edicaoArtigoDto';
import { debug } from 'console';


@Component({
  selector: 'app-view-editar-artigo',
  templateUrl: './view-editar-artigo.component.html',
  styleUrls: ['./view-editar-artigo.component.scss']
})
export class ViewEditarArtigoComponent implements OnInit, AfterViewChecked {

  form: FormGroup
  @ViewChild('nameInput') valortInputTitulo: ElementRef;
  @ViewChild('CkeditorComponent') viewChildCkEditor: CkeditorComponent;
  conteudoArtigo: string = ""
  inputTitulo: string = ""
  artigoEdicao: ArtigoEdicaoDto;
  tema: Tema;
  artigoDto: ArtigoDto
  //edicao: Edicao = new Edicao();
  edicao: EdicaoArtigoDto = new EdicaoArtigoDto();
  edicaoModel: EdicaoViewModel;
  erros: Array<any> = []
  ultimaUrl: string

  contador: number = 0;

  constructor(@Inject(LayoutComponent) private appLayoutComponent: LayoutComponent,
              private formBuilder: FormBuilder,
              private dashboardService: DashboardService,
              private router: Router,
              private toastrService: ToastrService,
              private spinnerService: NgxSpinnerService,
              private encryptSessionStorage: EncryptionDescryptionService,
              private dexieService: DexieService,
              private route: Router,
              private activatedRoute: ActivatedRoute,
              private sessionStorageService: SessionStorageService) { }


  ngOnInit(): void {
    this.dashboardService.sessionStorageSalvarUltimaUrl(this.route.url);
    let id = this.activatedRoute.snapshot.params['id'];
    //this.dashboardService.sessionStorageSalvarUltimoId(id)

    let retorno =  this.activatedRoute.snapshot.data['artigoEdicaoDto'];
    this.artigoEdicao = retorno.data.artigoEdicao;
    this.conteudoArtigo = this.artigoEdicao.edicaoConteudo;
    this.inputTitulo = this.artigoEdicao.artigoTitulo;
    this.inicalizarFormulario()
    this.spinnerService.hide()
  }


  inicalizarFormulario() {
      this.form = new FormGroup({
      tituloArtigo: new FormControl(this.inputTitulo, null)
    })
  }

  receberConteudoEditor(conteudo) {
    this.spinnerService.show()
    //this.tema = this.retornaTema();
    this.artigoDto = this.retornaArtigo();
    this.edicao = this.retornaEdicao(conteudo, this.form.controls.tituloArtigo.value);
    this.artigoDto.edicaoArtigo = this.edicao;
    this.salvarEdicao();
  }

  retornaTema(): Tema {
    let tema: Tema = Object.assign({}, new Tema(), { id: this.artigoEdicao.temaId, titulo: this.artigoEdicao.temaTitulo })
    return tema;
  }

  retornaArtigo(): ArtigoDto {
    let artigo = new ArtigoDto();
    artigo.id = this.artigoEdicao.artigoId;
    // artigo.titulo = this.artigoEdicao.artigoTitulo;
    //artigo.descricao = this.artigoEdicao.artigoDescricao;
    return artigo;
  }

  retornaEdicao(conteudo: any, tituloArtigo: string): EdicaoArtigoDto {
    let edicao: EdicaoArtigoDto = Object.assign({}, this.edicao, { id: this.artigoEdicao.edicaoId.toString(), conteudo: conteudo, titulo: tituloArtigo })
    return edicao;
  }

  salvarEdicao() {
    this.spinnerService.show()
    this.edicaoModel = new EdicaoViewModel();
    this.edicaoModel.artigo = this.artigoDto;
    this.dashboardService.salvarEdicao(this.edicaoModel).subscribe(
      sucesso => {this.processarSucesso(sucesso) },
      falha => { this.processarFalha(falha) }
    )
  };

  processarSucesso(response: any) {
    this.erros = [];
    this.artigoEdicao = Object.assign({}, new ArtigoEdicaoDto(), response.data.artigoEdicao);
    this.dashboardService.sessionStorageSalvarUltimoId(this.artigoEdicao.artigoId.toString());
    let toastr = this.toastrService.success("Registro realizado com sucesso.", "Parabéns: ")
    if (toastr) {

      toastr.onHidden.subscribe(async() => {

        await this.verificarPaginaHomeParaAtualizacao()
        await this.atualizarTitulo()
        //this.spinnerService.hide()

      })
    }
  }

  async atualizarTitulo() {
    let temaId: number = parseInt(this.artigoEdicao.temaId.toString())
    this.dexieService.db.open()
    await this.dexieService.tabelaTemasDto.where('id').equals(temaId).modify(x => {
      (x)
      x.artigos.map(artigo => {
        if (artigo.id.toString() == this.artigoEdicao.artigoId.toString()) {
          artigo.titulo = this.artigoEdicao.artigoTitulo
          }
      })
    }).catch(error => (error))
      .finally(() => {
        this.appLayoutComponent.preencheNavItens();
        this.router.navigate([`/wiki/artigo/${this.artigoEdicao.artigoId}`]).then()
        this.spinnerService.hide();
      })
  }

  async verificarPaginaHomeParaAtualizacao() {
    if (this.artigoEdicao.artigoId == 1) {
      this.sessionStorageService.sessionStorageAtualizarArtigoEdicaoHome(this.artigoEdicao)
    }
  }

  processarFalha(fails: any) {
    if(fails.status){
      this.toastrService.error(fails.message.toString(), "Ocorreu um erro:")
    }else{
      this.erros = fails.error.errors;
      this.toastrService.error(this.erros.toString(), "Ocorreu um erro:")
    }
  }

  ngAfterViewChecked(){

    if(this.conteudoArtigo.length > 0 && this.inputTitulo.length > 0 ){
      this.contador += 1;
      // alert("contador: " + this.contador);
      if(this.contador >= 4)
      this.spinnerService.hide()
    }
  }

}
