import { userCat3CommentDto } from './UserCat3Comment.class';
import { TypeInfo } from './../webApp/class/backend/typeInfo.class';
import { JobCategory3V } from "./jobCategory3V.class";
import { C3SeoQuestion } from "./C3SeoQuestion.class";
import { CDashboardDiscount } from "./CDashboardDiscount.class";
import { priceInfoSeo } from "./priceInfoSeo.class";

export class C3Seo{
    jobCategory3: JobCategory3V;
	titleSeo: string;
	descriptionSeo: string;
	imageHeader: string;
	altImage: string;
	headerTxtH1: string;
	headerTxtH2: string;
	introductionTxt: string;
	questionsTitleH2: string;
	questions: C3SeoQuestion[];
	comments: userCat3CommentDto[];
	generalDiscount: CDashboardDiscount;
	firstUseDiscount: CDashboardDiscount;
	otherDiscounts: CDashboardDiscount[];
	priceInfo: priceInfoSeo;
	activeCityList: TypeInfo[];
	htmlDataList: TypeInfo[];
	htmlIndexList: TypeInfo[];
}