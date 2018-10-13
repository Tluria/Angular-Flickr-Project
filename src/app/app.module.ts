// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';

// Comonents
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MainImageComponent } from './main-image/main-image.component';

// Services
import { ImageService } from './shared/services/image.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainImageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpClientJsonpModule,
  ],
  providers: [ImageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
