import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ViewerComponent } from './viewer/viewer.component';
import { ViewerMiradorComponent } from './viewer/viewer-mirador/viewer-mirador.component';

@NgModule({
  declarations: [
    AppComponent,
    ViewerComponent,
    ViewerMiradorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
