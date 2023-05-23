import { Component, HostListener, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
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

  @Input() isAscending:boolean = true;
  nationPopulationData: nationPopulationObj[] = [];
  isPhone:boolean = false;

  ngOnInit(){
    this.data.getData().subscribe((res:any)=>{
      this.nationPopulationData = res.data;
      this.addPopulationGrowth();
      this.sortTableByYear(this.isAscending);
    })
  }

  ngOnChanges(): void {
    this.sortTableByYear(this.isAscending)
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.isPhone = window.innerWidth <= 500? false: true;
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

  getMaxPopulationValue(){
    return Math.max(...this.nationPopulationData.map(obj => obj['Population']));
  }
}
