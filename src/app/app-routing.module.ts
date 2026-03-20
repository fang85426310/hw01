import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AttractionListComponent } from './features/attraction-list/attraction-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: AttractionListComponent },
  { path: '**', redirectTo: 'list' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
