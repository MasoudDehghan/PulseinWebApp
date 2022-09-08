import { FestivalReport } from "./festivalReport.class";
import { FestivalLevelBonus } from "./festivalLevelBonus.class";

export class FestivalResult{
	/*start Login Data*/
	firstName: string;
	lastName: string;
	referalId: number;
	/*end Login Data*/

	//General
	today: number;
	round: number;
    nextValid: boolean;
	nextTime: string;
	remainSeconds: number;

	/*satrt last round*/
	bonus: FestivalLevelBonus;
	/*end last round*/

	//After Answer
	correct: boolean;
	correctAnswerIndex: number;

	//Report
	report: FestivalReport;

	//new
	showAppInfo:boolean;
	showLink:boolean;
	link:string;

	//endGame
	endGame:boolean;
	shwCodes:boolean;
	winnerFirstName:string;
	winnerLastName:string;
	winnerScore:number;
	winnerFirstName2:string;
	winnerLastName2:string;
}

