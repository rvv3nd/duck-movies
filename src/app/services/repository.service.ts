import { Injectable } from '@angular/core';
import { MovieService } from './movie.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {

  constructor(private movieService:MovieService) { }

  isLoading: Subject<boolean> = new Subject<boolean>()

  peliculasPopulares:any = []
  peliculasPlayingNow:any = []
  peliculaSeleccionada : Subject<{}> = new Subject<{}>()
  currentPage:number = 1
  currentTotalPages:number = 0
  currentTotalResults:number = 0

  //GET MOVIE POR ID

  async getMovieById(id:number){
    this.movieService.getMovieById(id).subscribe((data)=>{
      this.peliculaSeleccionada.next(data)
    })
  }

  //POPULAR METODOS

  async getPeliculasPopulares(){
    let response  = this.movieService.getMoviesList("popular", this.currentPage)
    response.subscribe((data)=>{
      this.currentPage = data.page
      this.currentTotalPages = data.total_pages
      this.currentTotalResults = data.total_results
      this.peliculasPopulares = data.results
    })
  }

  //PLAYING NOW METODOS

  async getPeliculasPlayingNow(){
    let response  = this.movieService.getMoviesList("now_playing", this.currentPage)
    response.subscribe((data)=>{
      this.currentPage = data.page
      this.currentTotalPages = data.total_pages
      this.currentTotalResults = data.total_results
      this.peliculasPlayingNow = data.results
    })
  }


  // Función genérica para obtener la siguiente página
  async getNextPage(categoria: string) {
    if (this.currentPage < this.currentTotalPages) {
      this.currentPage++;
      if(categoria == "popular") await this.getPeliculasPopulares();
      if(categoria == "now_playing") await this.getPeliculasPlayingNow();
    }
  }

  // Función genérica para obtener la página anterior
  async getPreviousPage(categoria: string) {
    if (this.currentPage > 1) {
      this.currentPage--;
      if(categoria == "popular") await this.getPeliculasPopulares();
      if(categoria == "now_playing") await this.getPeliculasPlayingNow();
    }
  }

  // Función genérica para obtener la primera página
  async getFirstPage(categoria: string) {
    this.currentPage = 1;
    if(categoria == "popular") await this.getPeliculasPopulares();
    if(categoria == "now_playing") await this.getPeliculasPlayingNow();
  }

  // Función genérica para obtener la última página
  async getLastPage(categoria: string) {
    this.currentPage = this.currentTotalPages;
    if(categoria == "popular") await this.getPeliculasPopulares();
    if(categoria == "now_playing") await this.getPeliculasPlayingNow();
  }
  

}
