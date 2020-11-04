import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  urlHost = this.sharedModule.getBaseUrl();
  auth = this.sharedModule.getAuth();
  constructor(private http: HttpClient, private sharedModule: SharedModule) {}

  getReceivable(): Observable<any> {
    const headers = new HttpHeaders().append('Authorization', this.auth);
    return this.http.get(this.urlHost + '/api/sample/receivable', {
      headers,
    });
  }
  getPending(): Observable<any> {
    const headers = new HttpHeaders().append('Authorization', this.auth);
    return this.http.get(this.urlHost + '/api/sample/receivable/pending', {
      headers,
    });
  }
  getOverdue(): Observable<any> {
    const headers = new HttpHeaders().append('Authorization', this.auth);
    return this.http.get(this.urlHost + '/api/sample/receivable/overdue', {
      headers,
    });
  }
}
