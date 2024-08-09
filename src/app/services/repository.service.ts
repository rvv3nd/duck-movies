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
      console.log(data)
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

  async getPeliculasPopularesNextPage(){
    if(this.currentPage < this.currentTotalPages){
      this.currentPage++
      let response  = this.movieService.getMoviesList("popular", this.currentPage)
      response.subscribe((data)=>{
        this.currentPage = data.page
        this.currentTotalPages = data.total_pages
        this.currentTotalResults = data.total_results
        this.peliculasPopulares = this.peliculasPopulares.concat(data.results)
      })
    }
  }

  async getPeliculasPopularesPreviousPage(){
    if(this.currentPage > 1){
      this.currentPage--
      let response  = this.movieService.getMoviesList("popular", this.currentPage)
      response.subscribe((data)=>{
        this.currentPage = data.page
        this.currentTotalPages = data.total_pages
        this.currentTotalResults = data.total_results
        this.peliculasPopulares = data.results
      })
    }
  }

  async getPeliculasPopularesFirstPage(){
    this.currentPage = 1
    let response  = this.movieService.getMoviesList("popular", this.currentPage)
    response.subscribe((data)=>{
      this.currentPage = data.page
      this.currentTotalPages = data.total_pages
      this.currentTotalResults = data.total_results
      this.peliculasPopulares = data.results
    })
  }

  async getPeliculasPopularesLastPage(){
    this.currentPage = this.currentTotalPages
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

  async getPeliculasPlayingNowNextPage(){
    if(this.currentPage < this.currentTotalPages){
      this.currentPage++
      let response  = this.movieService.getMoviesList("now_playing", this.currentPage)
      response.subscribe((data)=>{
        this.currentPage = data.page
        this.currentTotalPages = data.total_pages
        this.currentTotalResults = data.total_results
        this.peliculasPlayingNow = this.peliculasPlayingNow.concat(data.results)
      })
    }
  }

  async getPeliculasPlayingNowPreviousPage(){
    if(this.currentPage > 1){
      this.currentPage--
      let response  = this.movieService.getMoviesList("now_playing", this.currentPage)
      response.subscribe((data)=>{
        this.currentPage = data.page
        this.currentTotalPages = data.total_pages
        this.currentTotalResults = data.total_results
        this.peliculasPlayingNow = data.results
      })
    }
  }

  async getPeliculasPlayingNowFirstPage(){
    this.currentPage = 1
    let response  = this.movieService.getMoviesList("now_playing", this.currentPage)
    response.subscribe((data)=>{
      this.currentPage = data.page
      this.currentTotalPages = data.total_pages
      this.currentTotalResults = data.total_results
      this.peliculasPlayingNow = data.results
    })
  }

  async getPeliculasPlayingNowLastPage(){
    this.currentPage = this.currentTotalPages
    let response  = this.movieService.getMoviesList("now_playing", this.currentPage)
    response.subscribe((data)=>{
      this.currentPage = data.page
      this.currentTotalPages = data.total_pages
      this.currentTotalResults = data.total_results
      this.peliculasPlayingNow = data.results
    })
  }
  

}
