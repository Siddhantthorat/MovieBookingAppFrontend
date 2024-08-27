import { Component, OnInit } from '@angular/core';
import { tick } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieBookingService } from 'src/app/services/movie-booking.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-book-tickets',
  templateUrl: './book-tickets.component.html',
  styleUrls: ['./book-tickets.component.css']
})
export class BookTicketsComponent implements OnInit {

  movieName: any;
  theatherName: any;
  noOfTickets = null as number | null;
  seats="";

  ticket = {
    //ticketId:null,
    movieName:"",
    theatherName:"",
    noOfTickets:null as number| null,
    seats:[""]
  }

  constructor(private activeRoute: ActivatedRoute, private service:MovieBookingService, private route: Router) { }

  ngOnInit(): void {
    this.movieName = this.activeRoute.snapshot.params['movieName'];
    this.theatherName = this.activeRoute.snapshot.params['theatherName'];
  }

  onSubmit(){
    this.ticket.movieName = this.movieName;
    this.ticket.theatherName = this.theatherName;
    this.ticket.noOfTickets = this.noOfTickets;
    let temp = this.seats.split(',');
    this.ticket.seats = temp;

    this.service.bookTickets(this.ticket).subscribe((response) => {
      if(response === "Tickets Unavailable"){
        Swal.fire("SOLD OUT Tickets  Unavailable");
      }else{
        Swal.fire("Tickets Booked Successfully");
      }
    });
  }

}