import { Component, OnInit, OnDestroy } from '@angular/core';
import { Image } from '../shared/models/image.model'

import { ImageService } from './../shared/services/image.service';
@Component({
  selector: 'app-main-image',
  templateUrl: './main-image.component.html',
  styleUrls: ['./main-image.component.css']
})
export class MainImageComponent implements OnInit, OnDestroy {

  currentImage: Image;
  imageRefreshInterval: any;
  imagesHistory: string[] = [];

  constructor(private imageService: ImageService) { }

  ngOnInit() {
    this.imageRefresh();
    this.imageRefreshInterval = setInterval(() => this.imageRefresh(), 5000);
  }

  ngOnDestroy() {
    clearInterval(this.imageRefreshInterval);
  }

  getImage() {
    this.imageService.getImageRandomly().subscribe(
      (image: Image) => {
        if (!this.isImageDisplayed(image.title)) {
          this.currentImage = image;
          this.imagesHistory.push(image.title);
        }
      }
   );
  }

  imageRefresh() {
    this.getImage();
  }

  isImageDisplayed(imageName: string) {
    return this.imagesHistory.includes(imageName);
  }
}
