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


  constructor(private http: HttpClient, private router: Router) { 
    this.http.get<Party[]>("http://localhost:8080/rest/api/party")
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
  }

  ngOnInit(): void {

  }

  goCreateParty(): void {
    this.router.navigate(['/createParty'])
  }

}
