import { Injectable } from '@angular/core';
import { CodeList } from '../../components/webApp/class/code.class';

@Injectable({
  providedIn: 'root'
})
export class CustomFunctionsService {

  constructor(private codeList: CodeList) { }

  formatAmountMoney(value:string):string{
    let numberAmount:string = value.toString();
    let str:string[] = numberAmount.split('');
    let res:string = '';
    str = str.reverse();
    for(let i = str.length-1; i >= 0; i--){
      if((i+1)%3 == 0 && (i+1)<str.length){
        res = str[i] + ',' + res;
      }
      else{
        res = str[i] + res;
      }
    }
    let tempStr:string[] = res.split('');
    str = [];
    str = tempStr.reverse();
    let finalResult: string = '';
    for(let i = 0; i < str.length; i++){
      finalResult = finalResult + str[i];
    }
    return finalResult;
  }//end formatAmountMoney

  chanageNumbersToEnglish(inputNumber:string):string{
    let splitInput = inputNumber.split('');
    let temp:string = "";
    for(let i = 0; i < splitInput.length; i++){
        if(splitInput[i] == "1" || splitInput[i] == "۱"){
          temp = temp + "1";
        }
        else if(splitInput[i] == "2" || splitInput[i] == "۲"){
          temp = temp + "2";
        }
        else if(splitInput[i] == "3" || splitInput[i] == "۳"){
          temp = temp + "3";
        }
        else if(splitInput[i] == "4" || splitInput[i] == "۴"){
          temp = temp + "4";
        }
        else if(splitInput[i] == "5" || splitInput[i] == "۵"){
          temp = temp + "5";
        }
        else if(splitInput[i] == "6" || splitInput[i] == "۶"){
          temp = temp + "6";
        }
        else if(splitInput[i] == "7" || splitInput[i] == "۷"){
          temp = temp + "7";
        }
        else if(splitInput[i] == "8" || splitInput[i] == "۸"){
          temp = temp + "8";
        }
        else if(splitInput[i] == "9" || splitInput[i] == "۹"){
          temp = temp + "9";
        }
        else if(splitInput[i] == "0" || splitInput[i] == "۰"){
          temp = temp + "0";
        }
    }
    return temp;
  }//end chanageNumbersToEnglish

  chanageNumbersToFarsi(inputNumber:string):string{
    let splitInput = inputNumber.split('');
    let temp:string = "";
    for(let i = 0; i < splitInput.length; i++){
        if(splitInput[i] == "1" || splitInput[i] == "۱"){
          temp = temp + "۱";
        }
        else if(splitInput[i] == "2" || splitInput[i] == "۲"){
          temp = temp + "۲";
        }
        else if(splitInput[i] == "3" || splitInput[i] == "۳"){
          temp = temp + "۳";
        }
        else if(splitInput[i] == "4" || splitInput[i] == "۴"){
          temp = temp + "۴";
        }
        else if(splitInput[i] == "5" || splitInput[i] == "۵"){
          temp = temp + "۵";
        }
        else if(splitInput[i] == "6" || splitInput[i] == "۶"){
          temp = temp + "۶";
        }
        else if(splitInput[i] == "7" || splitInput[i] == "۷"){
          temp = temp + "۷";
        }
        else if(splitInput[i] == "8" || splitInput[i] == "۸"){
          temp = temp + "۸";
        }
        else if(splitInput[i] == "9" || splitInput[i] == "۹"){
          temp = temp + "۹";
        }
        else if(splitInput[i] == "0" || splitInput[i] == "۰"){
          temp = temp + "۰";
        }
    }
    return temp;
  }//end chanageNumbersToFarsi

