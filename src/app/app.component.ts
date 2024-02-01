import { TypesDialog } from './types-dialog';

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor(public dialog: MatDialog) {
    let types = localStorage.getItem('types');
    let dies = localStorage.getItem('dies');

    if (types) {
      this.types = JSON.parse(types);
    } else {
      this.types = [
        { name: 'Charisma', value: 1 },
        { name: 'Constitution', value: 1 },
        { name: 'Dexterity', value: 1 },
        { name: 'Intelligence', value: 1 },
        { name: 'Strength', value: 1 },
        { name: 'Wisdom', value: 1 },
      ];
    }
  }

  title = 'Die Roller';

  types: { name: string; value: number }[];
  dies: { name: string; value: number }[] = [
    { name: 'D4', value: 4 },
    { name: 'D6', value: 6 },
    { name: 'D8', value: 8 },
    { name: 'D10', value: 10 },
    { name: 'D12', value: 12 },
    { name: 'D20', value: 20 },
  ];

  selected: { type: number; die: number; advantage: boolean } = {
    type: 0,
    die: 0,
    advantage: false,
  };

  rolled: number = 0;
  advantage: number = 0;

  math = Math;

  // FUNCTIONS
  updateTypes() {
    const dialogRef = this.dialog.open(TypesDialog, {
      data: {
        // Give deep copy
        types: this.types.map((type) => ({ ...type })),
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.types = result;
        this.rolled = 0;

        localStorage.setItem('types', JSON.stringify(this.types));
      }
    });
  }

  updateType(index: number) {
    this.selected.type = index;
    this.rolled = 0;
  }

  updateDie(index: number) {
    this.selected.die = index;
    this.rolled = 0;
  }

  roll() {
    this.rolled =
      Math.floor(Math.random() * this.dies[this.selected.die].value) + 1;

    if (this.selected.advantage) {
      console.log(this.advantage);
      this.advantage =
        Math.floor(Math.random() * this.dies[this.selected.die].value) + 1;
      console.log(this.advantage);
    } else {
      this.advantage = 0;
    }
  }
}
