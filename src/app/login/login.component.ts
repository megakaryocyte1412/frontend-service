import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;

  profileForm!: FormGroup;

  get email() { return this.profileForm.get('email'); } 
  get password() { return this.profileForm.get('password'); } 

  constructor(private http:HttpClient, private router: Router) { 
  }
  ngOnInit(): void {
    this.profileForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required
      ])
    });
  }

  onSubmit() {
    console.log(this.profileForm.value);
    this.http.post("http://localhost:8080/rest/api/user/login",
    {
        "email": this.profileForm.get('email')!.value,
        "password": this.profileForm.get('password')!.value
    })
    .subscribe(
        (val) => {
            console.log("POST call successful value returned in body", 
                        val);
                        this.router.navigate(['/home']);
        },
        response => {
            console.log("POST call in error", response);
            this.profileForm.reset();
        },
        () => {
            console.log("The POST observable is now completed.");
        });
  }

  goRegister(): void {
    this.router.navigate(['/register'])
  }
}
