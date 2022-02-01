import { Artigo } from '../model/entities/artigo';
import { DexieService } from 'src/app/utils/dexieService/dexieService';
import { ArtigoEdicaoDto } from '../model/dtos/artigoEdicaoDto';
import { DashboardService } from '../../services/dashboard.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {
  Component,
  OnInit,
  ViewChild,
  EventEmitter,
  OnDestroy,
  Inject,
  AfterViewChecked,
} from '@angular/core';
import { TemaComponent } from '../tema/tema.component';
import { ArtigoComponent } from '../artigo/artigo.component';
import { CkeditorComponent } from '../ckeditor/ckeditor.component';
import { InclusaoViewModel } from '../model/view-models/inclusaoViewModel';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EncryptionDescryptionService } from 'src/app/utils/encryptionDescryptionService/encryptionDescryptionDervice';
import { NavItem } from 'src/app/pages/layout/nav-item';
import { LayoutComponent } from 'src/app/pages/layout/layout.component';
import { SessionStorageService } from "src/app/utils/sessionStorage/import { Injectable } from '@angular/sessionStorageService";
import { TemaInclusaoDto } from '../model/dtos/temaInclusaoDto';
import { ArtigoInclusaoDto } from '../model/dtos/artigoInlusaoDto';
import { TemaDto } from '../model/dtos/temaDto';
import { NgxSpinnerService } from 'ngx-spinner';
import { Edicao } from '../model/entities/edicao';
import { EdicaoArtigoDto } from '../model/dtos/edicaoArtigoDto';
import { ArtigoDto } from '../model/dtos/artigoDto';
import { debug } from 'console';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

///import { NavItem } from './nav-item';

@Component({
  selector: 'app-view-incluir-artigo',
  templateUrl: './view-incluir-artigo.component.html',
  styleUrls: ['./view-incluir-artigo.component.scss'],
})
export class ViewIncluirArtigoComponent implements OnInit, OnDestroy {
  erros: any[] = new Array<any>();
  form: FormGroup;
  tema: TemaInclusaoDto;
  artigo: ArtigoInclusaoDto;
  inclusao: InclusaoViewModel;
  @ViewChild(TemaComponent) temaViewChild: TemaComponent;
  @ViewChild(ArtigoComponent) artigoViewChild: ArtigoComponent;
  @ViewChild(CkeditorComponent) ckeditorViewChild: CkeditorComponent;

  panelOpenState = false;

  navItems: NavItem[] = [];
  //listaTemas: Tema[] = [];
  listaTemas: TemaDto[] = [];

  constructor(
    @Inject(LayoutComponent) private appLayoutComponent: LayoutComponent,
    private formBuilder: FormBuilder,
    private dashboardService: DashboardService,
    private router: Router,
    private toastrService: ToastrService,
    private spinnerService: NgxSpinnerService,
    //private encrypt: EncryptionDescryptionService,
    private route: Router,
    private dexieService: DexieService,
    private sessionStorageService: SessionStorageService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.sessionStorageService.sessionStorageSalvarUltimaUrl(this.route.url);

    this.form = this.formBuilder.group({});
    this.spinnerService.hide();
  }

  salvarEdicao(inclusao: InclusaoViewModel) {
    this.spinnerService.show();
    this.dashboardService.salvarDados(inclusao).subscribe(
      (sucesso) => {
        this.processarSucesso(sucesso);
      },
      (falha) => {
        this.processarFalha(falha);
      }
    );
  }

