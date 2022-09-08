import { CommercialNotification } from "./backend/commercialNotification.class";

export class NotificationContent{

    title:string;
    typeId:number;
    entityId:number;
    workerApp:boolean;
    isCommercial:boolean;
    commercial:CommercialNotification;
    
}
