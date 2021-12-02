import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectorRef, Component, EventEmitter, Inject, OnInit, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DexieService } from 'src/app/utils/dexieService/dexieService';
import { ModalEdicaoTituloComponent } from '../modal-edicao-titulo/modal-edicao-titulo.component';
import { TemaDataTable } from './models/temaDataTable';
import { ArtigoDataTable } from './models/artigoDataTable';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { ArtigoExibicaoDto } from '../../../model/dtos/artigoExibicaoDto';
import { TemaDto } from '../../../model/dtos/temaDto';
import { DashboardService } from 'src/app/pages/dashboard/services/dashboard.service';
import { ToastrService } from 'ngx-toastr';
import { LayoutComponent } from 'src/app/pages/layout/layout.component';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-tabela-lista-temas',
  templateUrl: './tabela-lista-temas.component.html',
  styleUrls: ['./tabela-lista-temas.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TabelaListaTemasComponent implements OnInit {

  @ViewChild('outerSort', { static: true }) sort: MatSort;
  @ViewChildren('innerSort') innerSort: QueryList<MatSort>;
  @ViewChildren('innerTables') innerTables: QueryList<MatTable<ArtigoExibicaoDto>>;
  @ViewChild (ModalEdicaoTituloComponent) modalHistorico: ModalEdicaoTituloComponent

  // @Output() enviarTitulo = new EventEmitter<TemaDto>();
  @Output() enviarTemaParaExclusao = new EventEmitter<string>();
  @Output() enviarTituloEdicaoVinculo = new EventEmitter<TemaDto>();

  buttonCliked = false;
  espandido = false
  tema: TemaDto;
  enviaTituloTema: string ="";
  erros: any[] = [];

  dataSource: MatTableDataSource<TemaDataTable>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  usersData: TemaDataTable[] = [];
  columnsToDisplay = ['titulo', 'dataUltimaEdicao', 'autorUltimaEdicao','id', 'action'];
  innerDisplayedColumns = ['titulo', 'dataUltimaEdicao', 'autorUltimaEdicao', 'id', 'acao'];
  expandedElement: TemaDataTable | null;
  mediaWatcher2: any;
  exibirSnackBar: boolean;


  constructor(private cd: ChangeDetectorRef,
              private dexieService: DexieService,
              private router: Router,
              public dialog: MatDialog,
              private dashboardService: DashboardService,
              private toastrService: ToastrService,
              @Inject(LayoutComponent) private appLayoutComponent: LayoutComponent,
              media: MediaObserver,
              private snackBar: MatSnackBar,
              private changeDetectorRefs: ChangeDetectorRef)
  {


    this.mediaWatcher2 = media.media$.subscribe((change2: MediaChange) => {
      //this.dashboardService.sessionStorageSalvarUltimaUrl(this.route.url);
      //if (change2.mqAlias === 'xs' && this.route.url== "/wiki/administrar-acessos")
      if (change2.mqAlias === 'xs')
      {

        if(screen.height > screen.width){
          this.exibirSnackBar = true;
          this.openSnackBar();
        }

      }
      else{
        this.exibirSnackBar = false;
        this.closeSnackBar()
      }
    });


  }

  ngOnInit(): void {
    this.inicializarTabela()
  }

  openSnackBar() {
    let message = "Para uma melhor visualização use o aparelho no sentido horizontal.";
    let action = "Fechar"
    this.snackBar.open(message, action, {
      verticalPosition: 'top',
      horizontalPosition: 'center'
    });
  }

  closeSnackBar(){
    this.snackBar.dismiss()
  }

  inicializarTabela(){
    this.usersData = [];
    this.dexieService.tabelaTemasDto.toArray(temas => {
      temas.forEach(tema => {
        if(tema.artigos && Array.isArray(tema.artigos) && tema.artigos.length){
          this.usersData = [...this.usersData, {...tema, artigos: new MatTableDataSource(tema.artigos)}]
        }else{
          this.usersData = [...this.usersData, tema]
        }
      })
      this.dataSource = new MatTableDataSource(this.usersData);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }

  toggleRow(element: TemaDataTable) {
    (element)
    if(this.buttonCliked){
      this.buttonCliked = false
    }else{
      element.artigos && (element.artigos as MatTableDataSource<ArtigoDataTable>).data.length ? (this.expandedElement = this.expandedElement === element ? null : element) : null;
      this.cd.detectChanges();
      this.innerTables.forEach((table, index) => (table.dataSource as MatTableDataSource<ArtigoDataTable>).sort = this.innerSort.toArray()[index]);
    }
  }

  applyFilter(filterValue: string) {
    this.innerTables.forEach((table, index) => (table.dataSource as MatTableDataSource<ArtigoDataTable>).filter = filterValue.trim().toLowerCase());
  }

  retornaTituloPrincipal(campo){
    let retorno = ""
    switch(campo){
      case "id": retorno = "Id"; break;
      case "titulo": retorno = "Título do Tema"; break;
      case "dataUltimaEdicao": retorno = "Data da última edição do tema"; break;
      case "autorUltimaEdicao": retorno = "Autor da última edição do tema"; break;
      case "action": retorno = "Ação"; break;
    }
    return retorno;
  }

  retornaTituloSecundario(campo){
    let retorno = ""
    switch(campo){
      case "id": retorno = "Id"; break;
      case "titulo": retorno = "Título do artigo"; break;
      case "dataUltimaEdicao": retorno = "Data da última edição do artigo"; break;
      case "autorUltimaEdicao": retorno = "Autor da última edição artigo"; break;
      case "action": retorno = "Ação"; break;
    }
    return retorno;
  }

  ocultarCampo(column){
    if(column == "id"){
      (column)
    }
  }

  onClick(element: any){
    this.buttonCliked = true;
  }

  enviarTituloParaEdicao(temaDataTable){
    (temaDataTable)
    this.buttonCliked = true;
    this.tema = Object.assign({}, new TemaDto(), temaDataTable);
    this.modalHistorico.openDialog(this.tema, this);
 }

  editarVinculo(temaDataTable: TemaDataTable){
    this.buttonCliked = true;
    this.router.navigate([`/wiki/editar-vinculo/${temaDataTable.id.toString()}`])
  }

  editarArtigo(artigo: ArtigoDataTable){
    this.buttonCliked = true;
    this.router.navigate([`/wiki/editar-artigo/${artigo.id.toString()}`]).then()
  }

  excluirTitulo(item: any){
    this.buttonCliked = true;
    (this.dataSource)
    //let retono = this.dataSource.
  }

  excluir(temaDataTable: TemaDataTable){
    this.buttonCliked = true;
    (this.dataSource)
    let temasTable: TemaDataTable[] = this.dataSource.data.filter(item => item == temaDataTable)
    let tema: TemaDto = Object.assign({}, new TemaDto(), temasTable[0])
    // let artigos: ArtigoExibicaoDto[] = tema.artigos
    if(temaDataTable.id == '1'){
      this.dialog.open(ExclusaoPaginaIncialNegadaDialog)
    }
    else
    if(tema.artigos['data']?.length > 0){
      this.dialog.open(ExclusaoNegadaDialog)
    }else{
      this.dialog.open(AlertaExclusaoDialog).afterClosed().subscribe(result => {
        (`Dialog result: ${result}`);
        if(result == true){
          this.excluirTema(tema.id)
        }
      });
    }

  }


  excluirTema(temaId){
    this.dashboardService.ExcluirTema(temaId).subscribe(
      sucesso => this.processarSucesso(sucesso),
      erro => this.processarFalha(erro)
    );
  }

  async processarSucesso(response) {
    this.erros = [];
    let toastr = this.toastrService.success("Operação realizado com sucesso.", "Parabéns: ")
    if (toastr) {
      let listaTemasAux = response.data.listaTemas.map(item =>  Object.assign({}, new TemaDto(), item));
      let listaTemas = listaTemasAux.sort((a, b) => a.titulo.localeCompare(b.titulo))

      await this.dexieService.salvarTemasDto(listaTemas);
      this.appLayoutComponent.listaTemas = null;
      this.appLayoutComponent.listaTemas = listaTemas;
      await this.appLayoutComponent.preencherNavTemas();
      this.router.navigate([`/wiki/administrar-conteudo`]).then();
      this.inicializarTabela()
    }
  }

  processarFalha(fails: any) {
    this.erros = fails.error.errors;
    this.toastrService.error(this.erros.toString(), "Ocorreu um erro:")
}

  excluirArtigo(artigoDataTable: ArtigoDataTable){

    this.buttonCliked = true;
    this.dialog.open(AlertaExclusaoDialog).afterClosed().subscribe(result => {
      (`Dialog result: ${result}`);
      if(result == true){
        this.excluirArtigoBackEnd(artigoDataTable.id)
      }
    });
  }

  excluirArtigoBackEnd(artigoId){
    this.dashboardService.ExcluirArtigo(artigoId).subscribe(
      sucesso => this.processarSucesso(sucesso),
      erro => this.processarFalha(erro)
    );
  }

}

@Component({
  selector: 'exclusao-pagina-inicial-dialog',
  templateUrl: 'alerta-exclusao-pagina-inicial.dialog.html',
})

export class ExclusaoPaginaIncialNegadaDialog {

  constructor(
    public dialogRef: MatDialogRef<ExclusaoPaginaIncialNegadaDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  fechar(){
    this.dialogRef.close();
  }

}

@Component({
  selector: 'exclusao-negada-dialog',
  templateUrl: 'alerta-exclusao-negada.dialog.html',
})
export class ExclusaoNegadaDialog {

  constructor(
    public dialogRef: MatDialogRef<ExclusaoNegadaDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  fechar(){
    this.dialogRef.close();
  }

}

@Component({
  selector: 'alerta-exclusao-dialog',
  templateUrl: 'alerta-exclusao.dialog.html'
})

export class AlertaExclusaoDialog {

  constructor(
    public dialogRef: MatDialogRef<ExclusaoNegadaDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  fechar(){
    this.dialogRef.close();
  }

}