  processarSucesso(response) {
    this.erros = [];
    let toastr = this.toastrService.success(
      'Operação realizado com sucesso.',
      'Parabéns: '
    );
    if (toastr) {
      toastr.onHidden.subscribe(async () => {

        let artigoEdicao: ArtigoEdicaoDto = Object.assign({}, new ArtigoEdicaoDto(), response.data.artigoEdicao);

        let listaTemasAux = response.data.temas.map((item) => Object.assign({}, new TemaDto(), item));
        this.listaTemas = listaTemasAux.sort((a, b) => a.titulo.localeCompare(b.titulo));

        let tigoEdicaoHome = this.sessionStorageService.sessionStorageObterArtigoEdicaoHome()
        if(this.listaTemas.length > 0){
          await this.dexieService.salvarTemasDto(this.listaTemas);
          this.appLayoutComponent.listaTemas = null;
          this.appLayoutComponent.listaTemas = this.listaTemas;
          await this.appLayoutComponent.preencherNavTemas();

          if (artigoEdicao.artigoId == 1) {
            this.sessionStorageService.sessionStorageSalvarArtigoEdicaoHome(artigoEdicao);
          }else{
            this.sessionStorageService.sessionStorageSalvarArtigoEdicao(artigoEdicao);
          }
          this.router.navigate([`/wiki/artigo/${artigoEdicao.artigoId}`]).then();
        }

      });
    }
  }

  processarFalha(fails: any) {
    this.erros = fails.error.errors;
    this.toastrService.error(this.erros.toString(), "Ocorreu um erro:")
}

  receberConteudoEditor(conteudo) {
    //this.spinnerService.show();
    this.preencherArtigo(conteudo);
  }

  preencherArtigo(conteudo) {
    this.spinnerService.show();
    let artigo: ArtigoDto = new ArtigoDto();
    let edicao: EdicaoArtigoDto = new EdicaoArtigoDto();
    edicao.titulo = this.artigoViewChild.tituloArtigoFormControl.value;
    edicao.conteudo = conteudo;
    artigo.edicaoArtigo = edicao;
    this.preencherTema(artigo);
  }

  preencherTema(artigo: ArtigoDto) {

    let mensagem = "O(s) campo(s): ";
    if(this.temaViewChild.temaFormControl.value == null ||this.temaViewChild.temaFormControl?.value.length == 0
      || artigo.edicaoArtigo.conteudo == null || artigo.edicaoArtigo?.conteudo.length == 0
      || artigo.edicaoArtigo.titulo == null || artigo.edicaoArtigo.titulo.length == 0){

        if(this.temaViewChild.temaFormControl.value == null || this.temaViewChild.temaFormControl.value.length == 0){
          mensagem += "<br><b>Tema</b>"
        }
        if(artigo.edicaoArtigo.titulo == null || artigo.edicaoArtigo?.titulo.length == 0){
          mensagem += "<br><b>Artigo</b>"
        }
        if(artigo.edicaoArtigo.conteudo == null || artigo.edicaoArtigo.conteudo.length == 0){
          mensagem += "<br><b>Editor</b>"
        }
        mensagem += "<br>Deve(m) ser preenchido(s)"
        this.abrirModalErro(mensagem)
        return
      }

    let inclusaoModel = new InclusaoViewModel();
    let tema: TemaInclusaoDto = new TemaInclusaoDto();
    let edicao: Edicao = new Edicao();
    edicao.titulo = this.temaViewChild.temaFormControl.value;
    edicao.conteudo = this.temaViewChild.temaFormControl.value;
    tema.edicao = edicao;
    tema.artigo = artigo;
    inclusaoModel.temaInclusao = tema;

    this.salvarEdicao(inclusaoModel);
  }

  ngOnDestroy(): void {
    this.spinnerService.hide();
  }

  abrirModalErro(mensagem){
    this.dialog.open(ModalErroIncluirArtigoDialog,
        {
          data: {mensagem: mensagem}
        }
      )
  }

  exibirMensagemDeErro(mensagem){
    alert()
  }
}


@Component({
  selector: 'modal-erro-incluir-artigo-dialog',
  templateUrl: 'modal-erro-incluir-artigo.component.html',
})

export class ModalErroIncluirArtigoDialog {

  constructor(
    public dialogRef: MatDialogRef<ModalErroIncluirArtigoDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit(): void {
    //console.log(this.data)
  }

  fechar(){
    this.dialogRef.close();
  }

}
