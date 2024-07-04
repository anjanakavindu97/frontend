import {Component, inject} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from "@angular/material/button";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import User from "../../types/user";
import {UserService} from "../../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent {
  formBuilder = inject(FormBuilder)
  userForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    age: [''],
    address:[''],
    password: ['', [Validators.required, Validators.minLength(8)]]
  })

  userService=inject(UserService)
  router=inject(Router)
  route=inject(ActivatedRoute)
  editUserId!: String
  ngOnInit() {
    this.editUserId = this.route.snapshot.params["id"]
    if(this.editUserId) {
      this.userService.getUser(this.editUserId).subscribe(result => {
        this.userForm.patchValue(result)
      })
    }
  }
  addUser() {
    if(this.userForm.invalid) {
      alert("Please provide all field with valid data");
      return;
    }
    const modal: User = this.userForm.value;
    this.userService.addUser(modal).subscribe(result => {
      alert("User added successfully");
      this.router.navigateByUrl('/users');
    })
  }

  updateUser() {
    if(this.userForm.invalid) {
      alert("Please provide all field with valid data");
      return;
    }
    const modal: User = this.userForm.value;
    this.userService.updateUser(this.editUserId, modal).subscribe(result=>{
      alert("User Update Successfully")
      this.router.navigateByUrl('/users')
    })
  }
}
