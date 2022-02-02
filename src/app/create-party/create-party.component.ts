import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-party',
  templateUrl: './create-party.component.html',
  styleUrls: ['./create-party.component.css']
})
export class CreatePartyComponent implements OnInit {

  partyForm!: FormGroup;

  get email() { return this.partyForm.get('email'); }
  get partyName() { return this.partyForm.get('partyName'); }
  get maximumPartyMember() { return this.partyForm.get('maximumPartyMember'); }


  constructor(private http: HttpClient, private router: Router) {
  }
  ngOnInit(): void {
    this.partyForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      partyName: new FormControl('', [
        Validators.required,
        Validators.maxLength(255)
      ]),
      maximumPartyMember: new FormControl('', [
        Validators.required
      ])
    });
  }

  onSubmit() {
    console.log(this.partyForm.value);
    this.http.post("http://localhost:8080/rest/api/party/create",
      {
        "partyName": this.partyForm.get('partyName')!.value,
        "ownerEmail": this.partyForm.get('email')!.value,
        "memberLimit": this.partyForm.get('maximumPartyMember')!.value,
      })
      .subscribe(
        (val) => {
          console.log("POST call successful value returned in body",
            val);
          this.router.navigate(['/home']);
        },
        response => {
          console.log("POST call in error", response);
          window.alert("Create party fail !!!");
          this.partyForm.reset();
        },
        () => {
          console.log("The POST observable is now completed.");
        });
  }

}
