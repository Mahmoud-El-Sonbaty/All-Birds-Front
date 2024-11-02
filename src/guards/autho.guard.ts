import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { empty } from 'rxjs';

export const authoGuard: CanActivateFn = (route, state) => {
let router=inject(Router)
let cook=inject(CookieService);

let reslt=cook.get("Email");
if(reslt){
return true;
}
else{
router.navigateByUrl("/hgfdome");
return false;
}

};
