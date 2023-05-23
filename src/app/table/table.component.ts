import { Component, OnInit } from '@angular/core';
import { ApiDataService } from '../api-data.service';
import { nationPopulationObj } from '../nationPopulation';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  providers: [ApiDataService]
})
export class TableComponent implements OnInit{

  constructor(private data:ApiDataService){}

  nationPopulationData: nationPopulationObj[] = [];
  isAscending:boolean = false;

  ngOnInit(){

    this.data.getData().subscribe((res:any)=>{

      res.data.forEach((element:nationPopulationObj) => {

          this.nationPopulationData.push(element);

      });
      
    })
  }

  sortTableByYear(order:boolean){
   this.nationPopulationData.sort((a, b) =>{
    return order? Number(a.Year) - Number(b.Year): Number(b.Year) - Number(a.Year);
   })
  }
  
  
}
