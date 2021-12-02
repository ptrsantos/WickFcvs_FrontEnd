import { AppComponent } from 'src/app/app.component';
import {
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  ViewChild,
  AfterViewInit,
  Inject,
  HostListener,
  ElementRef,
} from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { DashboardService } from '../../services/dashboard.service';
import { ModalHistoricoComponent } from '../modal-historico/modal-historico.component';
import { ArtigoEdicaoDataTableDto } from '../model/dtos/artigoEdicaoDataTableDto';
import { ArtigoEdicaoDto } from '../model/dtos/artigoEdicaoDto';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-view-historico',
  templateUrl: './view-historico.component.html',
  styleUrls: ['./view-historico.component.scss'],
})
export class ViewHistoricoComponent implements OnInit {
  @ViewChild(ModalHistoricoComponent) modalHistorico: ModalHistoricoComponent;

  listaTemasArtigos: ArtigoEdicaoDataTableDto[] = [];
  panelOpenState = false;
  displayedColumns: string[] = [
    'usuario',
    'data',
    'titulo',
    'conteudo',
    'acao',
  ];
  dataSource: any = new MatTableDataSource<ArtigoEdicaoDataTableDto>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  artigoEdicao: ArtigoEdicaoDataTableDto;

  tamanhoDaLista: number;
  paginaAtual: number = 1;
  tamanhoDaPaginaAtual: number;

  ocultarTabela: boolean = true;
  ocultarBotoes: boolean = false;

  erros: Array<any> = [];

  deviceInfo = null;

  @ViewChild('filtro') filtro: ElementRef;

  private readonly mediaWatcher2: Subscription;

  exibirSnackBar: boolean = false;

  constructor(
    private changeDetectorRefs: ChangeDetectorRef,
    private dashboardService: DashboardService,
    private spinnerService: NgxSpinnerService,
    private toastrService: ToastrService,
    private route: Router,
    media: MediaObserver,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.mediaWatcher2 = media.media$.subscribe((change2: MediaChange) => {
      this.dashboardService.sessionStorageSalvarUltimaUrl(this.route.url);
      if (change2.mqAlias === 'xs' && this.route.url == '/wiki/historico') {
        if (screen.height > screen.width) {
          this.exibirSnackBar = true;
          this.openSnackBar();
        }
      } else {
        this.exibirSnackBar = false;
        this.closeSnackBar();
      }
    });
  }

  ngOnInit() {
    this.dashboardService.sessionStorageSalvarUltimaUrl(this.route.url);
    this.tamanhoDaLista = 0;
    this.incializarTebela();
    this.obterDadosIniciais();
    this.spinnerService.hide();
  }

  obterDadosIniciais() {
    this.dashboardService
      .ListarArtigosEdicoesHistorico('1', '10')
      .subscribe((response) => {
        this.tamanhoDaPaginaAtual = 5;
        this.listaTemasArtigos = [];
        this.listaTemasArtigos = response.data.listaArtigosEdicoes;
        this.tamanhoDaLista = response.data.quantidadeItens;
        this.listaTemasArtigos.length = response.data.quantidadeItens;
        this.incializarTebela();
        this.refresh();
        this.ocultarTabela = false;
        this.spinnerService.hide();
      });
  }

  obterProximosDados(filtro: string) {
    //this.spinnerService.show();
    let filtroBusca = filtro == undefined ? '' : filtro == null ? '' : filtro;
    this.dashboardService
      .ListarArtigosEdicoesHistoricoComFiltro(
        this.paginaAtual.toString(),
        this.tamanhoDaPaginaAtual.toString(),
        filtroBusca.trim()
      )
      .subscribe((response) => {
        let indice = (this.paginaAtual - 1) * this.tamanhoDaPaginaAtual;
        this.listaTemasArtigos = [];
        this.tamanhoDaLista = response.data.quantidadeItens;
        this.listaTemasArtigos.length = response.data.quantidadeItens;
        let retorno = response.data.listaArtigosEdicoes;
        this.listaTemasArtigos.splice(indice, retorno.length, ...retorno);
        this.refresh();
        //this.spinnerService.hide();
      });
  }

  filtrar() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }

  limparFiltro() {
    this.filtro.nativeElement[0].value = '';
    this.paginator._changePageSize(this.paginator.pageSize);
  }

  openSnackBar() {
    let message =
      'Para uma melhor visualização use o aparelho no sentido horizontal.';
    let action = 'Fechar';
    this.snackBar.open(message, action, {
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }

  closeSnackBar() {
    this.snackBar.dismiss();
  }

  pageChanged(event) {
    this.spinnerService.show();
    let filtro = this.filtro.nativeElement[0].value;
    let pagina = event.pageIndex;
    let tamanho = event.pageSize;
    let paginaAnterior = event.previousPageIndex;
    //let tamanhoAnterior = tamanho * pagina;

    this.paginaAtual = pagina - paginaAnterior;

    if (pagina > paginaAnterior) {
      this.paginaAtual = pagina + 1;
    } else {
      this.paginaAtual = pagina + 1;
    }

    this.tamanhoDaPaginaAtual = event.pageSize;

    this.obterProximosDados(filtro);
  }

  refresh() {
    this.incializarTebela();
    this.changeDetectorRefs.detectChanges();
  }

  incializarTebela() {
    this.panelOpenState = false;
    this.displayedColumns = ['usuario', 'data', 'titulo', 'conteudo', 'acao'];
    this.dataSource = new MatTableDataSource<ArtigoEdicaoDataTableDto>(
      this.listaTemasArtigos
    );
    this.dataSource.paginator = this.paginator;
  }

  acaoVisualizarModal(dado) {
    this.spinnerService.show();
    this.retornaArtigoEdicaoParaVisualizacao(dado.edicaoId);
  }

  acaoVisualizarEdicao(dado) {
    this.artigoEdicao = Object.assign({}, new ArtigoEdicaoDto(), dado);
    this.dashboardService.sessionStorageSalvarArtigoEdicao(this.artigoEdicao);
    this.dashboardService.sessionStorageSalvarUltimoId(
      this.artigoEdicao.artigoId
    );
    this.router
      .navigate([`/wiki/historico-detalhe-edicao/${dado.edicaoId}`])
      .then();
  }

  retornaArtigoEdicaoParaVisualizacao(edicaoId) {
    this.dashboardService.retornaArtigoEdicaoHistorico(edicaoId).subscribe(
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
    let artigoEdicao: ArtigoEdicaoDto = Object.assign(
      {},
      new ArtigoEdicaoDto(),
      response.data.artigoEdicao
    );
    this.modalHistorico.openDialog(artigoEdicao);
  }

  processarFalha(fails: any) {
    this.erros = fails.error.errors;
    this.toastrService.error(this.erros.toString(), 'Ocorreu um erro:');
  }
}