  decodingNumber(encodeNumber:string):string{
    let i0:string[] = this.codeList.i0;
    let i1:string[] = this.codeList.i1;
    let i2:string[] = this.codeList.i2;
    let i3:string[] = this.codeList.i3;
    let i4:string[] = this.codeList.i4;
    let i5:string[] = this.codeList.i5;
    let i6:string[] = this.codeList.i6;
    let i7:string[] = this.codeList.i7;
    let i8:string[] = this.codeList.i8;
    let i9:string[] = this.codeList.i9;
    let splitArray:string[] = encodeNumber.split("");
    let decodeNumber:string = '';
    for(let i= 0; i < encodeNumber.length; i++){
      if(i0.indexOf(splitArray[i]) != -1){
        decodeNumber = decodeNumber + '0';
      }
      else if(i1.indexOf(splitArray[i]) != -1){
        decodeNumber = decodeNumber + '1';
      }
      else if(i2.indexOf(splitArray[i]) != -1){
        decodeNumber = decodeNumber + '2';
      }
      else if(i3.indexOf(splitArray[i]) != -1){
        decodeNumber = decodeNumber + '3';
      }
      else if(i4.indexOf(splitArray[i]) != -1){
        decodeNumber = decodeNumber + '4';
      }
      else if(i5.indexOf(splitArray[i]) != -1){
        decodeNumber = decodeNumber + '5';
      }
      else if(i6.indexOf(splitArray[i]) != -1){
        decodeNumber = decodeNumber + '6';
      }
      else if(i7.indexOf(splitArray[i]) != -1){
        decodeNumber = decodeNumber + '7';
      }
      else if(i8.indexOf(splitArray[i]) != -1){
        decodeNumber = decodeNumber + '8';
      }
      else if(i9.indexOf(splitArray[i]) != -1){
        decodeNumber = decodeNumber + '9';
      }
    }
    return decodeNumber;
  }//end decodingNumber

  makeStarScore(score:number):number[]{
    let offer_stars:number[] = [];
    if(score < 0.5){
      for(let i = 0; i < 5; i++){
        offer_stars[i] = 0;
      }
    }
    else if(score >= 0.5 && score < 1){
      offer_stars[0] = 0.5;
      for(let i = 1; i < 5; i++){
        offer_stars[i] = 0;
      }
    }
    else if(score >= 1 && score < 1.5){
      offer_stars[0] = 1;
      for(let i = 1; i < 5; i++){
        offer_stars[i] = 0;
      }
    }
    else if(score >= 1.5 && score < 2){
      for(let j = 0; j < 1; j++){
        offer_stars[j] = 1;
      }
      offer_stars[1] = 0.5;
      for(let i = 2; i < 5; i++){
        offer_stars[i] = 0;
      }
    }
    else if(score >= 2 && score < 2.5){
      for(let j = 0; j < 2; j++){
        offer_stars[j] = 1;
      }
      for(let i = 2; i < 5; i++){
        offer_stars[i] = 0;
      }
    }
    else if(score >= 2.5 && score < 3){
      for(let j = 0; j < 2; j++){
        offer_stars[j] = 1;
      }
      offer_stars[2] = 0.5;
      for(let i = 3; i < 5; i++){
        offer_stars[i] = 0;
      }
    }
    else if(score >= 3 && score < 3.5){
      for(let j = 0; j < 3; j++){
        offer_stars[j] = 1;
      }
      for(let i = 3; i < 5; i++){
        offer_stars[i] = 0;
      }
    }
    else if(score >= 3.5 && score < 4){
      for(let j = 0; j < 3; j++){
        offer_stars[j] = 1;
      }
      offer_stars[3] = 0.5;
      for(let i = 4; i < 5; i++){
        offer_stars[i] = 0;
      }
    }
    else if(score >= 4 && score < 4.5){
      for(let j = 0; j < 4; j++){
        offer_stars[j] = 1;
      }
      for(let i = 4; i < 5; i++){
        offer_stars[i] = 0;
      }
    }
    else if(score >= 4.5 && score < 5){
      for(let j = 0; j < 4; j++){
        offer_stars[j] = 1;
      }
      offer_stars[4] = 0.5;
    }
    else if(score >= 5){
      for(let j = 0; j < 5; j++){
        offer_stars[j] = 1;
      }
    }
    return offer_stars;
  }//end makeStarScore


