import { InvoiceV } from "./invoiceV.class";

export class SuggestionV{
    id:number;
	registerTime:string;
	state:string;
	invoice:InvoiceV;
	info:string;
	surveyRequired:boolean;
	currentLat:number;
	currentLong:number;
}