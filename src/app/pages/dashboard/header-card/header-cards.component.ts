import { DexieService } from 'src/app/utils/dexieService/dexieService';
import { AppComponent } from 'src/app/app.component';
import { Router } from '@angular/router';
import { Component, OnInit, Input, Inject, OnDestroy } from '@angular/core';
import { EncryptionDescryptionService } from 'src/app/utils/encryptionDescryptionService/encryptionDescryptionDervice';
import { ArtigoEdicaoDto } from '../business/model/dtos/artigoEdicaoDto';
import { NgxSpinnerService } from 'ngx-spinner';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'app-header-card',
  templateUrl: './header-card.component.html',
  styleUrls: ['./header-card.component.scss']
})
export class HeaderCardComponent implements OnInit {
  @Input() bgClass: string;
  @Input() icon: string;
  @Input() titulo: string;
  @Input() tituloBotao: string
  @Input() dadosRoutOutlet: any

  artigoEdicao: ArtigoEdicaoDto
  ultimaUrl: string
  ultimoId: string

  constructor(private dashboardService: DashboardService,
              private router: Router,
              private encryptSessionStorage: EncryptionDescryptionService,
              private dexieService: DexieService,
              private spinnerService: NgxSpinnerService) { }

  ngOnInit() {

   }

  onClick() {

    this.ultimaUrl = this.dashboardService.sessionStorageRetornaUltimaUrl();
    this.ultimoId = this.dashboardService.sessionStorageRetornaUltimoId();
    this.spinnerService.show();
    if (this.titulo == "inclusao") {
      if (!this.ultimaUrl.includes('/wiki/incluir-artigo')) {
        this.router.navigate(['/wiki/incluir-artigo']).then
      }
    }
    else
      if (this.titulo == "edicao") {
        if (!this.ultimaUrl.includes('/wiki/editar-artigo/')) {
          // this.spinnerService.show();
            if (this.ultimoId == '1') {
            this.router.navigate(['/wiki/editar-artigo/1']).then
          } else {
            this.router.navigate([`/wiki/editar-artigo/${this.ultimoId.toString()}`]).then
          }
        }
      } else

        if (this.titulo == 'visualizacao') {
          if (!this.ultimaUrl.includes('/wiki/artigo/')) {
            if (this.ultimaUrl == '/wiki/home') {
              this.router.navigate(['/wiki/artigo/1']).then
            } else {
              this.artigoEdicao = this.encryptSessionStorage.sessionStorageObterObjetoArtigoEdicao();
              this.router.navigate([`/wiki/artigo/${this.ultimoId}`]).then
            }
          }else{
            this.router.navigate([`/wiki/artigo/${this.ultimoId}`]).then
          }

        } else
          if (this.titulo == 'historico') {
            this.router.navigate(['/wiki/historico']).then
          }
  }

  // OnDestroy() {
  //   this.spinnerService.show();
  // }

}
