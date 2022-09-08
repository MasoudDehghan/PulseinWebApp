import { Cat3QuestionItemV } from "./backend/cat3QuestionItemV.class";

export class Answer{
    questionID:number;
    questionType:number;
    questionText:string;
    answerText:string;
    answerNumber:number;
    answerListItem:Cat3QuestionItemV[];
}