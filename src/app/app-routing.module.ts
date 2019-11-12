import { ApproveRejectComponent } from './container/components/approve-reject/approve-reject.component';
import { AuthenticationComponent } from './container/components/authentication/authentication.component';
import { ListingComponent } from './container/components/listing/listing.component';
import { SectionOneComponent } from './container/components/section-one/section-one.component';
import { PostingComponent } from './container/components/posting/posting.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path: 'posting' , component: PostingComponent},
  {path: 'home' , component: SectionOneComponent},
  {path: '' , pathMatch: 'full', redirectTo: 'home'},
  {path: 'company' , component: ListingComponent},
  {path: 'login' , component: AuthenticationComponent},
  {path: 'admin' , component: ApproveRejectComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
