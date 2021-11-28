import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-historico-alteracao',
  templateUrl: './modal-historico-alteracao.component.html',
  styleUrls: ['./modal-historico-alteracao.component.scss']
})


export class ModalHistoricoAlteracaoComponent{

  constructor(public dialog: MatDialog) { }

  openDialog() {
    const dialogRef = this.dialog.open(ModalHistoricoAlteracaoDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      (`Dialog result: ${result}`);
    });
  }

}


@Component({
  selector: 'app-modal-historico-alteracao-dialog',
  templateUrl: 'modal-historico-alteracao-dialog.component.html',
})
export class ModalHistoricoAlteracaoDialogComponent {}
