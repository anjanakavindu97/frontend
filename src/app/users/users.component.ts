import {Component, inject} from '@angular/core';
import User from "../types/user";
import {UserService} from "../services/user.service";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  users: User[]=[]
  userService=inject(UserService)
  ngOnInit() {
    this.userService.getUsers().subscribe((result) => {
      this.users = result
    })
  }

}
