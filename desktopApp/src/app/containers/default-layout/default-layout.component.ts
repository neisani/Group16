import { Component, OnDestroy, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { navItems, ObservernavItems } from '../../_nav';
import {TokenStorageService} from '../../services/allServices';
import { User } from '../../views/models/user/user';
import { Router } from "@angular/router";
import { BreakpointObserver } from '@angular/cdk/layout';


@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnDestroy {
  public navItems = navItems;
  public ObservernavItems = ObservernavItems;

  User: User[] = [];
  info: any;
  returnUrl = '';

  private roles: string[];
  private authority: string;

  
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement;
  constructor(
    private token: TokenStorageService,
    private router: Router,
    private tokenStorage: TokenStorageService,
    private breakpointObserver: BreakpointObserver,

    @Inject(DOCUMENT) _document?: any) {

    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = _document.body.classList.contains('sidebar-minimized');
    });
    this.element = _document.body;
    this.changes.observe(<Element>this.element, {
      attributes: true,
      attributeFilter: ['class']
    });
  }

  ngOnInit(){
    if (this.tokenStorage.getToken()){
      this.roles = this.tokenStorage.getAuthorities();
      this.roles.every(role => {
        if (role === 'ROLE_MANAGER DATA'){
          this.authority = 'ManagerData';
          return false;
        } else if(role === 'ROLE_OC'){
          this.authority = 'OC';
          return false;
        } else if(role === 'ROLE_ZONAL OFFICER'){
          this.authority = 'ZonalOfficer';
          return false;
        } else if(role === 'ROLE_SENIOR ZONAL OFFICER'){
          this.authority = 'SenoirZonalOfficer';
          return false;
        } else if(role === 'ROLE_MANAGER STATION NETWORKS'){
          this.authority = 'ManagerStationNetworks';
          return false;
        } else if(role === 'ROLE_WEAHTER ANALYST'){
          this.authority = 'WeatherAnalyst';
          return false;
        } else if(role === 'ROLE_WEATHER FORECASTER'){
          this.authority = 'WatherForecaster';
          return false;
        }else 
        this.authority = 'Observer';
        return true;

      })
    }
  }

  ngOnDestroy(): void {
    this.changes.disconnect();
  }

  // public logout() {
  //   this.token.signOut();
  //   this.router.navigate([/views/login]);
  // }
}
