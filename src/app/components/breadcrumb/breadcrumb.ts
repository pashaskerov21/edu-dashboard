import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { filter } from 'rxjs';

@Component({
  selector: 'app-breadcrumb',
  imports: [TranslateModule,NgFor,NgIf, RouterLink],
  templateUrl: './breadcrumb.html',
  styleUrl: './breadcrumb.scss'
})
export class Breadcrumb {
   breadcrumbs: { label: string; url: string }[] = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private translate: TranslateService
  ) {
    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(() => {
      this.breadcrumbs = this.createBreadcrumbs(this.activatedRoute.root);
    });
  }

  private createBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: any[] = []): any[] {
    let children = route.children;

    for (let child of children) {
      let routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');
      if (routeURL) {
        url += `/${routeURL}`;
      }

      if (child.snapshot.data['breadcrumb']) {
        breadcrumbs.push({
          label: child.snapshot.data['breadcrumb'],
          url: url
        });
      }

      if (child.children.length > 0) {
        return this.createBreadcrumbs(child, url, breadcrumbs); 
      }
    }

    return breadcrumbs;
  }
}
