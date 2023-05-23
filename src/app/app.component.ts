import { Component } from '@angular/core';
import { ApiDataService } from './api-data.service';
import { nationPopulationObj } from './nationPopulation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ApiDataService]
})
export class AppComponent {

  constructor(private data:ApiDataService){}

  ngOnInit(){
    this.data.getData().subscribe((res:any)=>{

    })
  }
}
