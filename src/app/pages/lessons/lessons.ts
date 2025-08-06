import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-lessons',
  imports: [RouterOutlet, NgIf],
  templateUrl: './lessons.html',
  styleUrl: './lessons.scss'
})
export class Lessons {
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
