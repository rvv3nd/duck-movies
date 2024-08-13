import { Component, CUSTOM_ELEMENTS_SCHEMA, Inject, ViewChild } from '@angular/core';
import { MatDialogContent, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RepositoryService } from '../../services/repository.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';



@Component({
  selector: 'app-show-movie',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [MatDialogContent, CommonModule, MatIconModule, 
    MatProgressSpinnerModule, MatProgressBarModule, MatSnackBarModule],
  templateUrl: './show-movie.component.html',
  styleUrl: './show-movie.component.scss'
})
export class ShowMovieComponent {

  imageLoaded = false;
  imageError = false;
  showIcon = false;
  rateAjustado: number = 10;
  fechaDeEstreno: string = '';
  editable = true;
  rate = 0;
  showSendRate = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ShowMovieComponent>,
    private repositoryService: RepositoryService,
    private _snackBar: MatSnackBar
  ) { }


  ngOnInit(){
    this.rateAjustado = Math.round(this.data.vote_average)
    this.fechaDeEstreno = this.formatDateToMonthYear(this.data.release_date);
    console.log(this.data)
  }

  formatDateToMonthYear(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long' };
    let res = date.toLocaleDateString('es-ES', options);
    res = res.charAt(0).toUpperCase() + res.slice(1);
    return res;
  }

  ratingChanged(event: any){
    this.showSendRate = true;
    this.rate = event.detail
    console.log(event, this.rate)
  }

  sendRate(){
      this.editable = false;
      //ajusta el rate de una escala de 1 a 5 a 1 a 10
      this.rate = this.rate * 2;
      this.repositoryService.sendRate(this.data.id, this.rate).subscribe((data)=>{
        if(data.success){
          this._snackBar.open("Calificación envíada", "Cerrar", {
            duration: 2000,
          });
        }else{
          this._snackBar.open("Error al enviar calificación. Intentalo de nuevo más tarde", "Cerrar", {
            duration: 2000,
          })
        }
      })
    }

  close(){
    this.dialogRef.close();
  }

  setLoading(){
    setTimeout(()=>{
      this.imageLoaded = true;
    }, 130)
  }

  onError(){
    this.setLoading();
    this.imageError = true;
  }

}
