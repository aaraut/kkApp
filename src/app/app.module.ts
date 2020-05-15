import { LoaderInterceptor } from './app.interceptor';
import { AuthGuardService } from './core/route-guards';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { RouterModule } from '@angular/router';
import { CoreModule } from './core/core.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularWebStorageModule } from 'angular-web-storage';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SectionOneComponent } from './container/components/section-one/section-one.component';
import { PostingComponent } from './container/components/posting/posting.component';
import { AuthenticationComponent } from './container/components/authentication/authentication.component';
import { ApproveRejectComponent } from './container/components/approve-reject/approve-reject.component';
import { UnderConstructionComponent } from './container/components/under-construction/under-construction.component';
import { TraingsComponent } from './container/components/traings/traings.component';
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { HeaderComponent } from './common/header/header.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    AngularMaterialModule,

    CoreModule,
    AngularWebStorageModule,
    AppRoutingModule,
  ],
  providers: [
    AuthGuardService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
