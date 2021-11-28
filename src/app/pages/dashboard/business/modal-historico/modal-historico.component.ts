import { Component, Inject, OnInit } from '@angular/core';
import { Renderer2 } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ArtigoEdicaoDto } from '../model/dtos/artigoEdicaoDto';


export interface DialogData {
  titulo: string
  conteudo: string
}


@Component({
  selector: 'app-modal-historico',
  template: '<div></div>',

})
export class ModalHistoricoComponent implements OnInit {

  artigoEdicao: ArtigoEdicaoDto
  titulo: any
  conteudo: any

  constructor(public dialog: MatDialog,
              private renderer: Renderer2,
              private domSanitizer: DomSanitizer) { }

  ngOnInit(): void {
    //this.openDialog();
  }

  openDialog(artigoEdicao: ArtigoEdicaoDto): void {

    this.titulo = this.tratarAncoraConteudo(artigoEdicao.artigoTitulo);
    this.conteudo = this.tratarAncoraConteudo(artigoEdicao.edicaoConteudo);
    const dialogRef = this.dialog.open(ModalHistoricoComponentDialog, {
      width: '100%',
      height: '90%',
      panelClass: 'container',
      data: {titulo: this.titulo, conteudo: this.conteudo}
    });
  }

  onNoClick(){

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

}


@Component({
  selector: 'app-modal-historico-dialog',
  templateUrl: './modal-historico.component.html',
  styleUrls: ['./modal-historico.component.scss']
})
export class ModalHistoricoComponentDialog implements OnInit {

  constructor(public dialogRef: MatDialogRef<ModalHistoricoComponentDialog>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }



}

