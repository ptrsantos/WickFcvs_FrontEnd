import { ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatPaginator } from '@angular/material/paginator';
import { UsuarioIdentityDto } from '../../model/dtos/usuarioIdentityDto';
import { DashboardService } from '../../../services/dashboard.service';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-administrar-acesso',
  templateUrl: './administrar-acesso.component.html',
  styleUrls: ['./administrar-acesso.component.scss']
})
export class AdministrarAcessoComponent implements OnInit {
  [x: string]: any;

  listaDeUsuarios: UsuarioIdentityDto[] = []; //Usuario
  usuarioIdentity: UsuarioIdentityDto;

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
              private changeDetectorRefs: ChangeDetectorRef
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

    // const width = this.table.nativeElement.getBoundingClientRect().width;
    // this.renderer.setStyle(this.paginatorHtml.nativeElement, 'width', width + 'px');

    this.spinnerService.show()
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
    this.dashboardService.bloqueio(usuario).subscribe(response => {

        let usuario: UsuarioIdentityDto = response.data;
        this.listaDeUsuarios = this.listaDeUsuarios.map(item => {
          if(item.id == usuario.id){
            return usuario;
          }else{
            return item;
          }
        })
        this.refresh()
        this.spinnerService.hide()
    });
  }

  acaoAlterarPerfil(usuario){
    this.spinnerService.show();
    this.dashboardService.alterarPerfil(usuario).subscribe(response => {

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
    });
  }

  // @HostListener('window: orientationchange', ['$event'])
  // onOrientationChange(event) {
  //     debugger
  //   // alert('orientationChanged');

  //   this.deviceInfo = this.deviceService.getDeviceInfo();
  //   const isMobile = this.deviceService.isMobile();
  //   const isTablet = this.deviceService.isTablet();
  //   // const isDesktopDevice = this.deviceService.isDesktop();
  //   // (this.deviceInfo);
  //   // (isMobile);  // returns if the device is a mobile device (android / iPhone / windows-phone etc)
  //   // (isTablet);  // returns if the device us a tablet (iPad etc)
  //   // (isDesktopDevice); // returns if the app is running on a Desktop browser.

  //   this.verificarOrientacao()
  // }

  // verificarOrientacao(){
  //   if(!this.deviceService.isDesktop()){
  //     //(window.innerHeight)
  //     if(window.innerHeight > window.innerWidth){
  //       alert("Para uma melhor visualização use o aparelho na horizontal!");
  //     }
  //   }
  // }

}
