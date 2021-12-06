import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { DbService } from './db.service';
@Injectable({
  providedIn: 'root',
})
export class RouteGuardService implements CanActivate {
  constructor(private db: DbService, private router: Router) {}
  async canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    const loggedIn = this.db.isLoggedIn();
    if (!loggedIn) {
      if (
        route.routeConfig.path !== 'login' &&
        route.routeConfig.path !== 'register'
      ) {
        this.router.navigate(['login']);
      }
      return true;
    }
    if (
      route.routeConfig.path === 'login' ||
      route.routeConfig.path === 'register'
    ) {
      this.router.navigate(['tabs']);
      return false;
    }
    return true;
  }
}
