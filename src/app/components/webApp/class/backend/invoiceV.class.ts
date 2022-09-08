import { InvoiceItemV } from "./invoiceItemV.class";

export class InvoiceV{
    id:number;
	wage:number;
	transfer:number;
	totalPrice:number;
	items:InvoiceItemV[];
}
