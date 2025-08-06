import { NgClass, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  imports: [NgIf, TranslateModule,NgClass],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {
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
    this.languageChange.emit(lang); // ✅ App.ts-dəki setLanguage çağrılır
  }

  isMobileSearchOpen = false;
  toggleMobileSearch(){
    this.isMobileSearchOpen = !this.isMobileSearchOpen;
  }
}
