import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieBookingService } from 'src/app/services/movie-booking.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  firstName = ''
  password = ''
  invalidLogin = false
  message!:String;
  constructor(private service:MovieBookingService,private router:Router) { }
  ngOnInit(): void {
  }

  Login() {
    this.service.login(this.firstName, this.password).subscribe(
      (data : any)=> {
        console.log(data);
        let resp = JSON.parse(data);
        console.log(resp)
        // let userDetails = resp.data;
        // console.log(userDetails)
        if(resp.roles==="ROLE_ADMIN"){
          Swal.fire('WELCOME ',resp.firstName);
          this.router.navigate(['/'])
         // this.reloadWindow();
        }
        else{
          Swal.fire('WELCOME ',resp.firstName);
          this.router.navigate(['/'])
       //   this.reloadWindow();
        }
      },
      error => {
        this.message ="invalid credentials";
      }
    );
  }
  reloadWindow() {
    window.location.reload();
  }

}
