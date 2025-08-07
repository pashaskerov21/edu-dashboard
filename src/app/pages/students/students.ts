import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-students',
  imports: [NgIf,RouterOutlet],
  templateUrl: './students.html',
  styleUrl: './students.scss'
})
export class Students {
  showParentContent = true;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        const currentChild = this.route.firstChild;
        this.showParentContent = !currentChild || currentChild.snapshot.routeConfig?.path === '';
      });
  }

  isParentRouteActive() {
    return this.showParentContent;
  }
}
