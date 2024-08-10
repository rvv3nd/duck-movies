import { Component, CUSTOM_ELEMENTS_SCHEMA, Inject, ViewChild } from '@angular/core';
import {MatDialogContent, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { __values } from 'tslib';

@Component({
  selector: 'app-show-movie',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [MatDialogContent, CommonModule, MatIconModule, MatProgressSpinnerModule, MatProgressBarModule],
  templateUrl: './show-movie.component.html',
  styleUrl: './show-movie.component.scss'
})
export class ShowMovieComponent {
[x: string]: any;
  imageLoaded = false;
  rateAjustado: number = 10;
  fechaDeEstreno: string = '';
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ShowMovieComponent>
  ) { }


  ngOnInit(){
    this.rateAjustado = Math.round(this.data.vote_average)
    this.fechaDeEstreno = this.formatDateToMonthYear(this.data.release_date);
  }

  formatDateToMonthYear(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long' };
    let res = date.toLocaleDateString('es-ES', options);
    res = res.charAt(0).toUpperCase() + res.slice(1);
    return res;
  }

  close(){
    this.dialogRef.close();
  }
  setLoading(){
    setTimeout(()=>{
      this.imageLoaded = true;
    }, 150)
  }
}
