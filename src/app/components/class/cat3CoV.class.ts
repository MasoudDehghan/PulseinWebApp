import { Cat3CoParagraphV } from "./cat3CoParagraphV.class";
import { JobCategory3V } from "./jobCategory3V.class";

export class Cat3CoV{
    cat3Id: number;
	name: string;
	ename: string
	tumbnail: string;
	info: string; //seo description
	keywords: string[]; //seo keywords
	paragraphs: Cat3CoParagraphV[];
	jobCategory3: JobCategory3V
}
