import { ScrollSpyDirective } from './core/scroll-spy.directive';
import { CoreModule } from './core/core.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SectionOneComponent } from './container/components/section-one/section-one.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
