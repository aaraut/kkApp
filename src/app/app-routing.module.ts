import { SectionOneComponent } from './container/components/section-one/section-one.component';
import { PostingComponent } from './container/components/posting/posting.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path: 'posting' , component: PostingComponent},
  {path: 'home' , component: SectionOneComponent},
  {path: '' , pathMatch: 'full', redirectTo: 'home'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
