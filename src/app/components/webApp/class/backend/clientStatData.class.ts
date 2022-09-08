import { Message } from "./mesage.class";

export class ClientStatData{

    error:Message;
    startDate:string;
    endDate:string;
    totalCountPerUser:number;
    totalOnProgressCountPerUser:number;
    totalFinishedCountPerUser:number;
    totalCanceledCountPerUser:number;
    totalExpiredCountPerUser:number;
    totalPaymentCountPerUser:number;

}