import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieBookingService } from 'src/app/services/movie-booking.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-show-all-movies',
  templateUrl: './show-all-movies.component.html',
  styleUrls: ['./show-all-movies.component.css'],
})
export class ShowAllMoviesComponent implements OnInit {
  movies: any;
  email = '';

  constructor(private service: MovieBookingService, private route: Router) {}

  ngOnInit(): void {
    this.getMovieList();
  }

  getMovieList() {
    this.service.getAllMovies().subscribe((response: any) => {
      console.log();
      this.movies = response;
      this.email = JSON.parse(sessionStorage.getItem('user') || '{}').email;
    });
  }

  bookTicket(movieName: any, theatherName: any) {
    this.route.navigate(['bookTicket', movieName, theatherName]);
  }

  onDelete(movieName: string, theatherName: string) {
    this.service.deleteMovie(movieName, theatherName).subscribe((response:any) => {
       console.log(response);
      setTimeout(()=>{
        this.reloadWindow();
      },1000);
    });
  }

  reloadWindow() {
    window.location.reload();
  }

  // finaldata:any;
  // filterchange(data:Event){
  //     const value=(data.target as HTMLInputElement).value;
  //     this.finaldata.filter=value;
  //   }

}