import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponse, Attraction } from '../models/attraction.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  /**
   * 獲取景點列表
   * @param page 頁碼 (每次回應30筆資料)
   * @param categoryIds 查詢的分類編號 (支援單一字串或陣列，多個時以逗號,分隔)。例如 '12,34,124' 或 ['12', '34']
   * @param lang 語系代碼，預設為 zh-tw
   */
  getAttractions(page: number = 1, categoryIds: string | string[] = '', lang: string = 'zh-tw'): Observable<ApiResponse<Attraction>> {
    let params = new HttpParams()
      .set('page', page.toString());
    
    if (categoryIds) {
      const categoryIdsStr = Array.isArray(categoryIds) ? categoryIds.join(',') : categoryIds;
      params = params.set('categoryIds', categoryIdsStr);
    }

    const url = `${this.baseUrl}/${lang}/Attractions/All`;
    
    return this.http.get<ApiResponse<Attraction>>(url, {
      params,
      headers: { 'Accept': 'application/json' }
    });
  }
}
