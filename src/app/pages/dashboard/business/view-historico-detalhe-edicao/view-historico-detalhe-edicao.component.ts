import { Component, OnInit, Renderer2 } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DashboardService } from '../../services/dashboard.service';
import { ArtigoEdicaoDto } from '../model/dtos/artigoEdicaoDto';

@Component({
  selector: 'app-view-historico-detalhe-edicao',
  templateUrl: './view-historico-detalhe-edicao.component.html',
  styleUrls: ['./view-historico-detalhe-edicao.component.scss']
})
export class ViewHistoricoDetalheEdicaoComponent implements OnInit {

  erros: any[] = []
  artigoEdicao: ArtigoEdicaoDto
  titulo: any
  conteudo: any

  constructor(private activatedRoute: ActivatedRoute,
              private dashboardService: DashboardService,
              private toastrService: ToastrService,
              private renderer: Renderer2,
              private domSanitizer: DomSanitizer,
              private router: Router) { }

  ngOnInit(): void {
    let edicaoId = this.activatedRoute.snapshot.params['id'];
    this.retornaArtigoEdicaoParaVisualizacao(edicaoId)
  }

  retornaArtigoEdicaoParaVisualizacao(edicaoId) {
    this.dashboardService.retornaArtigoEdicaoHistorico(edicaoId).subscribe(
      sucesso => { this.processarSucesso(sucesso) },
      falha => { this.processarFalha(falha) }
    )
  }

  processarSucesso(response) {

    this.erros = [];
    let artigoEdicao: ArtigoEdicaoDto = Object.assign({}, new ArtigoEdicaoDto(), response.data.artigoEdicao)
    this.titulo = this.tratarAncoraConteudo(artigoEdicao.artigoTitulo);
    this.conteudo = this.tratarAncoraConteudo(artigoEdicao.edicaoConteudo);

  }

  processarFalha(fails: any) {
    if(fails.status){
      this.toastrService.error(fails.message.toString(), "Ocorreu um erro:")
    }else{
      this.erros = fails.error.errors;
      this.toastrService.error(this.erros.toString(), "Ocorreu um erro:")
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

  voltar(){
    this.router.navigate([`/wiki/historico`]).then()
  }

}