  checkCharIsNumber(char:String):boolean{
    if(char == '0' || char == '1' || char == '2' || char == '3' || char == '4' || char == '5' || char == '6' || char == '7' || char == '8' || char == '9'
      || char == '۰' || char == '۱' || char == '۲' || char == '۳' || char == '۴' || char == '۵' || char == '۶' || char == '۷' || char == '۸' || char == '۹'){

        return true;
    }
    else{
      return false;
    }
  }//end checkCharIsNumber

  encodingNumber(numberInput:string):string{
    let i0:string[] = this.codeList.i0;
    let i1:string[] = this.codeList.i1;
    let i2:string[] = this.codeList.i2;
    let i3:string[] = this.codeList.i3;
    let i4:string[] = this.codeList.i4;
    let i5:string[] = this.codeList.i5;
    let i6:string[] = this.codeList.i6;
    let i7:string[] = this.codeList.i7;
    let i8:string[] = this.codeList.i8;
    let i9:string[] = this.codeList.i9;
    let selectorIndex:number = Math.floor(Math.random()*6); 
    let splitArray:string[] = numberInput.split("");
    let encodeNumber:string = '';
    for(let i=2; i < numberInput.length; i++){
      if(splitArray[i]=='0' || splitArray[i]=='۰'){
        encodeNumber = encodeNumber + i0[selectorIndex];
      }
      else if(splitArray[i]=='1' || splitArray[i]=='۱'){
        encodeNumber = encodeNumber + i1[selectorIndex];
      }
      else if(splitArray[i]=='2' || splitArray[i]=='۲'){
        encodeNumber = encodeNumber + i2[selectorIndex];
      }
      else if(splitArray[i]=='3' || splitArray[i]=='۳'){
        encodeNumber = encodeNumber + i3[selectorIndex];
      }
      else if(splitArray[i]=='4' || splitArray[i]=='۴'){
        encodeNumber = encodeNumber + i4[selectorIndex];
      }
      else if(splitArray[i]=='5' || splitArray[i]=='۵'){
        encodeNumber = encodeNumber + i5[selectorIndex];
      }
      else if(splitArray[i]=='6' || splitArray[i]=='۶'){
        encodeNumber = encodeNumber + i6[selectorIndex];
      }
      else if(splitArray[i]=='7' || splitArray[i]=='۷'){
        encodeNumber = encodeNumber + i7[selectorIndex];
      }
      else if(splitArray[i]=='8' || splitArray[i]=='۸'){
        encodeNumber = encodeNumber + i8[selectorIndex];
      }
      else if(splitArray[i]=='9' || splitArray[i]=='۹'){
        encodeNumber = encodeNumber + i9[selectorIndex];
      }
    }
    return encodeNumber;
  }// end encodingNumber

  farsiStringMonth(digMonth:string):string{
    let stringMonth_fa:string = "";
    switch(digMonth){
      case "01":
        stringMonth_fa = "فروردین";
        break;
      case "02":
        stringMonth_fa = "اردیبهشت";
        break;
      case "03":
        stringMonth_fa = "خرداد";
        break;
      case "04":
        stringMonth_fa = "تیر";
        break;
      case "05":
        stringMonth_fa = "مرداد";
        break;
      case "06":
        stringMonth_fa = "شهریور";
        break;
      case "07":
        stringMonth_fa = "مهر";
        break;
      case "08":
        stringMonth_fa = "آبان";
        break;
      case "09":
        stringMonth_fa = "آذر";
        break;
      case "10":
        stringMonth_fa = "دی";
        break;
      case "11":
        stringMonth_fa = "بهمن";
        break;
      case "12":
        stringMonth_fa = "اسفند";
        break;
      default:
        console.log("ماه شمسی با این ورودی نداریم");
    }
    return stringMonth_fa;
  }//farsiStringMonth

  distance(userLat:number, userLng:number, workerLat:number, workerLng:number):number{
    let x:number = Math.pow(userLat-workerLat , 2);
    let y:number = Math.pow(userLng-workerLng , 2);
    let dist:number = Math.sqrt(Math.abs(x+y));
    let res:number = Math.floor(dist*11500)/100;
    return res;  
  }//end distance

}
