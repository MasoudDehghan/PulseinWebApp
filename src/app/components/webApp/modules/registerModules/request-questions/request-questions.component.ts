import { Cat3AnswerV } from './../../../class/backend/cat3AnswerV.class';
import { AnswerV } from './../../../class/backend/answerV.class';
import { Cat3QuestionV } from './../../../class/backend/cat3QuestionV.class';
import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../../../services/shared/shared.service';
import { Router } from '@angular/router';
import { webappHttpService } from '../../../services/http/webapp-http.service';
import { UrlRest } from '../../../../class/urlRest.class';
import { EnumUrls } from '../../../enum/enumUrls.enum';
import { EnumQuestionType } from '../../../enum/enumQuestionType';
import { Cat3QuestionItemV } from '../../../class/backend/cat3QuestionItemV.class';
import { Answer } from '../../../class/answer.class';
import { LocationStrategy } from '@angular/common';

@Component({
  selector: 'app-request-questions',
  templateUrl: './request-questions.component.html',
  styleUrls: ['./request-questions.component.css']
})
export class RequestQuestionsComponent implements OnInit {

  isLoading:boolean = false;
  questionLength:number = 0;
  questionsEnd:boolean = true;
  fixQuestionList:Cat3QuestionV[] = [];
  curentQuestion:Cat3QuestionV = null;
  listQuestions:Cat3QuestionV[] = [];
  listSelectedItems:number[] = [];
  curentAnswer:Answer = null;
  
  isRadioBtn:boolean = false;
  isCheckBox:boolean = false;
  isString:boolean = false;
  isNumber:boolean = false;
  valueNumber:number = -1;
  valueText:string = '';
  isAnswer:boolean = false;
  isErrorInAnswer:boolean = false;
  textError:string = "لطفا پاسخ مناسبی به سوال بدهید. پاسخ فعلی مناسب نیست.";

  jobcat3EName:string = '';
  jobcat3Name:string = '';
  jobcat3Id:number = 0;
  jobcat3Icon:string = '';

  //descriptionsTitile:string = '';
  //descriptionList:string[] = [];
  //imgDescription:string = '';
  showErrorSendAnswer2Server:boolean = false;

  constructor(public shared: SharedService,
    private urlRest: UrlRest,
    private location: LocationStrategy,
    //public constVal: webappConstValue,
    //public storage: StorageService,
    //private toastr: ToastrService,
    //private toastMsg: ToastMessage,
    private httpService: webappHttpService,
    private router: Router){
      this.inConstructor();
  }//end constructor

  ngOnInit() {
    if(this.fixQuestionList){
      this.questionLength = this.fixQuestionList.length;
      if(this.questionLength > 0){
        this.questionsEnd = false;
      }
      if(this.shared.listQuestionsFinished.length > 0){
        this.onBack();
      }
      else{
        this.curentQuestion = this.fixQuestionList[0];
        this.listQuestions[0] = this.curentQuestion;
        this.initListSelectedItems();
        this.checkTypeQuestion();
      }
    }
  }//end ngOnInit

  checkTypeQuestion(){
    this.isRadioBtn = false;
    this.isCheckBox = false;
    this.isString = false;
    this.isNumber = false;
    
    if(this.curentQuestion){
      if(this.curentQuestion.required){
        this.isAnswer = false;
      }
      else{
        this.isAnswer = true; 
      }
  
      if(this.curentQuestion.type == EnumQuestionType.radioBtn){
        this.isRadioBtn = true;
        if(this.curentAnswer){
          let index:number = 0;
          let i:number = 0;
          this.curentQuestion.items.forEach(eleman => {
            if(eleman.id == this.curentAnswer.answerListItem[0].id && eleman.title == this.curentAnswer.answerListItem[0].title){
              index = i;
            }
            i++;
          });
          this.onRadioBtn(this.curentAnswer.answerListItem[0], index);
        }
      }
      else if(this.curentQuestion.type == EnumQuestionType.checkBox){
        this.isCheckBox = true;
        if(this.curentAnswer){
          this.curentAnswer.answerListItem.forEach(item => {
            let index:number = 0;
            let i:number = 0;
            this.curentQuestion.items.forEach(eleman => {
              if(eleman.id == item.id && 
                eleman.title == item.title){
                index = i;
              }
              i++;
            });
            this.onCheckBox(item, index);
          });
        }
      }
      else if(this.curentQuestion.type == EnumQuestionType.stringType){
        this.isString = true;
        if(this.curentAnswer){
          this.valueText = this.curentAnswer.answerText;
          if(this.valueText.length >= this.curentQuestion.minValue && this.valueText.length < this.curentQuestion.maxValue){
            this.isAnswer = true;
          }
        }
        else{
          this.valueText = '';
        }
      }
      else if(this.curentQuestion.type == EnumQuestionType.numberType){
        this.isAnswer = true;
        this.isNumber = true;
        if(this.curentAnswer){
          this.valueNumber = this.curentAnswer.answerNumber;
        }
        else{
          this.valueNumber = this.curentQuestion.minValue;
        }
      }
    }
  }//end checkTypeQuestion


