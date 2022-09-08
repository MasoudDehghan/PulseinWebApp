import { BrowserModule,BrowserTransferStateModule} from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PLATFORM_ID, APP_ID, Inject } from '@angular/core';
import { isPlatformBrowser, AsyncPipe } from '@angular/common';

//nik=cky-lenaers
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';

//ngx-owl-carousel-o
import { CarouselModule } from 'ngx-owl-carousel-o';

//diviceDetective
import { DeviceDetectorModule } from 'ngx-device-detector';

//primeng
import {DialogModule} from 'primeng/dialog';

//ng recaptcha
import { RecaptchaModule } from 'ng-recaptcha';

//ngx-toastr
import { ToastrModule } from 'ngx-toastr';

//Lottie Animation
import { LottieAnimationViewModule } from 'ng-lottie';

//ng2-img-max
import { Ng2ImgMaxModule } from 'ng2-img-max';

//import ng2-file-upload
import { FileUploadModule } from 'ng2-file-upload';

//Google map
import { AgmCoreModule } from '@agm/core';

///firebase
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';

// Import library module for schema mark up
import { NgxJsonLdModule } from '@ngx-lite/json-ld';

//components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { JobCatMenuComponent } from './components/menus/job-cat-menu/job-cat-menu.component';
import { JobfavorComponent } from './components/menus/jobfavor/jobfavor.component';
import { UsersIdeaComponent } from './components/menus/users-idea/users-idea.component';
import { FooterComponent } from './components/footer/footer.component';
import { HadyehComponent } from './components/module/hadyeh/hadyeh.component';
import { AppDownloadComponent } from './components/app-download/app-download.component';
//import { MobTopMenuComponent } from './components/menus/mob-top-menu/mob-top-menu.component';
import { HowWorkComponent } from './components/module/how-work/how-work.component';
import { SpeseficsWebComponent } from './components/module/spesefics-web/spesefics-web.component';
import { JobCat1Component } from './components/pages/job-cat1/job-cat1.component';
import { AllServicesComponent } from './components/pages/all-services/all-services.component';
import { Cat1cat2Component } from './components/module/cat1cat2/cat1cat2.component';
import { ContactUsComponent } from './components/pages/contact-us/contact-us.component';
import { QuestionsComponent } from './components/pages/questions/questions.component';
import { QuestionsExpertComponent } from './components/pages/questions-expert/questions-expert.component';
import { RulesComponent } from './components/pages/rules/rules.component';
import { AboutUsComponent } from './components/pages/about-us/about-us.component';
import { JobCat2Component } from './components/pages/job-cat2/job-cat2.component';
import { ExpertsComponent } from './components/pages/experts/experts.component';
//import { LandingComponent } from './components/pages/landing/landing.component';
import { MobFixedBottomMenuComponent } from './components/menus/mob-fixed-bottom-menu/mob-fixed-bottom-menu.component';
//import { LandingsNotificationComponent } from './components/module/landings-notification/landings-notification.component';
import { ReferralComponent } from './components/pages/referral/referral.component';
import { TimerComponent } from './components/module/timer/timer.component';
import { ButtonGADirective } from './components/directive/buttonGADirective';
import { CriticismSuggestionComponent } from './components/pages/criticism-suggestion/criticism-suggestion.component';
import { ApplicationComponent } from './components/layout/application/application.component';
import { webappFooterComponent } from './components/webApp/modules/footer/webapp-footer.component';
import { PhotoPopupComponent } from './components/webApp/modules/photo-popup/photo-popup.component';
import { SmsloginComponent } from './components/webApp/modules/smslogin/smslogin.component';
import { LoadingComponent } from './components/webApp/modules/loading/loading.component';
import { ErrorHandlerInterceptor } from './components/webApp/services/errorHandler.interceptor';
import { BroadcastMessageService } from './components/webApp/services/broadcastMsg.service';
import { ModalAddCreditComponent } from './components/webApp/modules/modal-add-credit/modal-add-credit.component';
import { TransactionComponent } from './components/webApp/pages/transaction/transaction.component';
import { Jobcat3Component } from './components/pages/jobcat3/jobcat3.component';
import { GHeaderComponent } from './components/module/g-header/g-header.component';
import { UserMenuModalComponent } from './components/modals/user-menu-modal/user-menu-modal.component';
import { MenuLoginItmeComponent } from './components/module/menu-login-itme/menu-login-itme.component';
import { SearchModalComponent } from './components/modals/search-modal/search-modal.component';
import { UsualPagesComponent } from './components/layout/usual-pages/usual-pages.component';
import { InviteComponent } from './components/modals/invite/invite.component';
import { ProfileComponent } from './components/webApp/pages/profile/profile.component'
import { CandidateLocationComponent } from './components/webApp/pages/candidate-location/candidate-location.component';
//import { AreaboxComponent } from './components/webApp/modules/areabox/areabox.component';
import { FinishedRequestsComponent } from './components/webApp/pages/finished-requests/finished-requests.component';
import { AllSearchComponent } from './components/pages/all-search/all-search.component';
import { UsefulCategoryComponent } from './components/menus/useful-category/useful-category.component';
import { DiscountCategoriesComponent } from './components/menus/discount-categories/discount-categories.component';
import { DownloadComponent } from './components/pages/download/download.component';
import { CheckFirebaseNotificationComponent } from './components/layout/check-firebase-notification/check-firebase-notification.component';
import { IqBazLoginComponent } from './components/game/IQbaz/iq-baz-login/iq-baz-login.component';
import { StartGameComponent } from './components/game/IQbaz/start-game/start-game.component';
import { EndGameComponent } from './components/game/IQbaz/end-game/end-game.component';
import { FooterIQbazComponent } from './components/game/IQbaz/footer-iqbaz/footer-iqbaz.component';
import { AparatComponent } from './components/game/IQbaz/aparat/aparat.component';
import { LoadingIqBazComponent } from './components/game/IQbaz/loading-iq-baz/loading-iq-baz.component';
import { LoadingFullpageLattiComponent } from './components/module/loading-fullpage-latti/loading-fullpage-latti.component';
import { RequestRegister2Component } from './components/webApp/pages/request-register2/request-register2.component';
import { JobcatsComponent } from './components/webApp/modules/registerModules/jobcats/jobcats.component';
import { SelectJobcat3Component } from './components/webApp/modules/registerModules/select-jobcat3/select-jobcat3.component';
import { ExtraDescriptionComponent } from './components/webApp/modules/registerModules/extra-description/extra-description.component';
import { DateTimeComponent } from './components/webApp/modules/registerModules/date-time/date-time.component';
import { RequestSummaryComponent } from './components/webApp/modules/registerModules/request-summary/request-summary.component';
import { RequestRegisterResultComponent } from './components/webApp/modules/registerModules/request-register-result/request-register-result.component';
import { CancelRequestComponent } from './components/webApp/pages/cancel-request/cancel-request.component';
import { RequestQuestionsComponent } from './components/webApp/modules/registerModules/request-questions/request-questions.component';
import { PreRegisterLoadingComponent } from './components/webApp/modules/registerModules/pre-register-loading/pre-register-loading.component';
import { SelectAreaComponent } from './components/modals/select-area/select-area.component';
import { SelectCandidateLocationComponent } from './components/modals/select-candidate-location/select-candidate-location.component';
import { DrawerMenuComponent } from './components/menus/drawer-menu/drawer-menu.component';
import { MessagingService } from './services/messaging/messaging.service';
import { SeoCategoryComponent } from './components/pages/seo-category/seo-category.component';
import { FolloweRequestComponent } from './components/modals/followe-request/followe-request.component';
import { DiscountModalComponent } from './components/modals/discount-modal/discount-modal.component';
import { LandingComponent } from './components/pages/landing/landing.component';
import { CandidateLocationEditComponent } from './components/webApp/pages/candidate-location-edit/candidate-location-edit.component';
import { DetailsOfferComponent } from './components/webApp/pages/follow-request/details-offer/details-offer.component';
import { FollowRequestComponent } from './components/layout/follow-request/follow-request.component';
import { WaitDoAckComponent } from './components/webApp/pages/follow-request/wait-do-ack/wait-do-ack.component';
import { OngoingComponent } from './components/webApp/pages/follow-request/ongoing/ongoing.component';
import { WaitToPaymentComponent } from './components/webApp/pages/follow-request/wait-to-payment/wait-to-payment.component';
import { SurveyComponent } from './components/webApp/pages/follow-request/survey/survey.component';
import { DetailsRequestComponent } from './components/webApp/pages/follow-request/details-request/details-request.component';
import { FinishRequestDetailsComponent } from './components/webApp/modules/finish-request-details/finish-request-details.component';
import { InvoiceComponent } from './components/webApp/modules/invoice/invoice.component';
import { WaitForOffersComponent } from './components/webApp/pages/follow-request/wait-for-offers/wait-for-offers.component';
import { SafeHtmlPipe } from './components/pipes/safe-html.pipe';
import { SelectCityComponent } from './components/webApp/modules/registerModules/select-city/select-city.component';
import { AddressMapComponent } from './components/webApp/modules/registerModules/address-map/address-map.component';
import { AddressDetailComponent } from './components/webApp/modules/registerModules/address-detail/address-detail.component';
import { CookieService } from 'ngx-cookie-service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    JobCatMenuComponent,
    JobfavorComponent,
    UsersIdeaComponent,
    FooterComponent,
    HadyehComponent,
    AppDownloadComponent,
    //MobTopMenuComponent,
    HowWorkComponent,
    SpeseficsWebComponent,
    JobCat1Component,
    AllServicesComponent,
    Cat1cat2Component,
    ContactUsComponent,
    QuestionsComponent,
    QuestionsExpertComponent,
    RulesComponent,
    AboutUsComponent,
    JobCat2Component,
    ExpertsComponent,
    //LandingComponent,
    MobFixedBottomMenuComponent,
    //LandingsNotificationComponent,
    ReferralComponent,
    TimerComponent,
    ButtonGADirective,
    CriticismSuggestionComponent,
    ApplicationComponent,
    webappFooterComponent,
    PhotoPopupComponent,
    SmsloginComponent,
    LoadingComponent,
    ModalAddCreditComponent,
    TransactionComponent,
    Jobcat3Component,
    GHeaderComponent,
    UserMenuModalComponent,
    MenuLoginItmeComponent,
    SearchModalComponent,
    UsualPagesComponent,
    InviteComponent,
    ProfileComponent,
    CandidateLocationComponent,
    //AreaboxComponent,
    FinishedRequestsComponent,
    AllSearchComponent,
    UsefulCategoryComponent,
    DiscountCategoriesComponent,
    DownloadComponent,
    CheckFirebaseNotificationComponent,
    IqBazLoginComponent,
    StartGameComponent,
    EndGameComponent,
    FooterIQbazComponent,
    AparatComponent,
    LoadingIqBazComponent,
    LoadingFullpageLattiComponent,
    RequestRegister2Component,
    JobcatsComponent,
    SelectJobcat3Component,
    ExtraDescriptionComponent,
    DateTimeComponent,
    RequestSummaryComponent,
    RequestRegisterResultComponent,
    CancelRequestComponent,
    RequestQuestionsComponent,
    PreRegisterLoadingComponent,
    SelectAreaComponent,
    SelectCandidateLocationComponent,
    DrawerMenuComponent,
    SeoCategoryComponent,
    FolloweRequestComponent,
    DiscountModalComponent,
    LandingComponent,
    CandidateLocationEditComponent,
    DetailsOfferComponent,
    FollowRequestComponent,
    WaitDoAckComponent,
    OngoingComponent,
    WaitToPaymentComponent,
    SurveyComponent,
    DetailsRequestComponent,
    FinishRequestDetailsComponent,
    InvoiceComponent,
    WaitForOffersComponent,
    SafeHtmlPipe,
    SelectCityComponent,
    AddressMapComponent,
    AddressDetailComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'pulsien-app' }),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireMessagingModule,
    AngularFireModule.initializeApp(environment.firebase),
    DialogModule,
    CarouselModule,
    Ng2ImgMaxModule,
    FileUploadModule,
    ScrollToModule.forRoot(),
    DeviceDetectorModule.forRoot(),
    BrowserTransferStateModule,
    RecaptchaModule.forRoot(),
    LottieAnimationViewModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAod3ajd1BL1gz8QmCk2okNYs5H5436iFs' //Google API key for maps
    }),
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-full-width'
    }),
    NgxJsonLdModule
  ],
  providers: [
    BroadcastMessageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true
    },
    MessagingService,
    AsyncPipe,
    CookieService
   // { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(APP_ID) private appId: string) {
    const platform = isPlatformBrowser(platformId) ?
      'in the browser' : 'on the server';
    //console.log(`Running ${platform} with appId=${appId}`);
  }
}
