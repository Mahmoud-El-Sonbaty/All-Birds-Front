import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
// import { CookieService } from 'ngx-cookie-service';
// import { empty } from 'rxjs';

export const authoGuard: CanActivateFn = (route, state) => {
  let router=inject(Router)
  let result = localStorage.getItem("userToken");
  console.log(result, "im in guard")
  if(result){
    return true;
  }
  else{
    router.navigateByUrl("/register");
    return false;
  }
};
