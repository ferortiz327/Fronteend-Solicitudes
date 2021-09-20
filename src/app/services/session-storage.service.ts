import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  constructor() { }


  set(key: string, data: any): void {
    try {
      sessionStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.error('Error saving', e);
    }
  }

  get(key: string): any {
    try {
      return JSON.parse(sessionStorage.getItem(key) || "");
    } catch (e) {
      return null;
    }
  }

  remove(key: string): void {
    try {
      if (this.get(key) != null) {
        sessionStorage.removeItem(key);
      }
    } catch (e) {
      console.error('Error removing key', e);
    }
  }

  clear(): void {
    try {
      sessionStorage.clear();
    } catch (e) {
      console.error('Error cleaning sessionStorage', e);
    }
  }
}
