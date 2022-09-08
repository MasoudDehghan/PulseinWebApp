import { DocumentTypeV } from "./documentTypeV.class";

export class DocumentV{
    id:number;
	info:string;
	photo:string;
	verifyFlag:number;
	deleteable:boolean;
	documentType:DocumentTypeV;
}