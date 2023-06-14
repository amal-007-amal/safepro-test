import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  stateInfo: any[] = [];
  countryInfo: any[] = [];
  cityInfo: any[] = [];

  file:any;

  formConfiguration:{
    FIRSTNAME:string,
    LASTNAME:string,
    PHONE_NUMBER:number,
    EMAIL:string,
    PINCODE:number
  }

  countryName:string='';
  statesData:string='';
  cityData:string='';

  constructor(
    private dataService:DataService
  ) {
    
  }
  ngOnInit(): void {
    this.getCountries()

    this.formConfiguration = {
      FIRSTNAME:'',
      LASTNAME:'',
      PHONE_NUMBER:9656214124,
      EMAIL:'',
      PINCODE:680562
    }
  }

  /**
   * get all the countries
   */
  getCountries(){
    this.dataService.getCountries().
    subscribe(
      data2 => {
        this.countryInfo=data2.Countries;
        console.log('Data:', this.countryInfo);
      }
    )
  }

  /**
   * get all the states
   * @param countryValue 
   */
  onChangeCountry(countryValue:any) {
    let selectedCountry =  countryValue.target.value
    console.log("con",selectedCountry)
    this.stateInfo=this.countryInfo[selectedCountry].States;
    this.cityInfo=this.stateInfo[0].Cities;
    console.log("states ",this.cityInfo);
  }

  /**
   * get all the cities
   * @param stateValue 
   */
  onChangeState(stateValue:any) {
    let selectedState  = stateValue.target.value;
    this.cityInfo=this.stateInfo[selectedState].Cities;
    console.log("cities ",this.cityInfo);
  }


/**
 * submite the form
 */
  onSubmit(form:NgForm){
    console.log("form =",form)
    let payload:any

    form.valid ? payload={
      firstname:form.value.firstname,
      lastname:form.value.lastname,
      file:this.file,
      phonenumber:form.value.phone,
      email:form.value.phone,
      pincode:form.value.pincode,
      countryName:form.value.countryname,
      statename:form.value.statename,
      cityname:form.value.cityname
    } : alert("please fill the form");
    
    console.log("country name",payload)
  }

  getFile(event:any) {
    this.file =  event.target.files[0];
    console.log("file ",this.file)
  }
    


}

