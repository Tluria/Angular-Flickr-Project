import { Injectable} from '@angular/core';
import { HttpClient, HttpClientJsonpModule } from '@angular/common/http';
import { map, flatMap, first } from 'rxjs/operators';

import { Image } from './../models/image.model';

@Injectable()
export class ImageService {

  API_KEY = '15b91bfecab66c2d6b6af30d4c2279b0';

  constructor(private http: HttpClient) { }

  /**
   * Get images from Flickr public api
   * and returns only one.
   * 
   * NOTICED: Flickr api doesn't support returning  
   * limit amount of images.
   */
  getImageRandomly() {
    const url = 'https://api.flickr.com/services/feeds/photos_public.gne?format=json&api_key=' + this.API_KEY + '&jsoncallback=JSONP_CALLBACK';

    return this.http.jsonp(url, 'JSONP_CALLBACK').pipe(
        flatMap((data: any) => { 
          return data.items;
        }),
        map((data: any) => {
          const title = data.title || 'Untitle';
          return new Image(
            title, 
            data.description, 
            new Date(data.date_taken),
            data.media.m)
        }),
        first()
    );
  }
}