  onNext(){
    /////////////////////////////
    //////////////
    this.isErrorInAnswer = false;
    this.curentAnswer = null;
    if(this.curentQuestion.type == EnumQuestionType.radioBtn || this.curentQuestion.type == EnumQuestionType.checkBox){
      this.valueNumber = -1;
      this.valueText = '';
    }
    else if(this.curentQuestion.type == EnumQuestionType.stringType){
      this.valueNumber = -1;
    }
    else if(this.curentQuestion.type == EnumQuestionType.numberType){
      this.valueText = '';
    }
    /////////////////////////////
    /////////////
    //console.log('لیست آیتم ها');
    //console.log(this.listSelectedItems);
    this.shared.listQuestionsFinished[this.shared.listQuestionsFinished.length] = this.listQuestions[this.listQuestions.length-1];

    //console.log("سوالات جواب داده شده");
    //console.log(this.shared.listQuestionsFinished);

    let ansListItem:Cat3QuestionItemV[] = [];
    if(this.listSelectedItems.length > 0){
      for(let i = 0; i < this.listSelectedItems.length; i++){
        if(this.listSelectedItems[i] != -1){
          ansListItem.push(this.curentQuestion.items[i]);
        }
      }
    }
    let ans:Answer = {
      questionID: this.curentQuestion.id,
      questionType: this.curentQuestion.type,
      questionText: this.curentQuestion.title,
      answerText: this.valueText,
      answerNumber: this.valueNumber,
      answerListItem: ansListItem
    }
    this.shared.listAnswer[this.shared.listAnswer.length] = ans;
    this.valueNumber = -1;
    this.valueText = '';
    //console.log('لیست پاسخ های شما'); 
    //console.log(this.shared.listAnswer);

    
    let listTempQuestion:Cat3QuestionV[] = [];
    for(let i = 0; i < this.listQuestions.length; i++){
      if(this.listQuestions.length > i+1){
        listTempQuestion[i] = this.listQuestions[i];
      }
    }
    this.listQuestions = [];
    this.listQuestions = listTempQuestion;
    listTempQuestion = [];
    
    
    if(this.listSelectedItems.length > 0){
      for(let i = this.listSelectedItems.length-1; i >= 0; i--){
        if(this.listSelectedItems[i] != -1){
          let idItem:number = this.listSelectedItems[i];
          //console.log("آیدی آیتم");
          //console.log(idItem);
          //console.log(this.curentQuestion.items[i].id );
          if(this.curentQuestion.items[i].id == idItem){
            if(this.curentQuestion.items[i].childQuestions.length > 0){
              for(let j=0; j<this.curentQuestion.items[i].childQuestions.length; j++){
                let len:number = this.listQuestions.length;
                this.listQuestions[len] = this.curentQuestion.items[i].childQuestions[j];
              }
            }
          }
        }
      }
    }//end if this.listSelectedItems.length > 0
    //console.log("لیست سوالات");
      //console.log(this.listQuestions);
      if(this.listQuestions.length == 0){
        let nextLevel:number = 0;
        for(let c=0; c<this.fixQuestionList.length; c++){
          for(let k=0; k<this.shared.listQuestionsFinished.length; k++){
            if(this.shared.listQuestionsFinished[k] == this.fixQuestionList[c]){
              nextLevel = c;
            }
          }
        }
        if(nextLevel < this.questionLength-1){
          //console.log("nextLevel : "+nextLevel)
          this.curentQuestion = this.fixQuestionList[nextLevel+1];
          this.listQuestions[0] = this.curentQuestion;
          //console.log("sssssssssssssssssss");
          //console.log("curentQuestion: ");
          //console.log(this.curentQuestion);
          //console.log("fixeQ");
          //console.log(this.fixQuestionList);
          this.initListSelectedItems();
          this.checkTypeQuestion();
        }
        else if(nextLevel == this.questionLength-1){
          let flagEnd:boolean = false;
          this.shared.listQuestionsFinished.forEach(item => {
            if(item == this.fixQuestionList[this.fixQuestionList.length-1]){
              flagEnd = true;
            }
          });
          if(flagEnd){
            this.questionsEnd = true;
            //this.router.navigate([EnumUrls.requestRegister_extraDescription]);
            //console.log('step111----');
            this.sendAnswers2Server();
          }
          else{
            this.curentQuestion = this.fixQuestionList[nextLevel];
            this.listQuestions[0] = this.curentQuestion;
            this.initListSelectedItems();
            this.checkTypeQuestion();
          }
        }
        else{
          this.questionsEnd = true;
          //console.log('step222----');
          this.sendAnswers2Server();
          //this.router.navigate([EnumUrls.requestRegister_extraDescription]);
        }
      }
      else if(this.listQuestions.length > 0){
        this.curentQuestion = this.listQuestions[this.listQuestions.length-1];
        this.initListSelectedItems();
        this.checkTypeQuestion();
      }
  }//end onNext

