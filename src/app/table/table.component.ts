import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ApiDataService } from '../api-data.service';
import { nationPopulationObj } from '../nationPopulation';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  providers: [ApiDataService]
})
export class TableComponent implements OnInit, OnChanges{

  constructor(private data:ApiDataService){}

  nationPopulationData: nationPopulationObj[] = [];
  @Input() isAscending:boolean = true;

  ngOnInit(){
    this.data.getData().subscribe((res:any)=>{
      this.nationPopulationData = res.data;
      this.addPopulationGrowth();
      this.sortTableByYear(this.isAscending);
    })
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.sortTableByYear(this.isAscending);
  }

  sortTableByYear(order:boolean){
   this.nationPopulationData.sort((a, b) =>{
    return order? Number(a.Year) - Number(b.Year): Number(b.Year) - Number(a.Year);
   })
  }
  
  addPopulationGrowth(){

    this.nationPopulationData.forEach((element:nationPopulationObj, i:number) =>{

      if(i+1 !== this.nationPopulationData.length){
        let lastYearPopulation = this.nationPopulationData[i+1].Population;
        element['P_growth'] = (element.Population - lastYearPopulation)/lastYearPopulation * 100
      }
      else{
        element['P_growth'] = 0;
      }

    })
  }
  
}
