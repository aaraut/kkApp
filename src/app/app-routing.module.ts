import { HomeComponent } from './home/home.component';
import { TraingsComponent } from './container/components/traings/traings.component';
import { UnderConstructionComponent } from './container/components/under-construction/under-construction.component';
import { ApproveRejectComponent } from './container/components/approve-reject/approve-reject.component';
import { AuthenticationComponent } from './container/components/authentication/authentication.component';
import { ListingComponent } from './container/components/listing/listing.component';
import { SectionOneComponent } from './container/components/section-one/section-one.component';
import { PostingComponent } from './container/components/posting/posting.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { 
  AuthGuardService as AuthGuard 
} from './core/route-guards'

const routes: Routes = [
  {path: 'posting' , component: PostingComponent, canActivate: [AuthGuard] },
  {path: 'home' , component: HomeComponent },
  {path: '' , pathMatch: 'full', redirectTo: 'home'},
  {path: 'company' , component: ListingComponent, canActivate: [AuthGuard] },
  {path: 'seminar' , component: TraingsComponent, canActivate: [AuthGuard] },
  {path: 'login' , component: AuthenticationComponent},
  {path: 'admin' , component: ApproveRejectComponent, canActivate: [AuthGuard] },
  {path: 'about-us' , component: UnderConstructionComponent, canActivate: [AuthGuard] },
  {path: 'society' , component: UnderConstructionComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
