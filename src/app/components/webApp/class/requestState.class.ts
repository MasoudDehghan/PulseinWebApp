import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class RequestState {
    waitToOffer:number = 1;
    offerTimeFinished:number = 2;
    waitToDo:number = 4;
    waitToPoll:number = 5;
    finished:number = 6;
    canceled:number = 7;
    expired:number = 8;
    ongoing:number = 10;
    canceledByWorker:number = 11;
    waitToPayment:number = 12;
    canceledByOperator:number = 13;
    Wait4DoAck:number = 14;
}