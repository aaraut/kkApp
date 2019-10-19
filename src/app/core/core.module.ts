import { AppRoutingModule } from './../app-routing.module';
import { PostingComponent } from './../container/components/posting/posting.component';
import { HomeComponent } from './../home/home.component';
import { SectionOneComponent } from './../container/components/section-one/section-one.component';
import { ScrollSpyDirective } from './scroll-spy.directive';
import { ContainerComponent } from './../container/container.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

// import { environment } from '@env/environment';


import { MAT_DATE_LOCALE } from '@angular/material';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { CarouselModule, ModalModule } from "ngx-bootstrap";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [ContainerComponent, ScrollSpyDirective, SectionOneComponent,HomeComponent,
    PostingComponent],
  imports: [
    AngularMaterialModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    BsDropdownModule.forRoot(),
    CarouselModule.forRoot(),
    AppRoutingModule,
    ModalModule.forRoot(),
    FormsModule
  ],
  exports: [ContainerComponent]
})
export class CoreModule { 
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {}

}
