import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { map, Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})

export class MovieBookingService {

  private url = "http://localhost:8081";
  constructor(private http:HttpClient) { }

  login(firstName: string, password: string) {
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(firstName + ':' + password) });
        return this.http
        .get('http://localhost:8081/login',{ headers, responseType: 'text' as 'json' })
        .pipe(
            map(
                (userData:any) => {
                    sessionStorage.setItem('firstName', firstName);
                    sessionStorage.setItem('password', password);
                    let resp = JSON.parse(userData);
                    sessionStorage.setItem('roles',resp.roles);
                    return userData;
                })
        );
    }
    isUserLoggedIn() {
        let user = sessionStorage.getItem('firstName')
        console.log(!(user === null))
        return !(user === null)
    }
logOut() {
        sessionStorage.removeItem('firstName')
 }

//   login(credentials:any){
//     return this.http.post(`${this.url}/login`, credentials, {responseType:'text'});
//   }

  registerUser(user: any): Observable<Object>{
    return this.http.post(`${this.url}/register`, user, {responseType:'text'});
  }

  forgetPassword(credentials:any): Observable<Object>{
    let firstName=sessionStorage.getItem('firstName');
    let password=sessionStorage.getItem('password');
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(firstName + ':' + password) });
    return this.http.post(`${this.url}/forgotPassword`, credentials, {headers,responseType:"text"});
  }

  getAllMovies(): Observable<Object>{
    let firstName=sessionStorage.getItem('firstName');
    let password=sessionStorage.getItem('password');
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(firstName + ':' + password) });

    return this.http.get(`${this.url}/all`,{headers});
  }

  bookTickets(ticket: any): Observable<Object>{
    let firstName=sessionStorage.getItem('firstName');
    let password=sessionStorage.getItem('password');
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(firstName + ':' + password) });
    return this.http.post(`${this.url}/bookTickets`, ticket,{headers,responseType:"text"});
  }

  addMovie(movie: any): Observable<Object>{
    let firstName=sessionStorage.getItem('firstName');
    let password=sessionStorage.getItem('password');
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(firstName + ':' + password) });
    return this.http.post(`${this.url}/movie/add`, movie, {headers,responseType:'text'});
  }

  searchMovie(query:any): Observable<Object>{
    let firstName=sessionStorage.getItem('firstName');
    let password=sessionStorage.getItem('password');
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(firstName + ':' + password) });
    return this.http.get(`${this.url}/movies/search/${query}`,{headers});
  }

  deleteMovie(movieName:any, theatherName:any){
    let firstName=sessionStorage.getItem('firstName');
    let password=sessionStorage.getItem('password');
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(firstName + ':' + password) });
    if(firstName=='Admin'){
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: movieName +"  Movie Deleted successfully",
            showConfirmButton: false,
            timer: 1500
          });
      }
      else{
        Swal.fire("ADMIN ACCESS REQUIRED");
      }
    return this.http.delete(`${this.url}/${movieName}/delete/${theatherName}`, {headers,responseType:'text'});
  }
}