import { WaitForOffersComponent } from './components/webApp/pages/follow-request/wait-for-offers/wait-for-offers.component';
import { FollowRequestComponent } from './components/layout/follow-request/follow-request.component';
import { CandidateLocationEditComponent } from './components/webApp/pages/candidate-location-edit/candidate-location-edit.component';
import { PreRegisterLoadingComponent } from './components/webApp/modules/registerModules/pre-register-loading/pre-register-loading.component';
import { RequestQuestionsComponent } from './components/webApp/modules/registerModules/request-questions/request-questions.component';
import { CancelRequestComponent } from './components/webApp/pages/cancel-request/cancel-request.component';
import { RequestRegisterResultComponent } from './components/webApp/modules/registerModules/request-register-result/request-register-result.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//components
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { JobCat1Component } from './components/pages/job-cat1/job-cat1.component';
import { AllServicesComponent } from './components/pages/all-services/all-services.component';
import { ContactUsComponent } from './components/pages/contact-us/contact-us.component';
import { QuestionsComponent } from './components/pages/questions/questions.component';
import { QuestionsExpertComponent } from './components/pages/questions-expert/questions-expert.component';
import { RulesComponent } from './components/pages/rules/rules.component';
import { AboutUsComponent } from './components/pages/about-us/about-us.component';
import { JobCat2Component } from './components/pages/job-cat2/job-cat2.component';
import { ExpertsComponent } from './components/pages/experts/experts.component';
import { LandingComponent } from './components/pages/landing/landing.component';
import { ReferralComponent } from './components/pages/referral/referral.component';
import { CriticismSuggestionComponent } from './components/pages/criticism-suggestion/criticism-suggestion.component';
import { ApplicationComponent } from './components/layout/application/application.component';
import { AuthGaurdService } from './components/webApp/services/gaurd/auth-gaurd-service';
import { TransactionComponent } from './components/webApp/pages/transaction/transaction.component';
import { Jobcat3Component } from './components/pages/jobcat3/jobcat3.component';
import { UsualPagesComponent } from './components/layout/usual-pages/usual-pages.component';
import { ProfileComponent } from './components/webApp/pages/profile/profile.component';
import { CandidateLocationComponent } from './components/webApp/pages/candidate-location/candidate-location.component';
import { FinishedRequestsComponent } from './components/webApp/pages/finished-requests/finished-requests.component';
import { AllSearchComponent } from './components/pages/all-search/all-search.component';
import { DownloadComponent } from './components/pages/download/download.component';
//import { CheckFirebaseNotificationComponent } from './components/layout/check-firebase-notification/check-firebase-notification.component';
import { IqBazLoginComponent } from './components/game/IQbaz/iq-baz-login/iq-baz-login.component';
import { StartGameComponent } from './components/game/IQbaz/start-game/start-game.component';
import { EndGameComponent } from './components/game/IQbaz/end-game/end-game.component';
import { IqbazGaurdService } from './services/game/gaurd/iqbaz-gaurd.service';
import { LoadingIqBazComponent } from './components/game/IQbaz/loading-iq-baz/loading-iq-baz.component';
import { RequestRegister2Component } from './components/webApp/pages/request-register2/request-register2.component';
import { JobcatsComponent } from './components/webApp/modules/registerModules/jobcats/jobcats.component';
import { SelectJobcat3Component } from './components/webApp/modules/registerModules/select-jobcat3/select-jobcat3.component';
import { ExtraDescriptionComponent } from './components/webApp/modules/registerModules/extra-description/extra-description.component';
import { DateTimeComponent } from './components/webApp/modules/registerModules/date-time/date-time.component';
import { RequestSummaryComponent } from './components/webApp/modules/registerModules/request-summary/request-summary.component';
import { CheckFirebaseNotificationComponent } from './components/layout/check-firebase-notification/check-firebase-notification.component';
import { SeoCategoryComponent } from './components/pages/seo-category/seo-category.component';
import { DetailsOfferComponent } from './components/webApp/pages/follow-request/details-offer/details-offer.component';
import { WaitDoAckComponent } from './components/webApp/pages/follow-request/wait-do-ack/wait-do-ack.component';
import { OngoingComponent } from './components/webApp/pages/follow-request/ongoing/ongoing.component';
import { WaitToPaymentComponent } from './components/webApp/pages/follow-request/wait-to-payment/wait-to-payment.component';
import { SurveyComponent } from './components/webApp/pages/follow-request/survey/survey.component';
import { DetailsRequestComponent } from './components/webApp/pages/follow-request/details-request/details-request.component';
import { SelectCityComponent } from './components/webApp/modules/registerModules/select-city/select-city.component';
import { AddressMapComponent } from './components/webApp/modules/registerModules/address-map/address-map.component';
import { AddressDetailComponent } from './components/webApp/modules/registerModules/address-detail/address-detail.component';


