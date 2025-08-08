import { NgClass, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  imports: [NgIf, TranslateModule, NgClass, FormsModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {

  constructor(public router: Router) { }
  @Output() toggleSidebar = new EventEmitter<void>();
  @Output() toggleTheme = new EventEmitter<void>();
  @Output() languageChange = new EventEmitter<string>();
  @Input() currentTheme!: string;
  @Input() currentLang!: string;

  onToggleSidebar() {
    this.toggleSidebar.emit();
  }
  onToggleTheme() {
    this.toggleTheme.emit();
  }
  onLanguageSelect(lang: string) {
    this.languageChange.emit(lang); 
  }

  isMobileSearchOpen = false;
  toggleMobileSearch() {
    this.isMobileSearchOpen = !this.isMobileSearchOpen;
  }

  keyword: string | null = null;
  onSearch() {
    if (this.keyword) {
      this.router.navigate(['/search'], {
        queryParams: { key: this.keyword }
      });
    }
  }
}