  onBack(){
    this.isErrorInAnswer = false;
    this.listSelectedItems = [];
    this.curentAnswer = null;
    this.curentQuestion = this.shared.listQuestionsFinished[this.shared.listQuestionsFinished.length-1];

    for(let i=0; i < this.curentQuestion.items.length; i++){
      let j = 0;
      if(this.curentQuestion.items[i].childQuestions.length > 0){
        for(let j=0; j<this.curentQuestion.items[i].childQuestions.length; j++){
          if(this.curentQuestion.items[i].childQuestions[j] == this.listQuestions[this.listQuestions.length-1]){
            let listTempQ:Cat3QuestionV[] = this.listQuestions;
            this.listQuestions = [];
            for(let i=0; i < listTempQ.length; i++){
              if(i != listTempQ.length-1){
                this.listQuestions[i] = listTempQ[i];
              }
            }
          }
        } 
      }
    }
    let curentQExistInListQ:boolean = false;
    for(let i = 0; i < this.listQuestions.length; i++){
      if(this.listQuestions[i] == this.curentQuestion){
        curentQExistInListQ = true;
      }
    }
    if(!curentQExistInListQ){
      this.listQuestions[this.listQuestions.length] = this.curentQuestion;
    }


    let curentQuestionTemp:Cat3QuestionV = this.curentQuestion;

    //console.log("list questions...");
    //console.log(this.listQuestions);
    //console.log("curent question...");
    //console.log(this.curentQuestion);

    if(curentQuestionTemp.id == this.shared.listQuestionsFinished[this.shared.listQuestionsFinished.length-1].id && 
      curentQuestionTemp.title == this.shared.listQuestionsFinished[this.shared.listQuestionsFinished.length-1].title){
      let listFinishedQTemp:Cat3QuestionV[] = this.shared.listQuestionsFinished;
      this.shared.listQuestionsFinished = [];
      for(let i=0; i < listFinishedQTemp.length; i++){
        if(i != listFinishedQTemp.length-1){
          this.shared.listQuestionsFinished[i] = listFinishedQTemp[i];
        }
      }
    }
    
    if(curentQuestionTemp.id == this.shared.listAnswer[this.shared.listAnswer.length-1].questionID && 
      curentQuestionTemp.title == this.shared.listAnswer[this.shared.listAnswer.length-1].questionText){
      this.curentAnswer = this.shared.listAnswer[this.shared.listAnswer.length-1];
      let listAnsTemp:Answer[] = this.shared.listAnswer;
      this.shared.listAnswer = [];
      for(let i=0; i < listAnsTemp.length; i++){
        if(i != listAnsTemp.length-1){
          this.shared.listAnswer[i] = listAnsTemp[i];
        }
      }
    }

    //console.log("answerlist...");
    //console.log(this.shared.listAnswer);
    //console.log("questionFinishe list...");
    //console.log(this.shared.listQuestionsFinished);
    
    this.initListSelectedItems();
    this.checkTypeQuestion();
  }//end onBack

  onCheckBox(item:Cat3QuestionItemV, index:number){
    this.isAnswer = false;
    if(this.listSelectedItems[index] == -1){
      this.listSelectedItems[index] = item.id;
      this.deleteRepetedQuestions(item);
    }
    else{
      this.listSelectedItems[index] = -1;
    }
    for(let i=0; i < this.listSelectedItems.length; i++){
      if(this.listSelectedItems[i] != -1){
        this.isAnswer = true;
      }
    }
  }//end onCheckBox

