import { SharedService } from './../../../../services/shared/shared.service';
import { Router } from '@angular/router';
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { imgUpload } from '../../class/imgUpload.class';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { Ng2ImgMaxService } from 'ng2-img-max';
import { DomSanitizer } from '@angular/platform-browser';
import { UserPersonalData } from '../../class/backend/userPersonalData.class';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StorageService } from '../../../../services/storage/storage.service';
import { webappConstValue } from '../../class/webappConstVal';
import { webappHttpService } from '../../services/http/webapp-http.service';
import { UrlRest } from '../../../class/urlRest.class';
import { ToastMessage } from '../../../class/toastMessage.class';
import { EnumUrls } from '../../enum/enumUrls.enum';
import { isPlatformBrowser } from '@angular/common';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  isLoading:boolean = true;
  public uploader: FileUploader;
  urlProfileImage:string = '';
  uploadedImage: File = null;
  uploadDataList: File[] = [];
  fackeData: imgUpload = {url:'', isShow:false};
  photoUrl_fromServer:string = '';
  photoSRC:string = '';
  photo:string = '';
  yearList:string[]=[];
  userToken:string = '';
  userFirstName:string = '';
  userLastName:string = '';
  userMobileNumber:string = '';
  userSex:number = 1;
  userIsMale:boolean = false;
  userEmail:string = '';
  userBirthYear:string = '------';
  activeBtnSaveInfo:boolean = true;
  lottieConfig: Object;
  anim: any;
  isLoadingProfileImage:boolean = false;
  hasImageProfile:boolean = false;
  profileForm: FormGroup;
  
  constructor(private storage: StorageService,
    private httpService: webappHttpService,
    public sanitizer: DomSanitizer,
    public shared: SharedService,
    private ng2ImgMax: Ng2ImgMaxService, 
    private router:Router,
    private toastr: ToastrService,
    private toastMsg: ToastMessage,
    public constVal: webappConstValue,
    public urlRest: UrlRest,
    @Inject(PLATFORM_ID) private platformId: Object) { 
      this.lottieConfig = {
        path: 'assets/webappPics/preloader.json',
        renderer: 'canvas',
        autoplay: true,
        loop: true
      };
    }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo(0, 0);
    }
    this.userToken = localStorage.getItem("userToken");
    if(this.userToken){
      this.makeBirthYearList(1397);
      if(this.storage.userDataLogin){
        if(this.storage.userDataLogin.user){
          this.isLoading = false;
          this.photo = this.urlRest.imagePath + this.storage.userDataLogin.user.personalData.photo;
        this.photoSRC = this.storage.userDataLogin.user.personalData.photo;
        if(this.photoSRC != this.constVal.imageProfileEmptySrc){
          this.hasImageProfile = true;
        }
        this.userFirstName = this.storage.userDataLogin.user.personalData.firstName;
        this.userLastName = this.storage.userDataLogin.user.personalData.lastName;
        this.userMobileNumber = this.storage.userDataLogin.user.personalData.mobileNumber;
        if(this.storage.userDataLogin.user.personalData.sex == 0){
          this.userIsMale = false;
          this.userSex = 0;
        }
        else{
          this.userIsMale = true;
          this.userSex = 1;
        }
        if(this.storage.userDataLogin.user.personalData.email){
          this.userEmail = this.storage.userDataLogin.user.personalData.email;
        }
        if(!this.storage.userDataLogin.user.personalData.birthYear){
          this.userBirthYear = '------';
        }
        else{
          this.userBirthYear = this.storage.userDataLogin.user.personalData.birthYear;
        }
        this.profileForm = new FormGroup({
          firstName: new FormControl(this.userFirstName, [Validators.required, Validators.minLength(this.constVal.minFirstName)]),
          lastName: new FormControl(this.userLastName, [Validators.required, Validators.minLength(this.constVal.minLastName)]),
          email: new FormControl(this.userEmail, Validators.email),
          year: new FormControl(this.userBirthYear),
          woman: new FormControl(!this.userIsMale),
          man: new FormControl(this.userIsMale)
        })
        }
        else{
          this.router.navigate([EnumUrls.address_home]);
        }
      }
      else{
        this.router.navigate([EnumUrls.address_home]);
      }
    }
    else{
      this.router.navigate([EnumUrls.address_home]);
    }

    this.urlProfileImage = this.urlRest.uploadImage + this.userToken;
    this.uploader = new FileUploader({url: this.urlProfileImage, itemAlias: 'demo'});
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      if(status == 200){
        this.photoUrl_fromServer = response;
          let s: number = this.photoUrl_fromServer.lastIndexOf('msg');
          let e: number = this.photoUrl_fromServer.lastIndexOf('"');
          this.photoSRC = this.photoUrl_fromServer.substring(s + 6, e); 

        this.uploadedImage = null;
        this.uploadDataList = [];
        this.hasImageProfile = true;
        this.isLoadingProfileImage = false;
      }
    };

  }//end ngOnInit

  checkUserSex(){
    if(this.userSex == 1){
      this.userIsMale = true;
    }
    else{
      this.userIsMale = false;
    }
  }

  onUserSex(){
    this.userIsMale = !this.userIsMale;
    this.profileForm.value.man = this.userIsMale;
    this.profileForm.value.woman = !this.userIsMale;
  }

  makeBirthYearList(year:number){
    let index = 1;
    this.yearList[0] = "------";
    for(let i=1310; i<=year; i++){
      this.yearList[index]=i.toString();
      index++;
    }
  }


 readUrl(event:any) {
   this.fackeData.isShow = false;
   this.fackeData.url = '';
  let image = event.target.files[0];
  var reader = new FileReader();
  if (event.target.files && image) {
    this.uploadDataList = [];
    this.ng2ImgMax.resizeImage(image, 800, 800).subscribe(
      res => { 
        this.uploadDataList.push(res);
        this.uploadedImage = new File([res], res.name); 
        reader.readAsDataURL(this.uploadedImage);
        reader.onload = () => {
          this.fackeData.url = reader.result as string;
          this.fackeData.isShow = true;
        }
        this.uploader.addToQueue(this.uploadDataList);
        this.uploader.uploadAll();
        this.isLoadingProfileImage = true;
      },
      error => {});
  }
}

 onSubmit(){
  this.activeBtnSaveInfo = false;
  this.userBirthYear = this.profileForm.value.year;
  if(this.photoSRC == this.constVal.imageProfileEmptySrc){
    this.photoSRC = '';
  }

  if(this.profileForm.value.man){
    this.userSex = 1;
  }
  else{
    this.userSex = 0;
  }

  if(this.profileForm.value.year === '------'){
    this.userBirthYear = null;
  }

  if(!this.userEmail || this.userEmail == ''){
    this.userEmail = null;
  }

  let personalData: UserPersonalData = {
    firstName: this.profileForm.value.firstName,
    lastName: this.profileForm.value.lastName,
    mobileNumber: this.userMobileNumber,
    sex: this.userSex,
    nationalCode: null,
    photo: this.photoSRC,
    birthYear: this.userBirthYear,
    email:  this.profileForm.value.email
  };

  this.httpService.postEditUserInfo(personalData, this.userToken).subscribe(res => {
    this.storage.userDataLogin.user.personalData = res;
    this.storage.userDataLogin.user.personalData = res;
    this.storage.subject_userDataLogin.next(this.storage.userDataLogin);
    this.toastr.success(this.toastMsg.msgProfileEdit, this.toastMsg.title4ProfileEdit);
    this.activeBtnSaveInfo = true;
  }, error =>{
    this.activeBtnSaveInfo = true;
  });

 }//end onsubmit

  handleAnimation(anim: any) {
    this.anim = anim;
  }

  onDeleteProfileImage(){
    this.photo = this.urlRest.imagePath + this.constVal.imageProfileEmptySrc;
    this.fackeData.url = '';
    this.photoSRC = '';
    this.hasImageProfile = false;
  }

}
