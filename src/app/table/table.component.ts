import { Component, OnInit } from '@angular/core';
import { ApiDataService } from '../api-data.service';
import { nationPopulationObj } from '../nationPopulation';
import { elementAt } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  providers: [ApiDataService]
})
export class TableComponent implements OnInit{

  constructor(private data:ApiDataService){}

  nationPopulationData: any[] = [];
  isAscending:boolean = false;

  ngOnInit(){
    this.data.getData().subscribe((res:any)=>{
      this.nationPopulationData = res.data;
      this.addPopulationGrowth();
    })
  }

  sortTableByYear(order:boolean){
   this.nationPopulationData.sort((a, b) =>{
    return order? Number(a.Year) - Number(b.Year): Number(b.Year) - Number(a.Year);
   })
  }
  
  addPopulationGrowth(){
    this.nationPopulationData.forEach((element:any, i:number) =>{

      if(i+1 !== this.nationPopulationData.length){
        let lastYearPopulation = this.nationPopulationData[i+1].Population;
        element['P_Growth'] = (element.Population - lastYearPopulation)/lastYearPopulation * 100
      }
      else{
        element['P_Growth'] = 0;
      }

    })
  }
  
}
