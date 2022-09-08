import { RequestV } from "./requestV.class";
import { UserV } from "./userV.class";

export class TransactionV{
    id:number;
	amount:number;
	balance:number;
	registerTime:string;
	depositTime:string;
	inc:boolean;
	cash:boolean;
	trackingCode:string;
	request:RequestV;
	user:UserV;
	transactionTypeId:number;
	transactionType:string;
	referenceUser:UserV;
}