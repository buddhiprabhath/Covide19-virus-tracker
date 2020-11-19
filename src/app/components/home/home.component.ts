import { GlobalDataSummary } from './../../modals/global-data';
import { DataServiceService } from './../../services/data-service.service';
import { Component, OnInit } from '@angular/core';
import { GoogleChartInterface } from 'ng2-google-charts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  totalConfirmed = 0;
  totalActive = 0;
  totalDeaths = 0;
  totalRecovered = 0;
  globalData :GlobalDataSummary[];
  pieChart: GoogleChartInterface ={
     chartType : 'PieChart'
  }
  columnChart: GoogleChartInterface ={
    chartType : 'columnChart'
 }

  constructor(private dataService: DataServiceService) { }

initChart(caseType:string){

  let datatable =[];
  datatable.push(["Country","Cases"])
  this.globalData.forEach(cs => {
    let value : number;
    if(caseType == 'c')
      if(cs.confirmed > 500000)
      value = cs.confirmed  

    if(caseType == 'd')
      if(cs.deaths > 100000)
      value =cs.deaths  

    if(caseType == 'r')
      if(cs.recovered > 500000)
      value = cs.recovered 

    if(caseType == 'a')
      if(cs.active > 500000)
       value = cs.active


       datatable.push([
         cs.country,value
       ])
    
    })

  console.log(datatable);


  this.pieChart ={
    chartType: 'PieChart',
    dataTable: datatable,
    //firstRowIsData: true,
  options: {
    height:500
  },
  };
  this.columnChart ={
    chartType: 'ColumnChart',
    dataTable: datatable,
    //firstRowIsData: true,
  options: {
    height:500
  },
  };
}

  ngOnInit(): void {
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
    this.initChart('c');
  }
 })

  }

  updateChart(input: HTMLInputElement) {
    console.log(input.value);
    this.initChart(input.value)
  }  

}
