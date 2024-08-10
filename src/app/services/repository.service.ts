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
  currentPagePP:number = 1
  currentPagePN:number = 1
  currentTotalPagesPP:number = 0
  currentTotalPagesPN:number = 0
  currentTotalResultsPP:number = 0
  currentTotalResultsPN:number = 0

  //GET MOVIE POR ID

  async getMovieById(id:number){
    this.movieService.getMovieById(id).subscribe((data)=>{
      this.peliculaSeleccionada.next(data)
    })
  }

  //POPULAR METODOS

  async getPeliculasPopulares(){
    let response  = this.movieService.getMoviesList("popular", this.currentPagePP)
    response.subscribe((data)=>{
      this.currentPagePP = data.page
      this.currentTotalPagesPP = data.total_pages
      this.currentTotalResultsPP = data.total_results
      this.peliculasPopulares = data.results
    })
  }

  //PLAYING NOW METODOS

  async getPeliculasPlayingNow(){
    let response  = this.movieService.getMoviesList("now_playing", this.currentPagePN)
    response.subscribe((data)=>{
      this.currentPagePN = data.page
      this.currentTotalPagesPN = data.total_pages
      this.currentTotalResultsPN = data.total_results
      this.peliculasPlayingNow = data.results
    })
  }


  // Función genérica para obtener la siguiente página
  async getNextPage(categoria: string) {

    if(categoria == "popular"){
      if(this.currentPagePP < this.currentTotalPagesPP) this.currentPagePP++;
      else this.currentPagePP = 1;
      await this.getPeliculasPopulares();
    } 
      
    else if(categoria == "now_playing") {
      if(this.currentPagePN < this.currentTotalPagesPN) this.currentPagePN++;
      else this.currentPagePN = 1;
      await this.getPeliculasPlayingNow();
    }
  
  }

  // Función genérica para obtener la página anterior
  async getPreviousPage(categoria: string) {
    if (categoria == "popular") {
      if (this.currentPagePP > 1) {
        this.currentPagePP--;
        await this.getPeliculasPopulares();
      }
    }
      
    else if (categoria == "now_playing") {
      if (this.currentPagePN > 1) {
        this.currentPagePN--;
        await this.getPeliculasPlayingNow();
      }
    }
  }

  // Función genérica para obtener la primera página
  async getFirstPage(categoria: string) {
    if (categoria == "popular") {
      this.currentPagePP = 1;
      await this.getPeliculasPopulares();
    }
      
    else if (categoria == "now_playing") {
      this.currentPagePN = 1;
      await this.getPeliculasPlayingNow();
    }
  }

  // Función genérica para obtener la última página
  async getLastPage(categoria: string) {
    if (categoria == "popular") {
      this.currentPagePP = this.currentTotalPagesPP;
      await this.getPeliculasPopulares();
    }
      
    else if (categoria == "now_playing") {
      this.currentPagePN = this.currentTotalPagesPN;
      await this.getPeliculasPlayingNow();
    }
  }

}
