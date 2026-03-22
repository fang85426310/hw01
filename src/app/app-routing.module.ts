import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AttractionListComponent } from './features/attraction-list/attraction-list.component';
import { FavoriteListComponent } from './features/favorite-list/favorite-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: AttractionListComponent },
  { path: 'favorites', component: FavoriteListComponent },
  { path: '**', redirectTo: 'list' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
