import { ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatPaginator } from '@angular/material/paginator';
import { UsuarioIdentityDto } from '../../model/dtos/usuarioIdentityDto';
import { DashboardService } from '../../../services/dashboard.service';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-administrar-acesso',
  templateUrl: './administrar-acesso.component.html',
  styleUrls: ['./administrar-acesso.component.scss']
})
export class AdministrarAcessoComponent implements OnInit {
  [x: string]: any;

  listaDeUsuarios: UsuarioIdentityDto[] = []; //Usuario
  usuarioIdentity: UsuarioIdentityDto;
  erros: any[] = []
  displayedColumns: string[] = ['userName', 'email', 'claimValue', 'bloqueado', 'acao'];
  dataSource: any = new MatTableDataSource<UsuarioIdentityDto>();
  panelOpenState = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('table', { static: true, read: ElementRef }) table: ElementRef<HTMLDivElement>;
  @ViewChild('paginator', { static: true, read: ElementRef }) paginatorHtml: ElementRef<HTMLDivElement>;

  constructor(private dashboardService:
              DashboardService, private spinnerService: NgxSpinnerService,
              media: MediaObserver,
              private snackBar: MatSnackBar,
              private changeDetectorRefs: ChangeDetectorRef,
              private toastrService: ToastrService
              )
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
    this.listarUsuarios()
    //this.incializarTabela()
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

  listarUsuarios(){
    this.dashboardService.ListarUsuarios().subscribe(response =>{
      this.listaDeUsuarios = response.data;
      (this.listaDeUsuarios)
      this.incializarTabela()

    })
  }

  incializarTabela() {
    //this.panelOpenState = false;
    this.displayedColumns = ['userName', 'email', 'claimValue', 'bloqueado', 'acao'];
    this.dataSource = new MatTableDataSource<UsuarioIdentityDto>(this.listaDeUsuarios);
    this.dataSource.paginator = this.paginator;
    this.spinnerService.hide();
  }

  refresh() {
    this.incializarTabela()
    this.changeDetectorRefs.detectChanges();
  }

  acaoBloqueio(usuario){
    this.spinnerService.show()
    this.dashboardService.bloqueio(usuario).subscribe(
      sucesso => this.processarSucesso(sucesso),
      falha => {
        debugger
        this.processarFalha(falha)
      }
    );
  }

  acaoAlterarPerfil(usuario){
    this.spinnerService.show();
    this.dashboardService.alterarPerfil(usuario).subscribe(
      sucesso => this.processarSucesso(sucesso),
      falha => this.processarFalha(falha)
    );
  }

  processaAlteracao(response){

    let usuario: UsuarioIdentityDto = response.data;
    this.listaDeUsuarios = this.listaDeUsuarios.map(item => {
      if(item.id == usuario.id){
        return usuario;
      }else{
        return item;
      }
    })
    this.refresh();
    this.spinnerService.hide()
  }

  processarSucesso(response) {
    this.erros = [];
    let toastr = this.toastrService.success("Operação realizado com sucesso.", "Parabéns: ")
    if (toastr) {
      this.processaAlteracao(response)
    }
  }

  processarFalha(fails: any) {
    debugger
    if(fails.error.errors == undefined || fails.error.errors.length == 0){
      this.toastrService.error(fails.message.toString(), "Ocorreu um erro:")
    }else{
      this.erros = fails.error.errors;
      this.toastrService.error(this.erros.toString(), "Ocorreu um erro:")
    }
  }

}
