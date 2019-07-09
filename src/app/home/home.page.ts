import { Component } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { DomSanitizer, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';
import { isComponentView } from '@angular/core/src/view/util';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  
  urlSafe: SafeResourceUrl;

  lat:number;
  lon:number;
  logs:String[] = [];


  source:SafeUrl;
  url:string;
  sanitizer: any;

  constructor(private geolocation:Geolocation,private _sanitizationService: DomSanitizer) {
   
  }
  
  ngOnInit(): void {

    this.getLocation()

    this.geolocation.getCurrentPosition().then((resp) => {
      this.lat = resp.coords.latitude
      this.lon = resp.coords.longitude
      console.log(`latitude ${this.lat} , longitude ${this.lon}`)
      
      this.url = "https://maps.google.com/maps?width=100%&height=600&hl=es&coord=" + this.lat + "," + this.lon + "&q=Profesor+(Hola)&ie=UTF8&t=&z=14&iwloc=A&output=embed";
      console.log(this.url)
      this.urlSafe= this._sanitizationService.bypassSecurityTrustResourceUrl(this.url)
     }).catch((error) => {
       console.log('Error getting location', error);
     });

    let watch = this.geolocation.watchPosition();
    
    watch.subscribe((data) => {
      this.logs.push("latitud" + data.coords.latitude + " y longitud" + data.coords.longitude)
     });
}

getLocation(){
  this.geolocation.getCurrentPosition().then((resp) => {
    this.lat = resp.coords.latitude
    this.lon = resp.coords.longitude
    console.log(`latitude ${this.lat} , longitude ${this.lon}`)
    
    this.url = "https://maps.google.com/maps?width=100%&height=600&hl=es&coord=" + this.lat+ "," + this.lon + "&q=Profesor+(Hola)&ie=UTF8&t=&z=14&iwloc=A&output=embed";
    this.urlSafe = this._sanitizationService.bypassSecurityTrustResourceUrl(this.url)

   }).catch((error) => {
     console.log('Error getting location', error);
   });
}

}

  


