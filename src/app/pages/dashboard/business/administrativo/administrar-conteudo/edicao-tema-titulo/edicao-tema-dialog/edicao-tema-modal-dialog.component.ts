import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'

@Component({
  selector: 'app-edicao-tema-modal-dialog',
  templateUrl: './edicao-tema-modal-dialog.component.html',
  styleUrls: ['./edicao-tema-modal-dialog.component.scss']
})
export class EdicaoTemaModalDialogComponent  {

  constructor(
    public dialogRef: MatDialogRef<EdicaoTemaModalDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  cancelar(): void {
    this.dialogRef.close();
  }

  Save(input){
    this.dialogRef.close(input.value)
  }

}
