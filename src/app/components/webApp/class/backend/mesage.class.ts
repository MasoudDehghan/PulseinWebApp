
import { InnerMessage } from './innerMesage.class';
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })

export class Message{
    code:number;
    msg:InnerMessage[];
}