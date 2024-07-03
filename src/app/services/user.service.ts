import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl="http://localhost:3000/";
  httpClient = inject(HttpClient);
  constructor() { }
}
