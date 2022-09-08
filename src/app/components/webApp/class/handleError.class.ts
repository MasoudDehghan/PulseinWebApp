import { Router } from '@angular/router';
import { BackendMessage } from './Msg.class';
import { InnerMessage } from './backend/innerMesage.class';
import * as errorMsgList from './errorMsgList';
import { ClientLoginData } from './backend/clientLoginData.class';
import { ErrorCodeEnum } from '../enum/errorCode.enum';
import { StorageService } from '../../../services/storage/storage.service';
import { BasicDataService } from '../../../services/basicData/basic-data.service';
import { CustomFunctionsService } from '../../../services/functions/custom-functions.service';
import { SharedService } from '../../../services/shared/shared.service';
import { EnumUrls } from '../enum/enumUrls.enum';
import { LoginService } from '../../../services/httpLogin/login.service';


export class HandleError {

    errorLabel = errorMsgList.errorLabel;
    constructor(private _router: Router,
        private storage: StorageService,
        private basicData: BasicDataService,
        private shared: SharedService, 
        private httpService: LoginService,
        private customFunc: CustomFunctionsService) {}

        handleErrorMethod(status, err: BackendMessage): BackendMessage {
            let errorMsg: BackendMessage = new BackendMessage();
            if (status == 500) {

                let path:string = document.URL;
                //console.log("*** path ***  "+path);
                let arrSplitPath:string[] = path.split('/');
                this.storage.pages = arrSplitPath;

                //SessionExpired
                if (err.code == 1) {
                    //console.log("SessionExpired err.code == 1");
                    //let imsg:InnerMessage = new InnerMessage();
                    
                    /*++++++++++++++++++++++++++++++*/
                    this.autoLogin();
                    /*++++++++++++++++++++++++++++++*/
    
                }
                //errCode:2 UnAuthorized
                else if (err.code == 2) {
                    //localStorage.removeItem("userToken");
                    //localStorage.removeItem("pulsInfo");
                    //this._router.navigate(['/checkRequest']);
                    //console.log("UnAuthorized error code 2");
                    this.autoLogin();
                }
                //errCode:Internal Server Error
                else if (err.code == 4) {
    
                    err.msg.forEach(element => {
                        if (element.code == ErrorCodeEnum.InnerCode_RepeatedUserName) {
                            element.msg = errorMsgList.InnerCode_RepeatedUserNameMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_EmptyUserName) {
                            element.msg = errorMsgList.InnerCode_EmptyUserNameMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_InvalidUserName ) {
                            element.msg = errorMsgList.InnerCode_InvalidUserNameMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_EmptyPassword  ) {
                            element.msg = errorMsgList.InnerCode_EmptyPasswordMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_InvalidUserName ) {
                            element.msg = errorMsgList.InnerCode_InvalidUserNameMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_InvalidPassword) {
                            element.msg = errorMsgList.InnerCode_InvalidPasswordMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_EmptyUserRole ) {
                            element.msg = errorMsgList.InnerCode_EmptyUserRoleMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_InvalidUserRole  ) {
                            element.msg = errorMsgList.InnerCode_InvalidUserRoleMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_InvalidLastPassword  ) {
                            element.msg = errorMsgList.InnerCode_InvalidLastPasswordMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_EntityNotFound  ) {
                            element.msg = errorMsgList.InnerCode_EntityNotFoundMsg;
                            //localStorage.clear();
                            localStorage.removeItem("servicesJobCats");
                            localStorage.removeItem("servicesJobCats2");
                            localStorage.removeItem("servicesJobCats3");
                            this.basicData.getjobCats();
                            //this.basicData.initData();
                            this._router.navigate([EnumUrls.address_home]);
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_EmptyEntityName ) {
                            element.msg = errorMsgList.InnerCode_EmptyEntityNameMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_InvalidEntityName ) {
                            element.msg = errorMsgList.InnerCode_InvalidEntityNameMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_RepeatedEntityName ) {
                            element.msg = errorMsgList.InnerCode_RepeatedEntityNameMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_EmptyParent ) {
                            element.msg = errorMsgList.InnerCode_EmptyParentMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_InvalidParent ) {
                            element.msg = errorMsgList.InnerCode_InvalidParentMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_ParentNotFound ) {
                            element.msg = errorMsgList.InnerCode_ParentNotFoundMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_EntityHaveChild ) {
                            element.msg = errorMsgList.InnerCode_EntityHaveChildMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_InvalidEntityIcon ) {
                            element.msg = errorMsgList.InnerCode_InvalidEntityIconMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_InvalidUserName ) {
                            element.msg = errorMsgList.InnerCode_InvalidUserNameMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_FileNameNotFound ) {
                            element.msg = errorMsgList.InnerCode_FileNameNotFoundMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_InvalidUserName ) {
                            element.msg = errorMsgList.InnerCode_InvalidUserNameMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_InvalidFileType ) {
                            element.msg = errorMsgList.InnerCode_InvalidFileTypeMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_FileDataNotFound  ) {
                            element.msg = errorMsgList.InnerCode_FileDataNotFoundMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_UnableToDeleteFile ) {
                            element.msg = errorMsgList.InnerCode_UnableToDeleteFileMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_InvalidJobPricePercent ) {
                            element.msg = errorMsgList.InnerCode_InvalidJobPricePercentMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_InvalidNotificationPercent ) {
                            element.msg = errorMsgList.InnerCode_InvalidNotificationPercentMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_InvalidNotificationPrice ) {
                            element.msg = errorMsgList.InnerCode_InvalidNotificationPriceMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_InvalidPrice ) {
                            element.msg = errorMsgList.InnerCode_InvalidPriceMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_InvalidWorkType ) {
                            element.msg = errorMsgList.InnerCode_InvalidWorkTypeMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_InvalidUserName ) {
                            element.msg = errorMsgList.InnerCode_InvalidUserNameMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_InvalidFirstName ) {
                            element.msg = errorMsgList.InnerCode_InvalidFirstNameMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_InvalidLastName ) {
                            element.msg = errorMsgList.InnerCode_InvalidLastNameMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_InvalidTitle ) {
                            element.msg = errorMsgList.InnerCode_InvalidTitleMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_InvalidName ) {
                            element.msg = errorMsgList.InnerCode_InvalidNameMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_InvalidMobileNumber ) {
                            element.msg = errorMsgList.InnerCode_InvalidMobileNumberMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_InvalidPhoneNumber ) {
                            element.msg = errorMsgList.InnerCode_InvalidPhoneNumberMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_InvalidFaxNumber ) {
                            element.msg = errorMsgList.InnerCode_InvalidFaxNumberMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_InvalidEmail ) {
                            element.msg = errorMsgList.InnerCode_InvalidEmailMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_InvalidWebsite ) {
                            element.msg = errorMsgList.InnerCode_InvalidWebsiteMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_InvalidOfficeRegisterNumber ) {
                            element.msg = errorMsgList.InnerCode_InvalidOfficeRegisterNumberMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_InvalidOfficeNationalCode ) {
                            element.msg = errorMsgList.InnerCode_InvalidOfficeNationalCodeMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_InvalidStoreLicenseNumber ) {
                            element.msg = errorMsgList.InnerCode_InvalidStoreLicenseNumberMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_InvalidInstagram ) {
                            element.msg = errorMsgList.InnerCode_InvalidInstagramMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_InvalidTelegram ) {
                            element.msg = errorMsgList.InnerCode_InvalidTelegramMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_EmptyPhoneList ) {
                            element.msg = errorMsgList.InnerCode_EmptyPhoneListMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_InvalidPhoneType ) {
                            element.msg = errorMsgList.InnerCode_InvalidPhoneTypeMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_MobileOrTelNumberNotFound  ) {
                            element.msg = errorMsgList.InnerCode_MobileOrTelNumberNotFoundMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_InvalidCity ) {
                            element.msg = errorMsgList.InnerCode_InvalidCityMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_InvalidRegion ) {
                            element.msg = errorMsgList.InnerCode_InvalidRegionMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_InvalidArea ) {
                            element.msg = errorMsgList.InnerCode_InvalidAreaMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_InvalidAdress ) {
                            element.msg = errorMsgList.InnerCode_InvalidAdressMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_InvalidLat ) {
                            element.msg = errorMsgList.InnerCode_InvalidLatMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_InvalidLong ) {
                            element.msg = errorMsgList.InnerCode_InvalidLongMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_InvalidPostalCode ) {
                            element.msg = errorMsgList.InnerCode_InvalidPostalCodeMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_InvalidJobcat1 ) {
                            element.msg = errorMsgList.InnerCode_InvalidJobcat1Msg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_InvalidJobcat2 ) {
                            element.msg = errorMsgList.InnerCode_InvalidJobcat2Msg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_InvalidJobcat3 ) {
                            element.msg = errorMsgList.InnerCode_InvalidJobcat3Msg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_InvalidResource ) {
                            element.msg = errorMsgList.InnerCode_InvalidResourceMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_InvalidCatalogPhoto ) {
                            element.msg = errorMsgList.InnerCode_InvalidCatalogPhotoMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_InvalidCatalogInfo ) {
                            element.msg = errorMsgList.InnerCode_InvalidCatalogInfoMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_EmptyWorkerList ) {
                            element.msg = errorMsgList.InnerCode_EmptyWorkerListMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_EmptyJobsList ) {
                            element.msg = errorMsgList.InnerCode_EmptyJobsListMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_InvalidStoreLicenseDate ) {
                            element.msg = errorMsgList.InnerCode_InvalidStoreLicenseDateMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_InvalidOfficeRegisterDate ) {
                            element.msg = errorMsgList.InnerCode_InvalidOfficeRegisterDateMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_InvalidInfo  ) {
                            element.msg = errorMsgList.InnerCode_InvalidInfoMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_InvalidSex  ) {
                            element.msg = errorMsgList.InnerCode_InvalidSexMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_InvalidNationalCode  ) {
                            element.msg = errorMsgList.InnerCode_InvalidNationalCodeMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_RepeatedFound  ) {
                            element.msg = errorMsgList.InnerCode_RepeatedFoundMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_InvalidKeyword  ) {
                            element.msg = errorMsgList.InnerCode_InvalidKeywordMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_InvalidSystemUser ) {
                            element.msg = errorMsgList.InnerCode_InvalidSystemUserMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_InvalidAbrv  ) {
                            element.msg = errorMsgList.InnerCode_InvalidAbrvMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_DuplicateEntity  ) {
                            element.msg = errorMsgList.InnerCode_DuplicateEntityMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_InvalidCode  ) {
                            element.msg = errorMsgList.InnerCode_InvalidCodeMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_InvalidWCode ) {
                            element.msg = errorMsgList.InnerCode_InvalidWCodeMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_InvalidPositionType ) {
                            element.msg = errorMsgList.InnerCode_InvalidPositionTypeMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_InvalidWorkstation ) {
                            element.msg = errorMsgList.InnerCode_InvalidWorkstationMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_InvalidSmsCode ) {
                            //console.log("خطا: پیامک اشتباه است");
                            element.msg = errorMsgList.InnerCode_InvalidSmsCodeMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_answerQuestionError) {
                            //console.log("خطا: پاسخ سوالات اشتباه است" + element.code);
                            element.msg = errorMsgList.InnerCode_answerQuestionErrorMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_notFoundJobcat3) {
                            element.msg = errorMsgList.InnerCode_notFoundJobcat3Msg;
                        }
                        ////
                        if (element.code == ErrorCodeEnum.InnerCode_InvalidCat3OrParent) {
                            element.msg = errorMsgList.InnerCode_InvalidCat3OrParentMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_InvalidText) {
                            element.msg = errorMsgList.InnerCode_InvalidTextMsg;
                        }
                        /////
                        if (element.code == ErrorCodeEnum.InnerCode_InvalidUserData ) {
                            element.msg = errorMsgList.InnerCode_InvalidUserDataMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_InvalidOwnerId ) {
                            element.msg = errorMsgList.InnerCode_InvalidOwnerIdMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_InvalidBirthYear ) {
                            element.msg = errorMsgList.InnerCode_InvalidBirthYearMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_InvalidPhoto  ) {
                            element.msg = errorMsgList.InnerCode_InvalidPhotoMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_ThisUserIsAlreadyWorker  ) {
                            element.msg = errorMsgList.InnerCode_ThisUserIsAlreadyWorkerMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_InvalidRegisterState  ) {
                            element.msg = errorMsgList.InnerCode_InvalidRegisterStateMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_InvalidRegisterStateInfo  ) {
                            //element.msg = errorMsgList.InnerCode_InvalidRegisterStateInfoMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_UnableToSendSms ) {
                            element.msg = errorMsgList.InnerCode_UnableToSendSmsMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_InvalidDeviceId ) {
                            element.msg = errorMsgList.InnerCode_InvalidDeviceIdMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_InvalidExperienceStart  ) {
                            element.msg = errorMsgList.InnerCode_InvalidExperienceStartMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_InvalidDocumentPhoto) {
                            element.msg = errorMsgList.InnerCode_InvalidDocumentPhotoMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_InvalidDocumentInfo) {
                            element.msg = errorMsgList.InnerCode_InvalidDocumentInfoMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_InvalidDocumentType) {
                            element.msg = errorMsgList.InnerCode_InvalidDocumentTypeMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_EmptyServiceAreaList) {
                            element.msg = errorMsgList.InnerCode_EmptyServiceAreaListMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_InvalidServiceArea) {
                            element.msg = errorMsgList.InnerCode_InvalidServiceAreaMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_InvalidWorkTimeData) {
                            element.msg = errorMsgList.InnerCode_InvalidWorkTimeDataMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_InvalidWorkTimeH) {
                            element.msg = errorMsgList.InnerCode_InvalidWorkTimeHMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_InvalidWorkTimeM) {
                            element.msg = errorMsgList.InnerCode_InvalidWorkTimeMMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_InvalidWorkTime) {
                            element.msg = errorMsgList.InnerCode_InvalidWorkTimeMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_InvalidPriority) {
                            element.msg = errorMsgList.InnerCode_InvalidPriorityMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_MissMachUser) {
                            element.msg = errorMsgList.InnerCode_MissMachUserMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_WorkerRegisterStateError) {
                            element.msg = errorMsgList.InnerCode_WorkerRegisterStateErrorMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_WsRegisterStateError) {
                            element.msg = errorMsgList.InnerCode_WsRegisterStateErrorMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_InvalidVerifyFlag) {
                            element.msg = errorMsgList.InnerCode_InvalidVerifyFlagMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_InvalidRequestPhoto) {
                            element.msg = errorMsgList.InnerCode_InvalidRequestPhotoMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_InvalidRequestPhotoInfo) {
                            element.msg = errorMsgList.InnerCode_InvalidRequestPhotoInfoMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_InvalidRequestVoice) {
                            element.msg = errorMsgList.InnerCode_InvalidRequestVoiceMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_InvalidRequestVideo) {
                            //element.msg = errorMsgList.InnerCode_InvalidRequestVideoMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_InvalidCustomWorker) {
                            element.msg = errorMsgList.InnerCode_InvalidCustomWorkerMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_CustomWorkerInActive) {
                            element.msg = errorMsgList.InnerCode_CustomWorkerInActiveMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_InvalidCartableSearchType) {
                            element.msg = errorMsgList.InnerCode_InvalidCartableSearchTypeMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_InvalidStartTime) {
                            element.msg = errorMsgList.InnerCode_InvalidStartTimeMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_InvalidEndTime) {
                            element.msg = errorMsgList.InnerCode_InvalidEndTimeMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_InvalidTime) {
                            element.msg = errorMsgList.InnerCode_InvalidTimeMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_InvalidCartableSearchVerifyFlag) {
                            element.msg = errorMsgList.InnerCode_InvalidCartableSearchVerifyFlagMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_InvalidRequestPhotoCnt) {
                            element.msg = errorMsgList.InnerCode_InvalidRequestPhotoCntMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_ThisUserIsNotOwner) {
                            element.msg = errorMsgList.InnerCode_ThisUserIsNotOwnerMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_InvalidJobOffer) {
                            element.msg = errorMsgList.InnerCode_InvalidJobOfferMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_InvalidInvoice) {
                            element.msg = errorMsgList.InnerCode_InvalidInvoiceMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_InvalidInvoiceItem) {
                            element.msg = errorMsgList.InnerCode_InvalidInvoiceItemMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_InvalidInvoiceItemTitle) {
                            element.msg = errorMsgList.InnerCode_InvalidInvoiceItemTitleMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_InvalidInvoiceItemQuantity) {
                            element.msg = errorMsgList.InnerCode_InvalidInvoiceItemQuantityMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_InvalidInvoiceItemUnitPrice) {
                            element.msg = errorMsgList.InnerCode_InvalidInvoiceItemUnitPriceMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_InvalidInvoiceWage) {
                            element.msg = errorMsgList.InnerCode_InvalidInvoiceWageMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_InvalidInvoiceTransfer) {
                            element.msg = errorMsgList.InnerCode_InvalidInvoiceTransferMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_RequestStateIsClosed) {
                            element.msg = errorMsgList.InnerCode_RequestStateIsClosedMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_JobOfferStateisError) {
                            element.msg = errorMsgList.InnerCode_JobOfferStateisErrorMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_SuggestionStateisError) {
                            element.msg = errorMsgList.InnerCode_SuggestionStateisErrorMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_InvalidRequestState) {
                            element.msg = errorMsgList.InnerCode_InvalidRequestStateMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_MsgLenghtError) {
                            //element.msg = errorMsgList.InnerCode_MsgLenghtErrorMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_InvalidLogo) {
                            element.msg = errorMsgList.InnerCode_InvalidLogoMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_InvalidProvince) {
                            element.msg = errorMsgList.InnerCode_InvalidProvinceMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_InvalidTownship) {
                            element.msg = errorMsgList.InnerCode_InvalidTownshipMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_InvalidSRegion) {
                            element.msg = errorMsgList.InnerCode_InvalidSRegionMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_InvalidTransactionAmount) {
                            element.msg = errorMsgList.InnerCode_InvalidTransactionAmountMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_InvalidTransactionType) {
                            element.msg = errorMsgList.InnerCode_InvalidTransactionTypeMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_InvalidTransaction_UserNotCompatible) {
                            element.msg = errorMsgList.InnerCode_InvalidTransaction_UserNotCompatibleMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_InvalidTransaction_TrackingCode) {
                            element.msg = errorMsgList.InnerCode_InvalidTransaction_TrackingCodeMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_InvalidTransaction_Request) {
                            element.msg = errorMsgList.InnerCode_InvalidTransaction_RequestMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_InvalidTransaction_LowCredit) {
                            element.msg = errorMsgList.InnerCode_InvalidTransaction_LowCreditMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_InvalidSuggestion) {
                            element.msg = errorMsgList.InnerCode_InvalidSuggestionMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_InvalidWrStatTime) {
                            element.msg = errorMsgList.InnerCode_InvalidWrStatTimeMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_InvalidAccountNumber) {
                            element.msg = errorMsgList.InnerCode_InvalidAccountNumberMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_InvalidSnoozeState) {
                            element.msg = errorMsgList.InnerCode_InvalidSnoozeStateMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_InvalidSnoozeCntr) {
                            element.msg = errorMsgList.InnerCode_InvalidSnoozeCntrMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_InvalidUserNameOrPassword) {
                            element.msg = errorMsgList.InnerCode_InvalidUserNameOrPasswordMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_MobileNumberIsInUse) {
                            element.msg = errorMsgList.InnerCode_MobileNumberIsInUseMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_MaxSmsCntPerMobileNumber) {
                            element.msg = errorMsgList.InnerCode_MaxSmsCntPerMobileNumberMsg;
                            //console.log("errorMsgList.InnerCode_MaxSmsCntPerMobileNumberMsg");
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_InvalidTime2) {
                            element.msg = errorMsgList.InnerCode_InvalidTime2Msg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_IncompatibleVersion) {
                            element.msg = errorMsgList.InnerCode_IncompatibleVersionMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_UserNotFound) {
                            element.msg = errorMsgList.InnerCode_UserNotFoundMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_RequestCancelNotPermited) {
                            element.msg = errorMsgList.InnerCode_RequestCancelNotPermitedMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_InvalidCancelCause) {
                            element.msg = errorMsgList.InnerCode_InvalidCancelCauseMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_InvalidePaymentAmount) {
                            element.msg = errorMsgList.InnerCode_InvalidePaymentAmountMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_MoreThanRequest) {
                            element.msg = errorMsgList.InnerCode_MoreThanRequestMsg;
                        }
                        if (element.code == ErrorCodeEnum.InnerCode_CashPaymentNotAllowed) {
                            element.msg = errorMsgList.InnerCode_CashPaymentNotAllowedMsg;
                        }
                        
                        errorMsg.msg.push(element);
    
                    });
                }
    
            }
            else if (status == 400) {
                let message: InnerMessage = new InnerMessage();
                message.msg = errorMsgList.badRequestMsg;
                errorMsg.msg.push(message);
    
            }
            else {
                let message: InnerMessage = new InnerMessage();
                message.msg = errorMsgList.unableToConnectBackEnd;
                errorMsg.msg.push(message);
    
            }
            return errorMsg;
        }
    
    
        autoLogin(){
            if(localStorage.getItem("pulsInfo")){

              let pulsInfo:string = localStorage.getItem("pulsInfo");
              let MobileEncode:string =  pulsInfo.substr(0,9);
              let mobile:string = '09' + this.customFunc.decodingNumber(MobileEncode);
              let code:string = pulsInfo.substr(9,pulsInfo.length);
              
              let userData: ClientLoginData = {
                  firstName: null,
                  lastName: null,
                  mobileNumber: mobile,
                  smsCode: code,
                  loginType: this.storage.deviceType,
                  deviceId: this.shared.tokenFirebace
              }
              
              this.httpService.getCompleteLoginWithRequest(userData).subscribe(res=>{
                if(res){
                    localStorage.setItem("pulsInfo", pulsInfo);
                    this.storage.isLogin.next(true);
                    this.storage.userDataLogin = res;
                    this.storage.subject_userDataLogin.next(res);
                    let token = localStorage.getItem('userToken');
                    if(token == null || token == undefined || token != res.user.loginData.token){
                        localStorage.setItem('userToken', res.user.loginData.token);
                        this.storage.token.next(res.user.loginData.token);
                    }
                    //this.basicData.displayWebApp = true;
                    if(res.inProgressRequests){
                        if(res.inProgressRequests.length > 0){
                            this.shared.hasActiveRequest.next(true);
                        }
                        else{
                            this.shared.hasActiveRequest.next(false);
                        }
                    }
                    else{
                        this.shared.hasActiveRequest.next(false);
                    }

                    this.basicData.getUserLocations(res.user.loginData.token);
                    if(this.storage.pages.indexOf('IqBaz') != -1){
                        this._router.navigate(['/game/IqBaz/loading']);
                    }
                    else{
                        this._router.navigate([EnumUrls.address_home]);
                    }
                }
              }, error => {
                  //console.log("خطای1001 به هنگام عمل لاگین");
                this.clearLoginAndGoTocheckLayout();
              });
              
            }
            else{
                //console.log("خطای1002 به هنگام عمل لاگین");
                this.clearLoginAndGoTocheckLayout();
            }
        }
    
        clearLoginAndGoTocheckLayout(){
            localStorage.removeItem('userToken');
            localStorage.removeItem("pulsInfo");
            this.storage.isLogin.next(false);
            this.storage.subject_userDataLogin.next(null);
            if(this.storage.pages.indexOf('IqBaz') != -1){
                this._router.navigate(['/game/IqBaz/loading']);
            }
            else{
                this._router.navigate([EnumUrls.address_home]);
            }
        }
}