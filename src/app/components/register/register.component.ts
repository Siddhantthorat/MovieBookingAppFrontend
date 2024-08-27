import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieBookingService } from 'src/app/services/movie-booking.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  user = {
    loginId:null,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    contactNumber: null,
    roles:'',
  };

  confirmPassword: any;

  constructor(private service: MovieBookingService, private route: Router) {}

  ngOnInit(): void {}

  onSubmit() {
    if (this.confirmPassword === this.user.password) {
      this.service.registerUser(this.user).subscribe((response) => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: " Registered successfully",
          showConfirmButton: false,
          timer: 1500
        });
        this.route.navigate([`/login`]);
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Wrong Password.",
        text: "Password Does not match",
        //footer: 'Check confirm password '
      });
    }
  }
}