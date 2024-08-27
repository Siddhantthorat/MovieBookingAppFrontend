import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieBookingService } from 'src/app/services/movie-booking.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css'],
})
export class ForgetPasswordComponent implements OnInit {
  constructor(private service: MovieBookingService, private route:Router) {}
  isfailure = false;
  ForgotPasswordDTO = {
    email: null as string | null,
    newPassword: '',
  };

  confirmPassword: any;

  ngOnInit(): void {}

  onSubmit() {
    if (this.confirmPassword === this.ForgotPasswordDTO.newPassword) {
      console.log('Inside forgot method angular');
      this.service.forgetPassword(this.ForgotPasswordDTO).subscribe((response) => {
        console.log(response);
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: " Password Reset Successfully",
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
        timer: 1500
      });
    }
    //window.location.reload();
  }
}