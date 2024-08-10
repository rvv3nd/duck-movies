import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RepositoryService } from '../../services/repository.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SliderComponent } from "../slider/slider.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    SliderComponent
],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(
    public repository:RepositoryService
  ){}
  @ViewChild('sliderpp') sliderpp: ElementRef | undefined;
  @ViewChild('sliderpn') sliderpn: ElementRef | undefined;
  loading = false;

  ngOnInit(){
    this.repository.getPeliculasPopulares().then(()=>{
      //console.log(this.repository.peliculasPopulares)
     
    })
    this.repository.getPeliculasPlayingNow().then(()=>{
      //console.log(this.repository.peliculasPlayingNow)
      
    })



  }

}
