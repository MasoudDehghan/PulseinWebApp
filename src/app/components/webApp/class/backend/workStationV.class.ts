import { TypeInfo } from "./typeInfo.class";
import { WsInfo } from "./wsInfo.class";
import { WsLogo } from "./wsLogo.class";
import { WsTypeInfo } from "./wsTypeInfo.class";
import { WsGeo } from "./wsGeo.class";
import { WsContact } from "./wsContact.class";
import { WorkStationScoreV } from "./workStationScoreV.class";
import { CatalogV } from "./catalogV.class";
import { DocumentV } from "./documentV.class";

export class WorkStationV{
    id:number;
	code:string;
	info:WsInfo;
	logo:WsLogo;
	typeInfo:WsTypeInfo;
	geoInfo:WsGeo;
	contactInfo:WsContact;
	score:WorkStationScoreV;
	registerState:TypeInfo;
	regStateInfo:string;
	catalogs:CatalogV[];
	documents:DocumentV[];
	jobCat1Ids:number[];
}