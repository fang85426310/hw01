import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AttractionListComponent } from './features/attraction-list/attraction-list.component';
import { FavoriteListComponent } from './features/favorite-list/favorite-list.component';
import { EditModalComponent } from './features/favorite-list/components/edit-modal/edit-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    AttractionListComponent,
    FavoriteListComponent,
    EditModalComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
