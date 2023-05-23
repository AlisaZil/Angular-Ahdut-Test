import { Component } from '@angular/core';
import { ApiDataService } from '../api-data.service';
import { nationPopulationObj } from '../nationPopulation';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  providers: [ApiDataService]
})
export class TableComponent {
  constructor(private data:ApiDataService){}

  ngOnInit(){
    this.data.getData().subscribe((res:any)=>{

    })
  }
}