  deleteRepetedQuestions(item:Cat3QuestionItemV){
    let altListQ:Cat3QuestionV[] = [];
      if(item.childQuestions){
        if(item.childQuestions.length > 0){
          item.childQuestions.forEach(eleman => {
            for(let i=0; i < this.listQuestions.length; i++){
              if(eleman.id != this.listQuestions[i].id){
                altListQ.push(this.listQuestions[i]);
              }
            }
            this.listQuestions = [];
            this.listQuestions = altListQ;
            altListQ = [];
          });
        }
      }
  }//end deleteRepetedQuestions

  onRadioBtn(item:Cat3QuestionItemV, index:number){
    this.isAnswer = false;
    for(let i = 0; i < this.listSelectedItems.length; i++){
      this.listSelectedItems[i] = -1;
    }
    this.deleteRepetedQuestions(item);
    this.listSelectedItems[index] = item.id;
    this.isAnswer = true;
  }//end onRadioBtn

  initListSelectedItems(){
    this.listSelectedItems = [];
    if(this.curentQuestion){
      if(this.curentQuestion.items.length > 0){
        for(let i=0; i < this.curentQuestion.items.length; i++){
          this.listSelectedItems.push(-1);
        }
      }
    }
  }//end initListSelectedItems

  onChangeNumber(inputVal:string){
    this.isErrorInAnswer = false;
    this.isAnswer = false;
    if(!this.curentQuestion.required && (inputVal == "")){
      this.isAnswer = true;
    }
    else if(this.curentQuestion.required && (inputVal == "")){
      this.isErrorInAnswer = true;
      this.isAnswer = false;
    }
    else{
      if(inputVal.length > 0){
        let numberVal:number = Number(inputVal);
        if(isNaN(numberVal)){
          this.isErrorInAnswer = true;
          this.isAnswer = false;
        }
        else{
          if(this.curentQuestion.minValue <= numberVal && numberVal <=this.curentQuestion.maxValue){
            this.isErrorInAnswer = false;
            this.isAnswer = true;
            this.valueNumber = numberVal;
          }
          else{
            this.isErrorInAnswer = true;
            this.isAnswer = false;
          }
        }
      }
      else{
        this.isErrorInAnswer = true;
        this.isAnswer = false;
      }
    }
  }//end onChangeNumber

  onChangeText(inputVal:string){
    this.isErrorInAnswer = false;
    if(inputVal == '' && !this.curentQuestion.required){
      this.isAnswer = true;
    }
    else if(inputVal.length < this.curentQuestion.minValue || inputVal.length > this.curentQuestion.maxValue){
      this.isAnswer = false;
    }
    else{
      this.isAnswer = true;
    }
  }//end onChangeText

  radioBtnSetAnswer(index:number):boolean{
    let isCheck:boolean = false;
    if(this.listSelectedItems[index] != -1){
      isCheck = true;
    }
    return isCheck;
  }//end radioBtnSetAnswer

  checkBoxSetAnswer(index:number):boolean{
    let isCheck:boolean = false;
    if(this.listSelectedItems[index] != -1){
      isCheck = true;
    }
    return isCheck;
  }//end checkBoxSetAnswer

  onPlus(){
    if(this.valueNumber < this.curentQuestion.maxValue){
      this.valueNumber++;
    }
    else{
      this.valueNumber = this.curentQuestion.maxValue;
    }

    if((this.valueNumber <= this.curentQuestion.maxValue) && (this.valueNumber >= this.curentQuestion.minValue)){
      this.isAnswer = true;
      this.isErrorInAnswer = false;
    }
  }//end onPlus

  onMines(){
    if(this.valueNumber > this.curentQuestion.minValue){
      this.valueNumber--;
    }
    else{
      this.valueNumber = this.curentQuestion.minValue;
    }

    if((this.valueNumber <= this.curentQuestion.maxValue) && (this.valueNumber >= this.curentQuestion.minValue)){
      this.isAnswer = true;
      this.isErrorInAnswer = false;
    }
  }//end onMines

