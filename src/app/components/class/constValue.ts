import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
 
export class ConstValue{

    lng: number = 51.370762;
    lat: number = 35.706742;
        
    waitting:string = 'در حال بارگذاری. لطفا منتظر بمانید';
    capchaGoogleKey:string = "6LdLGQcUAAAAAHbxZslAIhONUARIfUuDM7RSBxqq";
    imgLoading:string = "assets/image/loading.gif";

    //ImagesCategories
    ImagesCategoriesPath:string = "assets/image/";
}