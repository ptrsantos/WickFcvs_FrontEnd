import { ChangeDetectorRef, Component, Inject, OnInit, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { DexieService } from 'src/app/utils/dexieService/dexieService';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { TemaDataTable } from './models/TemaDataTable';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ArtigoDataTable } from './models/artigoDataTable';
import { MatSort } from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';
import { LayoutComponent } from 'src/app/pages/layout/layout.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { ArtigoExibicaoDto } from '../../../model/dtos/artigoExibicaoDto';
import { TemaEdicaoViewModel } from '../../../model/view-models/TemaEdicaoViewModel';
import { TemaDto } from '../../../model/dtos/temaDto';
import { DashboardService } from 'src/app/pages/dashboard/services/dashboard.service';
import { EdicaoTemaModalDialogComponent } from './edicao-tema-dialog/edicao-tema-modal-dialog.component';
import { TemaEdicaoDto } from '../../../model/dtos/temaEdicaoDto';


@Component({
  selector: 'app-edicao-tema',
  templateUrl: './edicao-tema.component.html',
  styleUrls: ['./edicao-tema.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})



export class EdicaoTemaComponent implements OnInit {

  @ViewChild('outerSort', { static: true }) sort: MatSort;
  @ViewChildren('innerSort') innerSort: QueryList<MatSort>;
  // @ViewChildren('innerTables') innerTables: QueryList<MatTable<ArtigoDataTable>>;
  @ViewChildren('innerTables') innerTables: QueryList<MatTable<ArtigoExibicaoDto>>;

  temaEdicaoModel: TemaEdicaoViewModel;
  temaDto: TemaDto = new TemaDto();
  buttonCliked = false;
  espandido = false

  dataSource: MatTableDataSource<TemaDataTable>;
  usersData: TemaDataTable[] = [];
  columnsToDisplay = ['titulo', 'dataUltimaEdicao', 'autorUltimaEdicao','id', 'action'];
  innerDisplayedColumns = ['titulo', 'dataUltimaEdicao', 'autorUltimaEdicao', 'id', 'acao'];
  expandedElement: TemaDataTable | null;

  erros: Array<any> = []

  constructor(
    private dexieService: DexieService,
    private activatedRoute: ActivatedRoute,
    private dashboardService: DashboardService,
    private router: Router,
    private toastrService: ToastrService,
    @Inject(LayoutComponent) private appLayoutComponent: LayoutComponent,
    private spinnerService: NgxSpinnerService,

    public dialog: MatDialog,

    private cd: ChangeDetectorRef

    ) { }

    ngOnInit(): void {

     /**Preenchimento da lista do datatable */
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
    })

  }

  /**Componentes modal */
  openDialog(temaDataTable: TemaDataTable): void {
    this.buttonCliked = true;
    this.temaDto = Object.assign({}, new TemaDto(), temaDataTable);;
    console.log(temaDataTable)
    const dialogRef = this.dialog.open(EdicaoTemaModalDialogComponent, {
      width: '30%',
      height: '35%',
      data: {titulo: temaDataTable.titulo},
    });

    dialogRef.afterClosed().subscribe(result => {

      if(result != undefined){
        this.spinnerService.show()
        let temaEdicao: TemaEdicaoDto = { id: this.temaDto.id, titulo: result }
        this.salvarNoBackEnd(temaEdicao)
      }
    });
  }


  /**Logica para salvar no back end */

salvarNoBackEnd(temaEdicao: TemaEdicaoDto){
      this.dashboardService.salvarEdicaoTema(temaEdicao).subscribe(
        sucesso => {
           this.processarSucesso(sucesso)
        },
        falha => {
          this.processarFalha(falha)
        }
      )
    }

    processarSucesso(response) {
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

        })

      }
    }

    processarFalha(fails: any) {
      this.erros = fails.error.errors;
      this.toastrService.error(this.erros.toString(), "Ocorreu um erro:")
  }

  /*Elementos da tabela-----------------------------------------------------*/

  toggleRow(element: TemaDataTable) {
    console.log(element)
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
      console.log(column)
    }
  }

  onClick(element: any){
    this.buttonCliked = true;
  }

  enviarTituloParaEdicao(temaDataTable: TemaDataTable){
    this.buttonCliked = true;
    this.temaDto = Object.assign({}, new TemaDto(), temaDataTable);
 }


  editarVinculo(temaDataTable: TemaDataTable){
    this.buttonCliked = true;
    this.router.navigate([`/wiki/editar-vinculo/${temaDataTable.id.toString()}`]).then()
  }

  editarArtigo(artigo: ArtigoDataTable){
    this.buttonCliked = true;
    this.router.navigate([`/wiki/editar-artigo/${artigo.id.toString()}`]).then()
  }

}