  sendAnswers2Server(){
    this.isLoading = true;
    let token:string = localStorage.getItem("userToken");
    let answers:AnswerV[] = [];
    this.shared.listAnswerV = [];
    this.shared.listAnswer.forEach(item =>{
      if(item.questionType == EnumQuestionType.checkBox || item.questionType == EnumQuestionType.radioBtn){
        let listIdItems:number[] = [];
        item.answerListItem.forEach(eleman =>{
          listIdItems.push(eleman.id);
        });
        let ans1:AnswerV = {
          questionId: item.questionID,
	        intValue: null,
	        strValue: null,
	        itemIds: listIdItems
        };
        answers.push(ans1);
      }
      else if(item.questionType == EnumQuestionType.numberType){
        let ans2:AnswerV = {
          questionId: item.questionID,
	        intValue: item.answerNumber,
	        strValue: null,
	        itemIds: null
        }
        answers.push(ans2);
      }
      else if(item.questionType == EnumQuestionType.stringType){
        let ans3:AnswerV = {
          questionId: item.questionID,
	        intValue: null,
	        strValue: item.answerText,
	        itemIds: null
        }
        answers.push(ans3);
      }
    });
    //console.log("answer data send to server...");
    let data:Cat3AnswerV={
      cat3Id: this.jobcat3Id,
	    answers: answers
    };
    this.shared.listAnswerV = answers;
    //console.log(data);
    this.httpService.postConvertAnswers(data, token).subscribe(res => {
      //console.log("result answer questions...");
      //console.log(res);
      this.shared.listQuestionAnswer = res;
      this.router.navigate([EnumUrls.requestRegister_extraDescription]);
    }, error => {
      this.isLoading = false;
      //console.log("خطای ارسال جوابها به سرور");
      //console.log(error);
      this.shared.clearQuestionsList(1);//1:not show description state
      this.showErrorSendAnswer2Server = true;
    });
  }//sendAnswers2Server

  onBackStep(){ 
    this.location.back();
  }//end onBackStep

  onStartQuestions(){
    this.shared.showDescription = false;
    this.shared.stepNumberMobile.next(1);
  }//end onStartQuestions

  onRetryQuestion(){
    this.inConstructor();
    this.ngOnInit();
  }//end onRetryQuestion()

  inConstructor(){
    this.isLoading = false;
    this.questionLength = 0;
    this.questionsEnd = true;
    this.fixQuestionList = [];
    this.curentQuestion = null;
    this.listQuestions = [];
    this.listSelectedItems = [];
    this.curentAnswer = null;
    this.isRadioBtn = false;
    this.isCheckBox = false;
    this.isString = false;
    this.isNumber = false;
    this.valueNumber = -1;
    this.valueText = '';
    this.isAnswer = false;
    this.isErrorInAnswer = false;
    this.textError = "لطفا پاسخ مناسبی به سوال بدهید. پاسخ فعلی مناسب نیست.";
    this.jobcat3EName = '';
    this.jobcat3Name = '';
    this.jobcat3Id = 0;
    this.jobcat3Icon = '';
    //this.descriptionsTitile = '';
    //this.descriptionList = [];
    //this.imgDescription = '';
    this.showErrorSendAnswer2Server = false;

    if(this.shared.reqRej_preRegister && this.shared.reqRej_jobcat3Select){
      if(this.shared.jobcat3FromLandingPage){
        this.shared.jobcat3FromLandingPage = false;
        this.shared.showDescription = false;
      }
      /*
      if(this.shared.showDescription){
        if(this.shared.reqRej_preRegister.descriptions){
          if(this.shared.reqRej_preRegister.descriptions.length > 0){
            this.descriptionList = this.shared.reqRej_preRegister.descriptions;
            this.descriptionsTitile = this.shared.reqRej_preRegister.title;
            console.log(this.descriptionsTitile);
          } 
        }
        if(this.shared.reqRej_preRegister.image){
          if(this.shared.reqRej_preRegister.image != ""){
            this.imgDescription = this.urlRest.imagePath + this.shared.reqRej_preRegister.image;
          }
        }
      }
      */
      if(this.shared.reqRej_preRegister.haveQuestion){
        if(this.shared.reqRej_preRegister.descriptions && this.shared.showDescription){
          this.shared.stepNumberMobile.next(0);
        }
        else{
          this.shared.stepNumberMobile.next(1);
        }
        this.shared.stepNumber.next(3);
        this.fixQuestionList = this.shared.reqRej_preRegister.questions;
        this.jobcat3EName = this.shared.reqRej_jobcat3Select.ename;
        this.jobcat3Name = this.shared.reqRej_jobcat3Select.name;
        this.jobcat3Id = this.shared.reqRej_jobcat3Select.id;
        this.jobcat3Icon = this.urlRest.imagePath + this.shared.reqRej_jobcat3Select.icon;
      }
      else{
        this.router.navigate([EnumUrls.address_home]);
      }  
    }
    else{
      this.router.navigate([EnumUrls.address_home]);
    }
  }//end inConstructor

  offNext(){}

  offBack(){}
}
