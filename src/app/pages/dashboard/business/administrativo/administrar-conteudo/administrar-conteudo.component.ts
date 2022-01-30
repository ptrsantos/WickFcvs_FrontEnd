import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from 'src/app/app.component';
import { DashboardService } from '../../../services/dashboard.service';
import { TemaDto } from '../../model/dtos/temaDto';
import { ModalEdicaoTituloComponent } from './modal-edicao-titulo/modal-edicao-titulo.component';

@Component({
  selector: 'app-administrar-conteudo',
  templateUrl: './administrar-conteudo.component.html',
  styleUrls: ['./administrar-conteudo.component.scss']
})
export class AdministrarConteudoComponent implements OnInit {

  @ViewChild (ModalEdicaoTituloComponent) modalHistorico: ModalEdicaoTituloComponent
  erros: Array<any> = []
  enviaTema: TemaDto

  constructor(@Inject(AppComponent) private appComponent: AppComponent,
              private spinnerService: NgxSpinnerService,
              private dashboardService: DashboardService,
              /*private dexieService: DexieService,
              private toastrService: ToastrService,
              @Inject(LayoutComponent) private appLayoutComponent: LayoutComponent,
              private router: Router*/) { }

  ngOnInit(): void {
    this.spinnerService.hide()
  }

  // receberTituloParaEdicao(tema: TemaDto){
  //   this.enviaTema = tema
  //   this.modalHistorico.openDialog(tema);
  // }

  receberTemaParaExclusao(temaId: string){
    this.excluirTema(temaId);
  }

  excluirTema(temaId){
    this.dashboardService.ExcluirTema(temaId).subscribe(result =>{
    });
  }

}
