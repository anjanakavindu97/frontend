import {Component, inject} from '@angular/core';
import User from "../types/user";
import {UserService} from "../services/user.service";
import {MatButtonModule} from "@angular/material/button";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [MatButtonModule, RouterLink],
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

  deleteUser(id: String) {
    const ok = confirm("Are you sure you want to delete this user?")
    if(ok) {
      this.userService.deleteUser(id).subscribe(result => {
        alert("User deleted successfully")
        this.users = this.users.filter((user) => user._id !== id)
      })
    }
  }

}
