import { Component, HostListener, Inject, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppComponent } from 'src/app/app.component';
import { DexieService } from 'src/app/utils/dexieService/dexieService';
import { EncryptionDescryptionService } from 'src/app/utils/encryptionDescryptionService/encryptionDescryptionDervice';
import { ArtigoEdicaoDto } from '../model/dtos/artigoEdicaoDto';
import { DashboardService } from '../../services/dashboard.service';
import { DomSanitizer } from '@angular/platform-browser';
import { SessionStorageService } from 'src/app/utils/sessionStorage/import { Injectable } from \'@angular/sessionStorageService';


@Component({
  selector: 'app-view-home',
  templateUrl: './view-home.component.html',
  styleUrls: ['./view-home.component.scss']
})
export class ViewHomeComponent implements OnInit {
  tituloArtigo: string;
  conteudoArtigo: any;
  artigoEdicao: ArtigoEdicaoDto
  private _listeners: { destroy: () => void }[] = [];

  constructor(private encryptSessionStorage: EncryptionDescryptionService,
              private dashboardService: DashboardService,
              private spinnerService: NgxSpinnerService,
              private dexieService: DexieService,
              private route: Router,
              private renderer: Renderer2,
              private domSanitizer: DomSanitizer,
              private sessionStorageService: SessionStorageService) { }


  ngOnInit(): void {
    this.dashboardService.sessionStorageSalvarUltimaUrl(this.route.url)
    this.dashboardService.sessionStorageSalvarUltimoId('1');

    this.artigoEdicao = this.sessionStorageService.sessionStorageObterObjetoArtigoEdicaoHome()
    //let artigoEdicaoHome = this.sessionStorageService.sessionStorageObterArtigoEdicaoHome();
    if(this.artigoEdicao.edicaoConteudo === undefined){
      this.artigoEdicao.artigoTitulo = "";
      this.artigoEdicao.temaTitulo = "";
      this.artigoEdicao.edicaoConteudo = ""
    }else{
      this.incializarConteudo()
    }
    this.spinnerService.hide();
  }

  incializarConteudo() {
    this.tituloArtigo = this.artigoEdicao.artigoTitulo
    let conteudo = this.artigoEdicao.edicaoConteudo
    this.conteudoArtigo = this.tratarAncoraConteudo(conteudo)
  }

  @HostListener('window:click', ['$event'])
  onClick(e: any) {
    const path = e.composedPath() as Array<any>;
    const firstAnchor = path.find(p => p.tagName === undefined ? undefined : p.tagName.toLowerCase() === 'a');
    if (firstAnchor !== undefined && firstAnchor && !firstAnchor.hasAttribute('routerlink')) {

      const href: string = firstAnchor.getAttribute('href');

      if (href) {
        console.log('if (href) => ', href)

        if (!href.includes('#')) {
          window.open(href, '_blank');
        }

        let referencia = href.substr(1)
        let elemento2 = document.getElementsByName(referencia)
        let element = document.querySelector(href)
        if (element != undefined) {
          element.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
        }
      }

      e.preventDefault();
    }
  }


  tratarAncoraConteudo(conteudo) {

    const template = this.renderer.createElement('template');
    template.innerHTML = conteudo;

    const anchorNodes: NodeList = template.content.querySelectorAll('a');
    const anchors: Node[] = Array.from(anchorNodes);
    for (const anchor of anchors) {
      const href: string = (anchor as HTMLAnchorElement).getAttribute('href');
      if (href != null && href.indexOf('#') === 0) {
        this.renderer.setProperty(
          anchor,
          'href',
          `${href}`
        );
      }
    }

    return this.domSanitizer.bypassSecurityTrustHtml(template.innerHTML);

  }

  ngOnDestroy(): void {
    this._listeners?.forEach(listener => listener.destroy());
    this._listeners = null;
  }


}
