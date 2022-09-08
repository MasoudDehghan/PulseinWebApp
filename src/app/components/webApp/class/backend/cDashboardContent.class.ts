import { CDashboardBanner } from './cDashboardBanner.class';
import { CDashboardDiscount } from './../../../class/CDashboardDiscount.class';
import { CDashboardCat3Info } from './cDashboardCat3Info.class';

export class CDashboardContent{
    type: number; // 1: Banner, 2: jobCat3 List, 3: Discount List
    title: string;
    bannerList: CDashboardBanner[];
    cat3Ids: number[];
    cat3List: CDashboardCat3Info[]; //Web Only
    discountList: CDashboardDiscount[];
}
