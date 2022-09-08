import { LoginService } from '../../../services/httpLogin/login.service';
import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { BroadcastMessageService } from './broadcastMsg.service';
import { HandleError } from '../class/handleError.class';
import { BackendMessage } from '../class/Msg.class';
import { StorageService } from '../../../services/storage/storage.service';
import { BasicDataService } from '../../../services/basicData/basic-data.service';
import { CustomFunctionsService } from '../../../services/functions/custom-functions.service';
import { SharedService } from '../../../services/shared/shared.service';
import { ErrorCodeEnum } from '../enum/errorCode.enum';


@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
    errorCntrler: HandleError;
    routeName:string = '';
    
    constructor(private _router: Router,
        private storage: StorageService,
        private basicData: BasicDataService, 
        private shared: SharedService,
        private httpService:LoginService,
        private customFunc: CustomFunctionsService,
        private _broadcastMsgService: BroadcastMessageService) {
        this.errorCntrler = new HandleError(_router, storage, basicData, shared, httpService, customFunc);
     }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(request).pipe(
            catchError(
                (error: any, caught: Observable<HttpEvent<any>>) => {                  
                    let errMessage: BackendMessage = this.errorCntrler.handleErrorMethod(error.status, error.error.error);
                    let msgs:string[] = [];
                    errMessage.msg.forEach(element => {
                        /*---start remove error smsCodeInvalid from list---*/ 
                        if(element.code != ErrorCodeEnum.InnerCode_InvalidSmsCode){
                            if(element.code != ErrorCodeEnum.InnerCode_answerQuestionError){
                                msgs.push(element.msg);
                            }  
                        }    
                        /*---end remove error smsCodeInvalid from list---*/           
                    });
                    
                    this._broadcastMsgService.setItems(msgs);
                    throw error;
                }
            ),
        );
    }
}