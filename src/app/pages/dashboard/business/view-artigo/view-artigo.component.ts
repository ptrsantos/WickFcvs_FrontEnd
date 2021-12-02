import { retry } from 'rxjs/operators';
import { DashboardService } from '../../services/dashboard.service';
import { AppComponent } from 'src/app/app.component';
import { element } from 'protractor';
import { ActivatedRoute, Router } from '@angular/router';
import { ArtigoEdicaoDto } from '../model/dtos/artigoEdicaoDto';
import { Component, Inject, OnInit, AfterViewInit, ElementRef, HostListener, forwardRef } from '@angular/core';
import { EncryptionDescryptionService } from 'src/app/utils/encryptionDescryptionService/encryptionDescryptionDervice';
import { NgxSpinnerService } from 'ngx-spinner';
import { Renderer2 } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { CkeditorComponent } from '../ckeditor/ckeditor.component';
import { DexieService } from 'src/app/utils/dexieService/dexieService';
import { ToastrService } from 'ngx-toastr';
import { DOCUMENT } from '@angular/common';
import { SessionStorageService } from 'src/app/utils/sessionStorage/import { Injectable } from \'@angular/sessionStorageService';
import { Tema } from '../model/entities/tema';

@Component({
  selector: 'app-view-artigo',
  templateUrl: './view-artigo.component.html',
  styleUrls: ['./view-artigo.component.scss'],
})
export class ViewArtigoComponent implements OnInit, AfterViewInit {
  tituloArtigo: string;
  conteudoArtigo: any;
  artigoEdicao: ArtigoEdicaoDto;
  erros: Array<any> = []
  private _listeners: { destroy: () => void }[] = [];

  constructor(private route: Router, private spinnerService: NgxSpinnerService,
              private renderer: Renderer2,
              private domSanitizer: DomSanitizer,
              private _el: ElementRef,
              private dexieService: DexieService,
              private activatedRoute: ActivatedRoute,
              private dashboardService: DashboardService,
              private encryptSessionStorage: EncryptionDescryptionService,
              private toastrService: ToastrService,
              private sessionStorageService: SessionStorageService,
              @Inject(DOCUMENT) private document: Document) {
              }

  ngOnInit(): void {
    this.sessionStorageService.sessionStorageSalvarUltimaUrl(this.route.url)
    let id = this.activatedRoute.snapshot.params['id'];
    this.sessionStorageService.sessionStorageSalvarUltimoId(id)
    let retorno =  this.activatedRoute.snapshot.data['artigoEdicaoDto'];
    //let retorno = this.activatedRoute.snapshot.data.artigoEdicaoDto;
    this.artigoEdicao = retorno.data.artigoEdicao;
    this.incializarConteudo();
    this.spinnerService.hide()
  }

  async obterArtigoEdicaoHome() {
    this.artigoEdicao = this.sessionStorageService.sessionStorageObterObjetoArtigoEdicaoHome();
    this.incializarConteudo()
    this.spinnerService.hide()
  }

  async obterArtigoEdicaoGenerico(id: string) {
    this.dashboardService.retornaArtigoEdicaoPorArtigoId(id).subscribe(
      sucesso => { this.processarSucesso(sucesso) },
      falha => { this.processarFalha(falha) })
  }


  async processarSucesso(response) {
    this.erros = [];
        this.spinnerService.hide();
        this.artigoEdicao = Object.assign({}, new ArtigoEdicaoDto(), response.data.artigoEdicao)
        this.encryptSessionStorage.sessionStorageSalvarArtigoEdicao(this.artigoEdicao)
        this.tituloArtigo = this.artigoEdicao.artigoTitulo;
        let listaTemas: Tema[] = response.data.temas.map(item =>  Object.assign({}, new Tema(), item));
        this.incializarConteudo()
  }


  processarFalha(fails: any) {
    this.erros = fails.error.errors;
    this.toastrService.error(this.erros.toString(), "Ocorreu um erro:")
}

  incializarConteudo() {
    this.tituloArtigo = this.artigoEdicao.artigoTitulo
    let conteudo = this.artigoEdicao.edicaoConteudo
    this.conteudoArtigo = this.tratarAncoraConteudo(conteudo)
  }

  ngAfterViewInit(): void {
    this.spinnerService.hide()
  }

  @HostListener('window:click', ['$event'])
  onClick(e: any) {
    const path = e.composedPath() as Array<any>;
    const firstAnchor = path.find(p => p.tagName === undefined ? undefined : p.tagName.toLowerCase() === 'a');
    if (firstAnchor !== undefined && firstAnchor && !firstAnchor.hasAttribute('routerlink')) {

      const href: string = firstAnchor.getAttribute('href');

      if (href) {
        console.log('if (href) => ', href)

        if(!href.includes('#')){
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
