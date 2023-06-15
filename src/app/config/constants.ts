import { Injectable } from "@angular/core";

@Injectable(
    {providedIn:'root'
}
)
export class Constants{
    remoteEndpointUrl:string = "https://raw.githubusercontent.com/sagarshirbhate/Country-State-City-Database/master/Contries.json";
    serverBaseUrl:string="http://localhost:3000";
}