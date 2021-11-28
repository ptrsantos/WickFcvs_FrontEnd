import { Component, Inject, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { DexieService } from 'src/app/utils/dexieService/dexieService';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TemaDto } from '../../../model/dtos/temaDto';



export interface DialogData {
  titulo: string
}

@Component({
  selector: 'app-modal-edicao-vinculo',
  template: '<div></div>'
})
export class ModalEdicaoVinculoComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {

  }

  openDialog(tema: TemaDto) {
    const dialogRef = this.dialog.open(ModalEdicaoVinculoDialogComponent, {
    width: '100%',
    height: '70%',
    panelClass: 'container',
    data: {titulo: tema.titulo}
  });
}

}

@Component({
  selector: 'app-modal-edicao-vinculo-dialog',
  templateUrl: 'modal-edicao-vinculo.component.html',
})
export class ModalEdicaoVinculoDialogComponent implements OnInit {

  todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];

  done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];

  constructor(public dialogRef: MatDialogRef<ModalEdicaoVinculoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private dexieService: DexieService) { }


    ngOnInit(): void {
      this.dexieService.tabelaTemasDto.toArray()
      .then(temas => {
        let listaTemasAux = temas.sort((a, b) => a.titulo.localeCompare(b.titulo))
        let temaAux = listaTemasAux.filter(tema => tema.id == '1')
        let indiceInicial = listaTemasAux.indexOf(temaAux[0])
        // let listaTemas = this.mudarPosicao(listaTemasAux, indiceInicial, 0)
        // this.listaTemas = listaTemas;
        // if (this.listaTemas.length > 0) {
        //   this.preencheNavItens();
        // }
      })
      .catch(error => (error))
    }

    drop(event: CdkDragDrop<string[]>) {

      (event)
      if (event.previousContainer === event.container) {
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      } else {
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex,
        );
      }
    }

    onNoClick(): void {
      this.dialogRef.close();
    }

    cancelar(){
      this.dialogRef.close();
    }

    salvar(){
      //(this.inputTema.nativeElement.value)
    }
}
