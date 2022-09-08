import { EnumUrls } from './../../../enum/enumUrls.enum';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../../../services/shared/shared.service';
import { webappConstValue } from '../../../class/webappConstVal';
import { imgUpload } from '../../../class/imgUpload.class';
import { DomSanitizer } from '@angular/platform-browser';
import { Ng2ImgMaxService } from 'ng2-img-max';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { ToastrService } from 'ngx-toastr';
import { ToastMessage } from '../../../../class/toastMessage.class';
import { StorageService } from '../../../../../services/storage/storage.service';
import { UrlRest } from '../../../../class/urlRest.class';
import { webappHttpService } from '../../../services/http/webapp-http.service';
import { LocationStrategy } from '@angular/common';


@Component({
  selector: 'app-extra-description',
  templateUrl: './extra-description.component.html',
  styleUrls: ['./extra-description.component.css']
})
export class ExtraDescriptionComponent implements OnInit {

  haveQuestion:boolean = false;
  isLoading:boolean = true;
  reqTitle: string = '';
  reqDescription: string = '';
  requestStaticTermImages: string = "در صورت نیاز می توانید به درخواست خود عکس اضافه کنید";
  urlImages: string = '';
  uploadedImage: File;
  numberOfImages: number = 0;
  isLoadingImage: boolean = false;
  //photoList: string[] = [];
  uploader: FileUploader;

  jobcat3EName: string = '';
  jobcat3Name: string = '';
  jobcat3Id:number = 0;
  jobcat3Icon:string = '';

  userToken:string = '';

  constructor(public shared: SharedService,
    private urlRest: UrlRest,
    public constVal: webappConstValue,
    public sanitizer: DomSanitizer, 
    private ng2ImgMax: Ng2ImgMaxService,
    public storage: StorageService,
    private toastr: ToastrService,
    private toastMsg: ToastMessage,
    private location: LocationStrategy,
    private httpService: webappHttpService,
    private router: Router){
      if(shared.reqRej_preRegister && shared.reqRej_jobcat3Select){
        this.haveQuestion = shared.reqRej_preRegister.haveQuestion;
        this.jobcat3EName = shared.reqRej_jobcat3Select.ename;
        this.jobcat3Name = shared.reqRej_jobcat3Select.name;
        this.jobcat3Id = shared.reqRej_jobcat3Select.id;
        this.jobcat3Icon = urlRest.imagePath + shared.reqRej_jobcat3Select.icon;
        if(shared.reqRej_title == ''){
          this.reqTitle = this.jobcat3Name;
        }
        else{
          this.reqTitle = shared.reqRej_title;
        }
        this.reqDescription = shared.reqRej_description;
      }
      else{
        router.navigate([EnumUrls.address_home]);
      }  
  }//end constructor

  ngOnInit(){
    this.isLoading = false;
    //console.log(this.shared.reqRej_preRegister);
    if(this.shared.reqRej_preRegister && this.shared.reqRej_jobcat3Select){
      this.shared.stepNumber.next(3);
      this.shared.stepNumberMobile.next(1);
    }
    
    this.urlImages = this.urlRest.uploadImage;
    this.userToken = localStorage.getItem("userToken");
    if (this.storage.isLogin.value) {
      //===user is login===
      this.urlImages = this.urlImages + this.userToken;
    }
    else {
      //===user is guest====
      this.urlImages = this.urlImages + this.httpService.tokenGuest;
    }
    this.uploader = new FileUploader({ url: this.urlImages, itemAlias: 'demo' });
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      this.shared.reqRej_photoList.push(response);
    };
  }//end ngOnInit

  onDeleteImg(index) {
    this.shared.imgUrlsList.splice(index, 1);
    this.shared.uploadDataList.splice(index, 1);
    this.numberOfImages--;
  }//end onDeleteImg

  readUrl(event: any) {
    let image = event.target.files[0];
    let fackeData: imgUpload = { url: '', isShow: false };
    var reader = new FileReader();

    if (event.target.files && image) {
      this.isLoadingImage = true;
      this.ng2ImgMax.resizeImage(image, 800, 800).subscribe(
        res => {
          this.shared.uploadDataList.push(res);
          this.uploadedImage = new File([res], res.name);
          reader.readAsDataURL(this.uploadedImage);
          reader.onload = () => {
            fackeData.url = reader.result as string;
            fackeData.isShow = true;
            this.isLoadingImage = false;
            if (fackeData.url != '') {
              this.shared.imgUrlsList.push(fackeData);
              this.numberOfImages = this.shared.imgUrlsList.length;
            }
          }
        },
        error => {
        });
    }
  }//end readUrl

  onInsertDescription() {
    if (!this.isLoadingImage) {
      this.shared.reqRej_photoList = [];
      this.uploader.addToQueue(this.shared.uploadDataList);
      this.uploader.uploadAll();

      this.reqTitle = this.reqTitle.trim();
      if(!this.haveQuestion){
        if (this.reqTitle.length >= this.constVal.minRequestTitle) {
          this.setDataGlobal();
          this.router.navigate([EnumUrls.requestRegister_dateTime]);
        }
        else {
          this.toastr.clear();
          this.toastr.error(this.toastMsg.msgErrorRequestTitle, this.toastMsg.title4ErrorRequestTitle);
        }
      }
      else{
        this.setDataGlobal();
        this.router.navigate([EnumUrls.requestRegister_dateTime]);
      }
    }
  }//end onInsertDescription

  setDataGlobal(){
    this.shared.reqRej_title = this.reqTitle;
    this.shared.reqRej_description = this.reqDescription;
  }

  onBack() {
    this.location.back();
  }

}
