import { Component, OnInit, OnDestroy } from '@angular/core';
import { FavoriteService } from '../../core/services/favorite.service';
import { Attraction } from '../../core/models/attraction.model';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-favorite-list',
  templateUrl: './favorite-list.component.html',
  styleUrls: ['./favorite-list.component.scss']
})
export class FavoriteListComponent implements OnInit, OnDestroy {
  favorites: Attraction[] = [];
  selectedAttraction: Attraction | null = null;
  isModalOpen = false;
  
  selectedIds = new Set<number>(); // 存放已選取的 ID
  private destroy$ = new Subject<void>();

  constructor(private favoriteService: FavoriteService) {}

  ngOnInit(): void {
    // 訂閱 favorites$ 流，確保 LocalStorage 更新後畫面即時反應
    this.favoriteService.favorites$
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.favorites = data;
        // 資料更新後，移除不再清單中的選取 ID
        const currentIds = new Set(data.map(f => f.id));
        this.selectedIds.forEach(id => {
          if (!currentIds.has(id)) this.selectedIds.delete(id);
        });
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleSelect(id: number): void {
    if (this.selectedIds.has(id)) {
      this.selectedIds.delete(id);
    } else {
      this.selectedIds.add(id);
    }
  }

  toggleSelectAll(): void {
    if (this.selectedIds.size === this.favorites.length) {
      this.selectedIds.clear();
    } else {
      this.favorites.forEach(f => this.selectedIds.add(f.id));
    }
  }

  isAllSelected(): boolean {
    return this.favorites.length > 0 && this.selectedIds.size === this.favorites.length;
  }

  deleteSelected(): void {
    if (this.selectedIds.size === 0) return;
    
    console.log('UI: Deleting selected IDs:', Array.from(this.selectedIds));
    this.favoriteService.deleteByBatch(Array.from(this.selectedIds));
    console.log('UI: Batch delete finished.');
    this.selectedIds.clear();
  }

  onEdit(attraction: Attraction): void {
    // 傳送副本到編輯表單
    this.selectedAttraction = { ...attraction };
    this.isModalOpen = true;
  }

  onDelete(id: number): void {
    console.log('UI: Deleting single ID:', id);
    this.favoriteService.deleteFavorite(id);
    console.log('UI: Single delete finished.');
  }

  onSaveEdit(updatedAttraction: Attraction): void {
    this.favoriteService.updateFavorite(updatedAttraction);
    this.closeModal();
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.selectedAttraction = null;
  }
}
