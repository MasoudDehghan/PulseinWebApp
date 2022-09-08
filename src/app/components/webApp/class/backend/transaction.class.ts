import { Message } from "./mesage.class";
import { RequestV } from "./requestV.class";
import { UserV } from "./userV.class";
import { TransactionType } from "./transactionType.class";

export class Transaction{
    id:number;
    amount:number;
    balance:number;
    error:Message;
    registerTime:string;
    registerTimeS:string;
    inc:boolean;
    cash:boolean;
    trackingCode:string;
    request:RequestV;
    user:UserV;
    type:TransactionType;
    referenceUser:UserV;
}

