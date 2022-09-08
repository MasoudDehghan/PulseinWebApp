import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'safeHtml'
})
export class SafeHtmlPipe implements PipeTransform {

  constructor(private sanitizer:DomSanitizer){}

  transform(html:any) {
    let clean:any = this.sanitizer.bypassSecurityTrustHtml(html);
    //console.log("=====pipe=====");
    //console.log(clean);
    return clean;
  }

}
