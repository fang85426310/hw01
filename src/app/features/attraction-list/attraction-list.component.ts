import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { Attraction } from 'src/app/core/models/attraction.model';
import { FavoriteService } from 'src/app/core/services/favorite.service';

@Component({
  selector: 'app-attraction-list',
  templateUrl: './attraction-list.component.html',
  styleUrls: ['./attraction-list.component.scss']
})
export class AttractionListComponent implements OnInit {
  attractions: Attraction[] = [];
  totalCount: number = 0;
  currentPage: number = 1;
  pageSize: number = 30; // API 預設每頁 30 筆
  selectedCategory: string = '';
  isLoading: boolean = false;

  categories = [
    { id: '', name: '全部景點' },
    { id: '11', name: '養生溫泉' },
    { id: '12', name: '藍色公路' },
    { id: '13', name: '歷史古蹟' },
    { id: '14', name: '藝文館所' },
    { id: '15', name: '自然風景' },
    { id: '16', name: '宗教信仰' },
    { id: '17', name: '體育場館' },
    { id: '18', name: '戶外運動' },
    { id: '19', name: '親子共遊' },
    { id: '20', name: '公園綠地' },
    { id: '21', name: '單車遊蹤' },
    { id: '22', name: '夜市商圈' },
    { id: '33', name: '主題園區' },
    { id: '38', name: '其它' }
  ];

  constructor(
    private apiService: ApiService,
    private favoriteService: FavoriteService
  ) { }

  ngOnInit(): void {
    this.loadAttractions();
  }
  toggleFavorite(attraction: Attraction): void {
    if (this.isFavorite(attraction.id)) {
      this.favoriteService.deleteFavorite(attraction.id);
    } else {
      this.favoriteService.addFavorite(attraction);
    }
  }

  isFavorite(id: number): boolean {
    return this.favoriteService.isFavorite(id);
  }
  loadAttractions(): void {
    this.isLoading = true;
    this.apiService.getAttractions(this.currentPage, this.selectedCategory).subscribe({
      next: (response) => {
        this.attractions = response.data;
        this.totalCount = response.total;
        this.isLoading = false;
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      error: (error) => {
        console.error('Error fetching attractions:', error);
        this.isLoading = false;
      }
    });
  }

  onCategoryChange(): void {
    this.currentPage = 1;
    this.loadAttractions();
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadAttractions();
  }

  get totalPages(): number {
    return Math.ceil(this.totalCount / this.pageSize);
  }

  // 小幅度的分頁導航邏輯
  get pageNumbers(): number[] {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, this.currentPage - 2);
    let endPage = Math.min(this.totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  }
}
