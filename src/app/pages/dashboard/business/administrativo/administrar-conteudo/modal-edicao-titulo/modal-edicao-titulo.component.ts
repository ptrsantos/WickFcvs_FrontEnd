import { Component, ElementRef, Inject, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { DashboardService } from 'src/app/pages/dashboard/services/dashboard.service';
import { LayoutComponent } from 'src/app/pages/layout/layout.component';
import { DexieService } from 'src/app/utils/dexieService/dexieService';
import { TemaDto } from '../../../model/dtos/temaDto';
import { TemaEdicaoDto } from '../../../model/dtos/temaEdicaoDto';
import { TabelaListaTemasComponent } from '../tabela-lista-temas/tabela-lista-temas.component';


export interface DialogData {
  titulo: string
}

@Component({
  selector: 'app-modal-edicao-titulo',
  template: '<div id="containerDoModal"></div>'
})
export class ModalEdicaoTituloComponent implements OnInit, OnDestroy {

  tituloTema: string;
  tema: TemaDto;
  subscription: Subscription
  @Input() recebeTituloTema: string
  erros: any[] = []
  //@Output() enviarTema: EventEmitter = new EventEmitter();


  //constructor(public dialog: MatDialog, @Inject(AdministrarConteudoComponent) private administrarConteudo: AdministrarConteudoComponent) { }
  constructor(public dialog: MatDialog,
              private spinnerService: NgxSpinnerService,
              private dexieService: DexieService,
              private dashboardService: DashboardService,
              private toastrService: ToastrService,
              private router: Router,
              @Inject(LayoutComponent) private appLayoutComponent: LayoutComponent) { }

  ngOnInit(): void {
  }

  async openDialog(temaDto: TemaDto, tabelaComponent: TabelaListaTemasComponent ) {

    this.tema = temaDto;
      const dialogRef = this.dialog.open(ModalEdicaoTituloDialogComponent, {
      width: '30rem',
      height: '15rem',
      panelClass: 'container',
      data: {titulo: temaDto.titulo}

    });

    this.subscription = dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined){
         let temaEdicao: TemaEdicaoDto = {id: this.tema.id, titulo: result.value}
         this.salvarNoBackEnd(temaEdicao, tabelaComponent)
      }
    });


  }

  ngOnDestroy() {
    //this.subscription.unsubscribe()
  }

    salvarNoBackEnd(temaEdicao: TemaEdicaoDto, tabelaComponent: TabelaListaTemasComponent){
        this.dashboardService.salvarEdicaoTema(temaEdicao).subscribe(
          sucesso => {
              this.processarSucesso(sucesso, tabelaComponent)
          },
          falha => {
             this.processarFalha(falha)
          }
        )
      }

      processarSucesso(response, tabelaComponent: TabelaListaTemasComponent) {
        this.erros = [];
        let toastr = this.toastrService.success("Operação realizado com sucesso.", "Parabéns: ")
        if (toastr) {
           let listaTemasAux = response.data.listaTemas.map(item =>  Object.assign({}, new TemaDto(), item));
          let listaTemas = listaTemasAux.sort((a, b) => a.titulo.localeCompare(b.titulo))
          //await this.dexieService.salvarTemasDto(listaTemas)
          this.dexieService.salvarTemasDto(listaTemas).then(() => {
            this.appLayoutComponent.listaTemas = null;
            this.appLayoutComponent.listaTemas = listaTemas;
            this.appLayoutComponent.preencherNavTemas();
            // this.router.navigate([`/wiki/administrar-conteudo`]).then();
            tabelaComponent.inicializarTabela()

          })

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


}

@Component({
  selector: 'app-modal-edicao-titulo-dialog',
  templateUrl: 'modal-edicao-titulo.component.html',
})
export class ModalEdicaoTituloDialogComponent {

  @ViewChild('inputTema') inputTema: ElementRef;

  appLayoutComponent: LayoutComponent
  tema: TemaDto;

  constructor(public dialogRef: MatDialogRef<ModalEdicaoTituloDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) { }


    erros: Array<any> = []

    onNoClick(): void {
      this.dialogRef.close();
    }

    cancelar(){
      this.dialogRef.close();
    }

}
