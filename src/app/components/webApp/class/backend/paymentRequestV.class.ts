import { Message } from "./mesage.class";

export class PaymentRequestV{
    amount:number;
    description:string;
    callbackURL:string;
    email:string;
    mobile:string;
    status:number;
    authority:string;
    error:Message; 
    paymentLink:string;
}

