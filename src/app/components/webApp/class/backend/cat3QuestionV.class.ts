import { Cat3QuestionItemV } from "./cat3QuestionItemV.class";

export class Cat3QuestionV{

    id:number;
    title:string;
    type:number;// 0: Radio Button
                // 1: CheckBox
                // 2: String Input
                // 3: Integer Input
    required:boolean;
    unit:string;
    minValue:number;
    maxValue:number;
    items:Cat3QuestionItemV[];

}
