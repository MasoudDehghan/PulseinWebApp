import { Message } from './../../../class/mesage.class';
import { UserV } from "./userV.class";
import { CDashboardActivity } from "./cDashboardActivity.class";
import { PulseV } from "./pulseV.class";
import { CDashboardContent } from './cDashboardContent.class';


export class CDashboardEV {
    user:UserV;
	mostVisitedIds:number[];
	newServicesIds:number[];
	contents:CDashboardContent[];
	urlPayment:string;
	activity:CDashboardActivity;
	inviteLink:string;
	currentTime:string;
	inProgressRequests:PulseV[];
	dbVersion:number;
	requestError:Message;
}
