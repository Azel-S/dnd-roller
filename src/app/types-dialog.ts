import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import {
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';

export interface DialogData {
  types: { name: string; value: number }[];
}

@Component({
  selector: 'types-dialog',
  templateUrl: './types-dialog.html',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogTitle,
    MatDialogContent,
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatIconModule,
  ],
  styleUrl: './types-dialog.css',
})
export class TypesDialog {
  constructor(
    public dialogRef: MatDialogRef<TypesDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  reset() {
    this.data.types.map((type) => {
      type.value = 1;
    });

    this.dialogRef.close(this.data.types);
  }
}
