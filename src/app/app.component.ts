import { Component } from '@angular/core';
import { FavoriteService } from './core/services/favorite.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'tp6_u3cl4';

  constructor(private favoriteService: FavoriteService) {
    // 將 Service 掛載到 window 物件，方便您在 Console 直接測試
    (window as any).fav = this.favoriteService;
  }
}
