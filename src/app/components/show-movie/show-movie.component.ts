import { Component, Inject } from '@angular/core';
import {MatDialogContent, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-show-movie',
  standalone: true,
  imports: [MatDialogContent, CommonModule, MatIconModule],
  templateUrl: './show-movie.component.html',
  styleUrl: './show-movie.component.scss'
})
export class ShowMovieComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ShowMovieComponent>
  ) { }
  close(){
    this.dialogRef.close();
  }
}
