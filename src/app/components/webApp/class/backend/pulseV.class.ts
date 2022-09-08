import { RequestV } from "./requestV.class";
import { StateV } from "./stateV.class";
import { OfferV } from "./offerV.class";
import { InvoiceV } from "./invoiceV.class";
import { RequestScoreV } from "./requestScoreV.class";
import { RequestSummary } from "./requestSummary.class";
import { TransactionV } from "./transactionV.class";
import { DiscountInfo } from "./discountInfo.class";
import { DiscountCV } from "./discountCV.class";
import { PaymentInfo } from "./paymentInfo.class";

export class PulseV{
    request:RequestV; 
	state:StateV;
	stateHistory:StateV[]; // Not 4 Worker 
	offers:OfferV[]; // Not 4 Worker
	initialOffer:OfferV; // Only 4 Worker
	selectedOffer:OfferV; // Not 4 Worker
	proformaInvoice:InvoiceV;
	finalInvoice:InvoiceV;
	score:RequestScoreV; // Not 4 Worker
	summary:RequestSummary;
	transactions:TransactionV[]; // Not 4 Worker ??
	workingStartTime:String; // Only 4 Worker
	workingEndTime:String; // Only 4 Worker
	discountInfo:DiscountInfo; // Not 4 Worker 
	cashEnable:boolean;
	reservedDiscount:DiscountCV;
	paymentInfo:PaymentInfo;
}