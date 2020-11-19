import { GlobalDataSummary } from './../../modals/global-data';
import { DataServiceService } from './../../services/data-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {

  totalConfirmed = 0;
  totalActive = 0;
  totalDeaths = 0;
  totalRecovered = 0;
  globalData :GlobalDataSummary[];




  data : GlobalDataSummary[];
  countries : string[] =[];
  constructor(private service: DataServiceService,private dataService: DataServiceService) { }

  ngOnInit(): void {
    this.service.getGlobalData().subscribe(result => {
      this.data = result;
      this. data.forEach(cs => {
        this.countries.push(cs.country)
      })
    })


    this.dataService.getGlobalData()
 .subscribe({

  next: (result)=>{
    console.log(result);   
    this.globalData = result;

    result.forEach(cs => {
      if(!Number.isNaN(cs.confirmed)) {
        this.totalActive += cs.active
        this.totalConfirmed += cs.confirmed
        this.totalDeaths += cs.deaths
        this.totalRecovered += cs.active 
      }

      
    });
  }
 })

 

  }

  updateValues(country : string) {
    console.log(country);
    this.data.forEach(cs =>{
      if(cs.country == country){
        this.totalActive = cs.active
        this.totalDeaths = cs.deaths
        this.totalRecovered = cs.recovered
        this.totalConfirmed = cs.confirmed
      }
    })
  }

}
