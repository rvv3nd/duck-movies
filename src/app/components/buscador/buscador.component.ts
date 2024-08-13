import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { RepositoryService } from '../../services/repository.service';
import { MatCardModule } from '@angular/material/card';
@Component({
  selector: 'app-buscador',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule],
  templateUrl: './buscador.component.html',
  styleUrl: './buscador.component.scss'
})
export class BuscadorComponent {

  searchText: string = '';
  searchResults: any[] = [];
  top : any[] = [];
  sinResultados = false;
  focus = false;
  onSearchBar = false;
  constructor(
    private repositoryService: RepositoryService
  ) { }
  
    ngOnInit(): void {
      this.top = this.repositoryService.getTop5PeliculasPopulares();
    }

    showMovie(id: number){
      this.repositoryService.isLoading.next(true)
      console.log("Buscando pelicula con id: ", id)
      this.repositoryService.getMovieById(id).then(()=>{
        this.repositoryService.isLoading.next(false)
      })
    }

    onSearch(){
      console.log("Buscando...")
      this.top = [];
      this.searchResults = this.repositoryService.searchPeliculasPopulares(this.searchText);
      this.sinResultados = this.searchResults.length === 0;
      console.log(this.searchResults)
    }

    reset(){
      console.log("Reset...")
      if( this.searchResults.length > 0 ){
        this.searchResults = [];
        this.sinResultados = false;
      }
    }

    onFocus(){
      this.focus = true;
    }

    onInputChange(){
      console.log("Input changed...")
      if( this.searchText === '' ){
        this.reset();
        if(this.top.length == 0){
          this.top = this.repositoryService.getTop5PeliculasPopulares();
        }
      }else{
        if(this.top.length > 0){
          this.top = [];
        }
      }
    }

    onBlur(){
      if( this.searchText === '' ){
        if(this.searchResults.length == 0){
          this.focus = false;
        }
        if(this.top.length > 0){
          this.focus = true
        }
        this.reset();
      }else{
        this.focus = true;
      }
      console.log("Blured...", "searchText: ", this.searchText, " focus: ",this.focus," serachBar: ",this.onSearchBar)

    }
    onClear(){
      if(this.searchText === ''){
        this.top = [];
      }
      console.log("Clearing...")
      this.searchText = '';
      this.onSearchBar = false;
      this.focus = false; 
      console.log("Cleared...", "searchText: ", this.searchText, " focus: ",this.focus," serachBar: ",this.onSearchBar)
    }

}
