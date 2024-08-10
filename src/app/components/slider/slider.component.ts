import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCard } from '@angular/material/card';
import { MatCardTitle } from '@angular/material/card';
import { RepositoryService } from '../../services/repository.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ShowMovieComponent } from '../show-movie/show-movie.component';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [CommonModule, MatCard, MatCardTitle, MatPaginatorModule],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss'
})

export class SliderComponent {
  @Input() title: string ='';
  @Input() items: any[] = [];
  category: string = ""
  constructor(
    public repository: RepositoryService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {

    if(this.title == "Peliculas populares") this.category = "popular"
    if(this.title == "Vistas en estos momentos") this.category = "now_playing"
    
    this.repository.peliculaSeleccionada.subscribe((data:any) => {
      //open Modal aqui con la data actualizada
      if(this.dialog.openDialogs.length == 0){
        //Sii no hay ningun modal abierto, abrimos uno nuevo
        this.dialog.open(ShowMovieComponent, { data: data })
      }
    })

  }

  handleCardClick(id: number){
    this.repository.isLoading.next(true)
    this.repository.getMovieById(id).then(()=>{
      this.repository.isLoading.next(false)
    })
  }

  onPageEvent(event: PageEvent) {
    if (event.previousPageIndex !== undefined && event.pageIndex < event.previousPageIndex) {
      this.repository.getPreviousPage(this.category);
    } else {
      this.repository.getNextPage(this.category);
    }
  }

  //Funcion que abre un modal con el objeto que se pasa como parametro
  openModal(item:any){
        
  }

}