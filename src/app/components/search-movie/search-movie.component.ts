import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieBookingService } from 'src/app/services/movie-booking.service';

@Component({
  selector: 'app-search-movie',
  templateUrl: './search-movie.component.html',
  styleUrls: ['./search-movie.component.css'],
})
export class SearchMovieComponent implements OnInit {
  constructor(
    private route: Router,
    private activeRoute: ActivatedRoute,
    private service: MovieBookingService
  ) {}

  movies: any;
  query: any;
  email = '';
  roles='';

  ngOnInit(): void {
    this.query = this.activeRoute.snapshot.params['moviename'];
    this.service.searchMovie(this.query).subscribe((response) => {
      //console.log(response);
      this.movies = response;
      this.email = JSON.parse(sessionStorage.getItem('user') || '{}').email;
      this.roles = JSON.parse(sessionStorage.getItem('user') || '{}').roles;
    });
  }

  bookTicket(movieName: any, theatherName: any) {
    this.route.navigate(['bookTicket', movieName, theatherName]);
  }

  onDelete(movieName: string, theatherName: string) {
    this.service.deleteMovie(movieName, theatherName).subscribe((response) => {
      //console.log(response);
      this.reloadWindow();
    });
  }

  reloadWindow() {
    window.location.reload();
  }
}