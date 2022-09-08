import { SharedService } from '../../../services/shared/shared.service';
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-download-page',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.css']
})
export class DownloadComponent implements OnInit {

  constructor(private shared:SharedService,
    public titleSeo:Title,
    public meta:Meta,
    @Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit() {
    this.shared.inPageDownload.next(true);
    if (isPlatformBrowser(this.platformId)){
      window.scrollTo(0, 0);
    }
    this.titleSeo.setTitle("پالسین - دانلود اپلیکیشن");
    this.meta.updateTag({
      name: 'description',
      content: "دانلود اپلیکیشن پالسین"
    });
  }

}
