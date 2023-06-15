import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { EmailService } from 'src/app/services/email.service';
import { ToasterService } from 'src/app/services/toaster.service';

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
    PINCODE:number,
    FILE:any
  }

  countryName:string='';
  statesData:string='';
  cityData:string='';

  constructor(
    private dataService:DataService,
    private toastr:ToasterService,
    private emailService:EmailService,
  ) {
    
  }
  ngOnInit(): void {
    this.getCountries()
    this.toastr.showInfo("welcom","jobhire")
    this.formConfiguration = {
      FIRSTNAME:'',
      LASTNAME:'',
      PHONE_NUMBER:9656214124,
      EMAIL:'',
      PINCODE:680562,
      FILE:[],
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
    console.log("cities ",this.cityInfo);
    console.log("states ",this.stateInfo);
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

    console.log(this.countryInfo)
    console.log(this.stateInfo)
    console.log(this.cityInfo)

    const fileData = new FormData();
    fileData.append("file",this.file,this.file.name)

    if(form.valid){
      payload={
        firstname:form.value.firstname,
        lastname:form.value.lastname,
        file:this.file,
        phonenumber:form.value.phone,
        email:form.value.phone,
        pincode:form.value.pincode,
        countryName:this.countryInfo.find((item,index)=>form.value.countryname == index).CountryName,
        statename:this.stateInfo.find((item,index)=>form.value.statename == index).StateName,
        cityname:this.cityInfo.find((item,index)=>form.value.cityname == index)
    }

    //call the api to post the data 
    this.emailService.sendDetailTomail(payload).subscribe((response)=>{
      console.log("response =",response)
      if(response!=""){
        this.toastr.showSuccess("form","successfull")
      }
    })
    }else{

      payload = {}
      this.toastr.showError("form not valid","fill all fields")

    }
    
    console.log("country name",payload)
  }

  getFile(event:any) {
    let checkFileSize:number = 2147483648;
    this.file =  event.target.files[0];
    
    console.log("file ",this.file)

    console.log("file details ",this.file.size,this.file.type)

    if(this.file.size <= checkFileSize){
      this.toastr.showSuccess(" file upload","successful")
    } else{
        console.log(this.file.size,checkFileSize);
        this.file = []; 
        this.formConfiguration.FILE = []
        this.toastr.showWarning("file size more than","2mb")
    }

  }

}

