import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { nationPopulationObj } from './nationPopulation';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiDataService {

  constructor(private http: HttpClient){}

  dataUrl:string = 'https://datausa.io/api/data?drilldowns=Nation&measures=Population'

  getData(): Observable<nationPopulationObj[]> {
    return this.http.get<nationPopulationObj[]>(this.dataUrl);
  }

}