import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class Version{
    appVersion:string = "v1.1.0";
    localStorageKey:string = "appVersion";
}