const routes: Routes = [

  { path : 'webApp', component: ApplicationComponent,
    children: [
      { path:"", redirectTo: 'requestRegister', pathMatch: 'full' },
      { path : "profile", canActivate: [AuthGaurdService], component : ProfileComponent},
      { path : "candidateLocations", canActivate: [AuthGaurdService], component : CandidateLocationComponent },
      { path : "locationEdit", canActivate: [AuthGaurdService], component : CandidateLocationEditComponent },
      { path : "cancelRequest", canActivate: [AuthGaurdService], component : CancelRequestComponent },
      { path : "transactions", canActivate: [AuthGaurdService], component : TransactionComponent },
      { path : "finishedRequests", canActivate: [AuthGaurdService], component : FinishedRequestsComponent },
      { path : "requestRegister", component : RequestRegister2Component, 
        children:[
          { path:"", redirectTo: 'mainCategories', pathMatch: 'full' },
          { path:"mainCategories", component: JobcatsComponent },
          { path:"selectCategory3", component: SelectJobcat3Component },
          { path:"extraDescription", component: ExtraDescriptionComponent },
          { path:"dateTime", component: DateTimeComponent },
          //{ path:"location", component: RequestLocationComponent },
          { path:"location", component: AddressMapComponent },
          { path:"address", component: AddressDetailComponent },
          { path:"summary", component: RequestSummaryComponent },
          { path:"requestResult", component: RequestRegisterResultComponent },
          { path:"questions", component: RequestQuestionsComponent },
          { path:"selectCity", component: SelectCityComponent},
          { path:"loading", component: PreRegisterLoadingComponent },
        ]
      }
    ] 
  },

  { path : "followRequest", component : FollowRequestComponent, 
    children:[
      { path:"", redirectTo: 'waitToOffer', pathMatch: 'full' },
      { path : "waitToOffer", component : WaitForOffersComponent },
      { path : "offerDetails", component : DetailsOfferComponent },
      { path : "waitDoAck", component : WaitDoAckComponent },
      { path : "ongoing", component : OngoingComponent },
      { path : "waitToPayment", component : WaitToPaymentComponent },
      { path : "survey", component : SurveyComponent },
      { path : "detailsRequest", component : DetailsRequestComponent}
    ]
  },

  {path:"landing", component: LandingComponent},
  {path:"referral/:id", component: ReferralComponent},
  {path:"comercial/:id", component: CheckFirebaseNotificationComponent},


  /*****game IQBaz****/
  /**/
  {path:"game/IqBaz/login", component: IqBazLoginComponent},
  {path:"game/IqBaz/login/:refID", component: IqBazLoginComponent},
  {path:"game/IqBaz/start", component: StartGameComponent},
  {path:"game/IqBaz/end", canActivate: [IqbazGaurdService], component: EndGameComponent},
  {path:"game/IqBaz/loading", component: LoadingIqBazComponent},
  /**/

  {path:"", canActivate: [AuthGaurdService], component: UsualPagesComponent,
    children: [
      {path:"",redirectTo: '/Home', pathMatch: 'full'},
      {path:"Home", component: HomeComponent},
      {path:"download", component: DownloadComponent},
      {path:"searchResult", component: AllSearchComponent},
      {path:"services", component: AllServicesComponent},
      {path:"experts", component: ExpertsComponent},
      {path:"contact-us", component: ContactUsComponent},
      {path:"CriticismAndSuggestion", component: CriticismSuggestionComponent},
      {path:"FAQs", component: QuestionsComponent},
      {path:"FAQs-expert", component: QuestionsExpertComponent},
      {path:"rules", component: RulesComponent},
      {path:"about-us", component: AboutUsComponent},
      {path:"terms/:terms.html", component: RulesComponent},
      {path:"service/:jobcat3Ename", component: SeoCategoryComponent},
      {path:"categories2/:cat2", component: JobCat2Component},
      {path:"categories3/:cat3Ename", component: Jobcat3Component},
      {path:"notFound", component: NotFoundComponent},
      {path:":id", component: JobCat1Component},
      {path:":cat1/:cat2", component: JobCat2Component}
    ]
  },

  {path:"**", component: NotFoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

