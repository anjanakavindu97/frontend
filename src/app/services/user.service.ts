import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import User from "../types/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl="http://localhost:3000";
  httpClient = inject(HttpClient);
  constructor() { }

  addUser(modal: User) {
    return this.httpClient.post(this.apiUrl+'/users', modal)
  }
  getUsers() {
    return this.httpClient.get<User[]>(this.apiUrl+'/getusers')
  }

  getUser(id: String) {
    return this.httpClient.get<User>(this.apiUrl+'/getuser/'+id)
  }

  updateUser(id: String ,modal: User) {
    return this.httpClient.put(this.apiUrl+'/updateuser/'+id, modal)
  }

  deleteUser(id: String) {
    return this.httpClient.delete(this.apiUrl+'/deleteuser/'+id)
  }
}
