import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Party {
  partyId: string;
  partyName:string;
  currentMember:number;
  memberLimit:number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  partyResponseList: Party[] | undefined;
  get emailInSession() { return localStorage.getItem('email');}


  constructor(private http: HttpClient, private router: Router) { 
    this.http.get<Party[]>("https://party-service.herokuapp.com/rest/api/party")
    .subscribe(
      (val) => {
        console.log("GET call successful value returned in body",
          val);
          this.partyResponseList = val;
      },
      response => {
        console.log("POST call in error", response);
      },
      () => {
        console.log("The POST observable is now completed.");
      });
      //get all partyId for the user
  }

  ngOnInit(): void {
    if (localStorage.getItem('email') == null) {
      window.alert("Please login first");
      this.router.navigate(['/login']);
    }
  }

  goCreateParty(): void {
    this.router.navigate(['/createParty'])
  }

  logout(): void {
    localStorage.removeItem('email')
    this.router.navigate(['/login'])
  }

  joinParty(partyId:string): void {
    this.http.post("https://party-service.herokuapp.com/rest/api/party/join",
      {
        "partyId": partyId,
        "email": localStorage.getItem('email')
      })
      .subscribe(
        (val) => {
          console.log("POST call successful value returned in body",
            val);
          window.location.reload()
        },
        response => {
          console.log("POST call in error", response);
          window.alert("Fail to join the party");
          window.location.reload()
        },
        () => {
          console.log("The POST observable is now completed.");
        });
  }

}
