import { Component, OnInit, OnDestroy } from '@angular/core';
import { Image } from '../shared/models/image.model'
import { Subscription } from 'rxjs/Subscription';

import { ImageService } from './../shared/services/image.service';
@Component({
  selector: 'app-main-image',
  templateUrl: './main-image.component.html',
  styleUrls: ['./main-image.component.css']
})
export class MainImageComponent implements OnInit, OnDestroy {

  isLoading: boolean = true;
  currentImage: Image;
  imageRefreshInterval: any;
  imagesHistory: string[] = [];
  subscription: Subscription;

  constructor(private imageService: ImageService) { }

  /**
   * When component loaded fetch for the first time 
   * image from flickr public api.
   */
  ngOnInit() {
    this.getImage();
    this.imageRefreshInterval = setInterval(() => this.getImage(), 5000);
  }

  /**
   * Destroying the interval and the subscription
   *  that will not continue running in 
   * the background
   */
  ngOnDestroy() {
    clearInterval(this.imageRefreshInterval);
    this.subscription.unsubscribe();
  }

  getImage() {
    this.subscription = this.imageService.getImageRandomly().subscribe(
      (image: Image) => {
          if (!this.isLoading) {
            this.isLoading = true;
          }

          if (!this.isImageDisplayed(image.title)) {
            this.currentImage = image;
            this.imagesHistory.push(image.title);
          } else {
            this.getImage();
          }
          
          this.isLoading = false;
      }
   );
  }

  isImageDisplayed(imageName: string = '') {
    return this.imagesHistory.includes(imageName);
  }
}
