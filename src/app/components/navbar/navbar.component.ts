import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private route: Router) { }

  moviename = "";
  email = null;
  roles=null;
  firstName:string | null | undefined;
  //loginId = null;

  ngOnInit(): void {
    // this.email = JSON.parse(sessionStorage.getItem('email') || '{}').email;
    // this.roles = JSON.parse(sessionStorage.getItem('roles') || '{}').roles;
    this.firstName = sessionStorage.getItem('firstName');
  }

  onSearch(){
    if(this.moviename != null && this.moviename.length!=0){
      this.route.navigate([`movies/search/${this.moviename}`]).then(() =>{
        window.location.reload();
      });
    }
  }

  onLogout(){
    sessionStorage.clear();
    this.route.navigate([`login`]).then(() => {
      window.location.reload();
    })
  }

}