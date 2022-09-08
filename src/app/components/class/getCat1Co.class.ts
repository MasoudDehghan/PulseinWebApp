
import { Cat2CoList } from './cat2CoList.class';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })


export class GetCat1Co{
    cat1Id:number;
    topInfo:string;
    googleTitle:string;
    googleInfo:string;
    image:string;
    description:string;
    subInfo1:string;
    subInfo2:string;
    subInfo3:string;
    cat2CoList:Cat2CoList[];
    Comments:string[];
    cat3IdList:number[];
}
