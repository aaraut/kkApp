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
import { CarouselModule } from 'ngx-bootstrap';

@NgModule({
  declarations: [ContainerComponent, ScrollSpyDirective, SectionOneComponent],
  imports: [
    AngularMaterialModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    BsDropdownModule.forRoot(),
    CarouselModule.forRoot()
    
  ],
  exports: [ContainerComponent]
})
export class CoreModule { 
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {}

}
