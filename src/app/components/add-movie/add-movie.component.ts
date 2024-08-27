import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieBookingService } from 'src/app/services/movie-booking.service';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css'],
})
export class AddMovieComponent implements OnInit {
  movie = {
    id: {
      movieName: '',
      theatherName: '',
    },
    allotedSeats: null as number | null,
  };

  constructor(private service: MovieBookingService, private route: Router) {}

  ngOnInit(): void {}

  onSubmit() {
    this.service.addMovie(this.movie).subscribe((response) => {
      console.log(response);
      this.route.navigate([`/`]).then(() => {
        this.reloadWindow();
      });
    });
  }

  reloadWindow() {
    window.location.reload();
  }

  
}
