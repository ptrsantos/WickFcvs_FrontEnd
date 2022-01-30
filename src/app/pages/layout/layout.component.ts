import { DexieService } from 'src/app/utils/dexieService/dexieService';
import { Artigo } from '../dashboard/business/model/entities/artigo';
import { ActivatedRoute } from '@angular/router';
import {
  Component,
  OnInit,
  OnDestroy,
  ElementRef,
  ViewChild,
  Inject,
  Renderer2,
  ViewChildren,
  QueryList,
} from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { NavItem } from './nav-item';
import { AppComponent } from 'src/app/app.component';

import { VERSION } from '@angular/material/core';
import { NavService } from './nav.service';
import { AuthService } from 'src/app/auth/auth.service';
import { TemaDto } from '../dashboard/business/model/dtos/temaDto';
import { ArtigoEdicaoDto } from '../dashboard/business/model/dtos/artigoEdicaoDto';
import { MenuListItemComponent } from './menu-list-item/menu-list-item.component';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit, OnDestroy {
  listaDeArtigos: Array<Artigo> = [];
  @ViewChild('appDrawer') appDrawer: ElementRef;
  @ViewChild('matNavList') private matNavListElement: ElementRef;
  version = VERSION;
  navItems: NavItem[] = [];
  listaTemas: TemaDto[] = [];

  sideNavOpened = true;
  sideNavMode: 'side' | 'over' = 'side';
  toolBarHeight = 64;
  private readonly mediaWatcher: Subscription;
  artigoEdicaoHome: string;

  administrador: boolean = false;
  gestor: boolean = false;

  @ViewChildren('el', { read: ElementRef }) children: QueryList<ElementRef>;
  @ViewChild(MenuListItemComponent) matListItem: ElementRef;

  constructor(
    media: MediaObserver,
    private renderer: Renderer2,
    private host: ElementRef,
    private route: ActivatedRoute,
    @Inject(AppComponent) private appComponent: AppComponent,
    private dexieService: DexieService,
    private navService: NavService,
    private authService: AuthService
  ) {
    this.mediaWatcher = media.media$.subscribe((change: MediaChange) => {
      if (change.mqAlias === 'sm' || change.mqAlias === 'xs') {
        if (this.sideNavOpened) {
          this.sideNavOpened = false;
        }
        this.sideNavMode = 'over';
      } else {
        this.sideNavOpened = true;
        this.sideNavMode = 'side';
      }
      if (change.mqAlias === 'xs') {
        this.toolBarHeight = 56;
      } else {
        this.toolBarHeight = 64;
      }
    });
  }

  ngOnInit() {
    this.artigoEdicaoHome = this.authService.sessionStorageObterArtigoEdicaoHome();
    let usuario = this.authService.sessionStorageObterUsuario();
    let claim = usuario.claims.find((item) => item.type === 'perfil');
    if (claim !== undefined) {
      if (claim.value == 'Administrador') {
        this.administrador = true;
      }else
      if(claim.value == 'Gestor'){
        this.gestor = true
      }
    }
    this.preencherNavTemas();
  }

  mudarPosicao(array, posicaoInicial, posicaoFinal) {
    array.splice(posicaoFinal, 0, array.splice(posicaoInicial, 1)[0]);
    return array;
  }

  ngAfterViewInit() {
    this.navService.appDrawer = this.appDrawer;
  }

  ngOnDestroy(): void {
    this.mediaWatcher.unsubscribe();
  }

  async preencherNavTemas() {

    let temas = await this.dexieService.tabelaTemasDto.toArray();
    if (temas.length > 0) {
      let listaTemasAux = temas.sort((a, b) =>
        a.titulo.localeCompare(b.titulo)
      );
      let temaAux = listaTemasAux.filter((tema) => tema.id == '1');
      let indiceInicial = listaTemasAux.indexOf(temaAux[0]);
      let listaTemas = this.mudarPosicao(listaTemasAux, indiceInicial, 0);
      this.listaTemas = listaTemas;
      if (this.listaTemas.length > 0) {
        await this.preencheNavItens();
      }
    }
   }

  preencheNavItens() {

    this.LimaparMenuListItem()

    let primeiroItem = new NavItem();
    primeiroItem.displayName = 'Temas';
    primeiroItem.iconName = 'bookmark';
    primeiroItem.route = '';
    primeiroItem.children = [];
    for (let tema of this.listaTemas) {
      let item = new NavItem();
      item.displayName = tema.titulo;
      item.iconName = 'description';
      item.route = '/wiki';
      item.children = [];
      let listaArtigos = tema.artigos.sort((a, b) =>
        a.titulo.localeCompare(b.titulo)
      ); //ordenação de artigos por título
      for (let artigo of listaArtigos) {
        let subItem = new NavItem();
        subItem.displayName = artigo.titulo;
        (subItem.iconName = 'list'), (subItem.id = artigo.id);
        subItem.route = '/wiki/artigo';
        item.children.push(subItem);
      }
      primeiroItem.children.push(item);
    }
    this.navItems.push(primeiroItem);

    if (this.administrador == true || this.gestor == true) {
      let segundoItemAdm = new NavItem();
      segundoItemAdm.displayName = 'Administrador';
      segundoItemAdm.iconName = 'bookmark';
      segundoItemAdm.route = '';
      segundoItemAdm.children = [];
      segundoItemAdm.children = this.retornaListaSubItensAdministrativo();
      this.navItems.push(segundoItemAdm);

    }
   }

  LimaparMenuListItem() {
    let matNavListChildren = document.getElementsByClassName('mat-nav-list')[0].children;
    Array.from(matNavListChildren).forEach(elemento => elemento.innerHTML = "");
    // console.log(this.host)
    // console.log(this.children)
    // if(this.children.first != undefined){
    //   this.renderer.removeChild(this.host, this.children)
    //   // this.renderer.appendChild(this.host, this.children)
    // }

    // var arrayMatListItem = document.getElementsByClassName('mat-nav-list-item')
    // if(arrayMatListItem.length > 0){
    //   Array.from(arrayMatListItem).forEach(elemento => elemento.innerHTML = "")
    //   this.renderer.removeChild(this.host.nativeElement, this.children.first.nativeElement)
    // }
    // var arrayMatList = document.getElementsByClassName('mat-nav-list')
    // if(arrayMatList.length > 0){
    //   Array.from(arrayMatList).forEach(elemento => elemento.innerHTML = "")
    //   //this.renderer.removeChild(this.host.nativeElement, this.children.first.nativeElement)
    // }
    // this.renderer.removeChild(this.host.nativeElement, this.children.first.nativeElement);
    // //this.renderer.removeChild(this.host.nativeElement, this.children.first.nativeElement);

    // console.log(this.host)
    // this.renderer.appendChild(this.host.nativeElement, this.children.first.nativeElement)
  }

  retornaListaSubItensAdministrativo() {
    let listaSubItens = [];
    debugger
    if(this.administrador == true){
      let subItem1 = new NavItem();
      subItem1.displayName = 'Administrar acessos';
      subItem1.iconName = 'list';
      // subItem1.id = "";
      subItem1.route = '/wiki/administrar-acessos';
      listaSubItens.push(subItem1);
    }
    let subItem2 = new NavItem();
    subItem2.displayName = 'Administrar conteúdo';
    subItem2.iconName = 'list';
    // subItem2.id = "";
    subItem2.route = '/wiki/administrar-conteudo';
    listaSubItens.push(subItem2);
    let subItem3 = new NavItem();
    subItem3.displayName = 'Administrar estatística';
    subItem3.iconName = 'list';
    // subItem3.id = "";
    subItem3.route = '/wiki/administrar-estatistica';
    listaSubItens.push(subItem3);
    return listaSubItens;
  }
}
