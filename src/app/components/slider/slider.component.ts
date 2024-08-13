import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCard } from '@angular/material/card';
import { MatCardTitle } from '@angular/material/card';
import { RepositoryService } from '../../services/repository.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { ShowMovieComponent } from '../show-movie/show-movie.component';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [CommonModule, MatCard, MatCardTitle, MatPaginatorModule, MatIcon, MatProgressSpinnerModule],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss'
})

export class SliderComponent {

  @Input() title: string ='';
  @Input() items: any[] = [];
  category: string = ""
  imageLoaded = false;
  paginatorVisible = true;

  constructor(
    public repository: RepositoryService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    //if(this.title == "Peliculas populares") this.category = "popular"
    if(this.title == "+ Vistas") this.category = "now_playing" //Dependiendo del titulo del slider, se asigna la categoria correspondiente, se podria mapear con un objeto
    this.controlModal(); //inicia la escucha de la variable peliculaSeleccionada

  }

  handleCardClick(id: number){
    this.repository.isLoading.next(true)
    this.repository.getMovieById(id).then(()=>{
      this.repository.isLoading.next(false)
    })
  }

  togglePaginator() {
    this.paginatorVisible = !this.paginatorVisible;
  }


  //Funcion que se ejecuta cuando se cambia de pagina en el paginador usando componentes de angular material
  // onPageEvent(event: PageEvent) {
  //   if (event.previousPageIndex !== undefined && event.pageIndex < event.previousPageIndex) {
  //     this.repository.getPage(this.category,'previous');
  //   } else {
  //     this.repository.getPage(this.category,'next');
  //   }
  // }


  // Funciones para el paginador en el slider sin usar componentes de angular material
  nextPage(){
    this.repository.getPage(this.category,'next');
  }

  previousPage(){
    this.repository.getPage(this.category,'previous');
  }

  firstPage(){
    this.repository.getPage(this.category,'first');
  }

  lastPage(){
    this.repository.getPage(this.category,'last');
  }

  //Funcion que abre un modal con el objeto que se pasa como parametro cuando se selecciona una pelicula en el slider
  controlModal(){
    this.repository.peliculaSeleccionada.subscribe((data:any) => {
      //open Modal aqui con la data actualizada
      if(this.dialog.openDialogs.length == 0){
        //Sii no hay ningun modal abierto, abrimos uno nuevo
        this.dialog.open(ShowMovieComponent, { data: data })
      }
    })
  }

}