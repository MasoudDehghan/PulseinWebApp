import { TimePeriod } from "./timePeriod.class";
import { Cat3QuestionV } from "./cat3QuestionV.class";
import { activeProvinceDto } from "./activeProvinceDto.class";

export class PreRegisterRequestResult{

    haveActiveWorker:boolean;
    day1:string;
    day2:string;
    day3:string;
    day4:string;
    periods:TimePeriod[];
    haveQuestion:boolean;
    questions:Cat3QuestionV[];
    title:string;
    descriptions:string[];
    emergencyEnable:boolean;
    image:string;
    destinationAddressRequired:boolean;
    activeProvinces:activeProvinceDto[];
}
