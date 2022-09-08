import { Message } from "./mesage.class";
import { RequestV } from "./requestV.class";
import { UserV } from "./userV.class";

export class PaymentRequestDto{

    amount:number;
    description:string;
    callbackURL:string;
    email:string;
    mobile:string;
    status:number;
    authority:string;
    request:RequestV;
    discountCode:string;
    error:Message;
    paymentLink:string;
    paymentDone:boolean;
    user:UserV;
    
}
