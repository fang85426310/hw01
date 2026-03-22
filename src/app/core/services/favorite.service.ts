import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Attraction } from '../models/attraction.model';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private readonly STORAGE_KEY = 'app_favorites';
  
  // 使用 BehaviorSubject 用於多個 Component 同步
  private favoritesSubject = new BehaviorSubject<Attraction[]>(this.loadFromStorage());
  public favorites$: Observable<Attraction[]> = this.favoritesSubject.asObservable();

  constructor() { }

  /**
   * 讀取暫存在 LocalStorage 的我的最愛列表
   * @returns Attraction[]
   */
  getFavorites(): Attraction[] {
    return this.favoritesSubject.value;
  }

  /**
   * 新增景點到我的最愛。需檢查 ID 是否重複。
   * @param attraction 欲新增的景點
   */
  addFavorite(attraction: Attraction): void {
    const currentFavorites = this.getFavorites();
    const isExist = currentFavorites.some(item => item.id === attraction.id);

    if (!isExist) {
      const updatedFavorites = [...currentFavorites, attraction];
      this.updateStorageAndNotify(updatedFavorites);
    }
  }

  /**
   * 編輯我的最愛中的資料
   * @param attraction 欲更新的景點
   */
  updateFavorite(attraction: Attraction): void {
    const currentFavorites = this.getFavorites();
    const index = currentFavorites.findIndex(item => item.id === attraction.id);

    if (index !== -1) {
      const updatedFavorites = [...currentFavorites];
      updatedFavorites[index] = attraction;
      this.updateStorageAndNotify(updatedFavorites);
    }
  }

  /**
   * 將特定資料從於我的最愛中移除
   * @param id 欲移除的景點編號
   */
  deleteFavorite(id: number): void {
    const currentFavorites = this.getFavorites();
    console.log('Service: deleting single ID', id, 'Current favorites count:', currentFavorites.length);
    const filteredFavorites = currentFavorites.filter(item => Number(item.id) !== Number(id));
    console.log('Service: filtered count:', filteredFavorites.length);
    this.updateStorageAndNotify(filteredFavorites);
  }

  /**
   * 批次移除我的最愛中的資料
   * @param ids 欲移除的景點編號陣列
   */
  deleteByBatch(ids: number[]): void {
    const currentFavorites = this.getFavorites();
    const idSet = new Set(ids.map(id => Number(id)));
    console.log('Service: batch deleting IDs', ids, 'Current favorites count:', currentFavorites.length);
    const filteredFavorites = currentFavorites.filter(item => !idSet.has(Number(item.id)));
    console.log('Service: filtered count:', filteredFavorites.length);
    this.updateStorageAndNotify(filteredFavorites);
  }

  /**
   * 檢查景點是否已在我的最愛中 (方便 UI 切換顯示)
   * @param id 景點 ID
   * @returns boolean
   */
  isFavorite(id: number): boolean {
    return this.getFavorites().some(item => item.id === id);
  }

  /**
   * 私有化：由 LocalStorage 載入資料
   */
  private loadFromStorage(): Attraction[] {
    const data = localStorage.getItem(this.STORAGE_KEY);
    try {
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Error parsing favorites from localStorage', e);
      return [];
    }
  }

  /**
   * 私有化：更新 Storage 並通知所有訂閱者
   * @param favorites 更新後的陣列
   */
  private updateStorageAndNotify(favorites: Attraction[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(favorites));
    this.favoritesSubject.next(favorites);
  }
}
