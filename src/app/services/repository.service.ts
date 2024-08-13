import { Injectable } from '@angular/core';
import { MovieService } from './movie.service';
import { Observable, Subject } from 'rxjs';

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

  //GET las primeras 5 películas populares
  getTop5PeliculasPopulares() {
    return this.peliculasPopulares.slice(0, 5);
  }

  //POPULAR METODOS 

  async getPeliculasPopulares(){
    let response  = this.movieService.getMoviesList("popular", this.currentPage)
    response.subscribe((data)=>{
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


  //MeTODOS de busqueda
  searchPeliculasPopulares(searchText: string): any[] {
    return this.peliculasPopulares.filter((pelicula: any) =>
      pelicula.title.toLowerCase().includes(searchText.toLowerCase())
    );
  }

  //funcion para enviar evaluacion de una pelcua por su id 
  sendRate(id: number, rate: number): Observable<any> {
    return this.movieService.rateMovie(id, rate);
  }


  // Función genérica para obtener la siguiente página, página anterior, primera página o última página
  async getPage(categoria: string, action: string) {
    console.log("getPage", categoria, action);
    if (categoria == "now_playing") {
      if (action == "next") {
        if (this.currentPage < this.currentTotalPages) this.currentPage++;
        else this.currentPage = 1;
      } else if (action == "previous") {
        if (this.currentPage > 1) this.currentPage--;
      } else if (action == "first") {
        this.currentPage = 1;
      } else if (action == "last") {
        this.currentPage = this.currentTotalPages;
      }
      await this.getPeliculasPlayingNow();
    }
  }
  

}
