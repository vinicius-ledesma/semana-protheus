import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [CommonModule],
})
export class SharedModule {
  getBaseUrl(): string {
    const erpAppConfig: any = JSON.parse(
      sessionStorage.getItem('ERPAPPCONFIG')
    );
    if (erpAppConfig) {
      return erpAppConfig.api_baseUrl;
    } else {
      return 'http://192.168.233.1:8081/rest';
    }
  }
  getAuth(): string {
    const erpToken: any = JSON.parse(sessionStorage.getItem('ERPTOKEN'));
    if (erpToken) {
      return `Bearer ${erpToken.access_token}`;
    } else {
      return 'Basic Y29tdW06Y29tdW0=';
    }
  }
}
