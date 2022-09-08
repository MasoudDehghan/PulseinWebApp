import { AnswerV } from './answerV.class';
import { UserV } from "./userV.class";
import { RequestGeo } from "./requestGeo.class";
import { RequestTime } from "./requestTime.class";


export class RequestV{
    id: number;
    cat3Id: number;
    code: string;
    client: UserV;
    title: string;
    info: string;
    geoData: RequestGeo;
    timeData: RequestTime;
    photos: string[];
    cancelCause: string;
    discountCode: string;
    answers: AnswerV[];
    cancelCauseIds:number[];
    takhfifanToken:string = null;
}




