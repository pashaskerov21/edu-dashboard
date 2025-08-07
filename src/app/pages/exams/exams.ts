import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-exams',
  imports: [NgIf, RouterOutlet],
  templateUrl: './exams.html',
  styleUrl: './exams.scss'
})
export class Exams {
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
