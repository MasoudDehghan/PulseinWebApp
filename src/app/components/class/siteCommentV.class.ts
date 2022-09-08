import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })

export class SiteCommentV{
    firstName:string;
    lastName:string;
    email:string;
    mobileNumber:string;
    workerSupport:boolean;
    message:string;
}