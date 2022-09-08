import { RequestV } from "./requestV.class";

export class ClientLoginData{
    firstName: string;
	lastName: string;
	mobileNumber: string;
	smsCode: string;
	//request: RequestV;
	loginType: number;// 0:PC - 1:Android Web - 2:IOS Web
	deviceId:string;
}