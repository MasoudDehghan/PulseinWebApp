import { UserV } from "./userV.class";
import { TypeInfo } from "./typeInfo.class";
import { WorkStationV } from "./workStationV.class";
import { PhoneV } from "./phoneV.class";
import { DocumentV } from "./documentV.class";
import { WorkerScoreV } from "./workerScoreV.class";

export class WorkerV{
    id:number;
	code:string;
    active:boolean;
	registerState:TypeInfo;
	regStateInfo:string;
	user:UserV;
	accountNumber:string;
	workStation:WorkStationV;
	experienceStart:string;
	score:WorkerScoreV;
	phones:PhoneV[];
	jobCat3Ids:number[];
	regionIds:number[];
	documents:DocumentV[];
	registerTime:string;
	updateTime:string;
}
