import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
     {
      const isLoggedIn=sessionStorage.getItem('firstName')!==null;
      let userRoles:any[]=[sessionStorage.getItem('roles')];
      console.log(userRoles)
      if(isLoggedIn)
      {
          const requiredRoles=route.data['roles'] ;
          console.log(requiredRoles)
          if(requiredRoles && requiredRoles.some((role:any)=>userRoles.includes(role)))
          {
            return true ;
          }else{
            Swal.fire({
              icon: "error",
              title: "Access Denied",
              text: "Access only to  " +requiredRoles,
            });
            return false;
          }
      } 
      else
      {
          this.router.navigate(['login']);
          //IF not logged in 
          return false;
      }
  }
  
}
