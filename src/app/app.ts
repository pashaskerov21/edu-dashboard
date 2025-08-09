import { Component, HostListener, Inject, PLATFORM_ID, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from './components/sidebar/sidebar';
import { Navbar } from './components/navbar/navbar';
import { ThemeService } from './theme.service';
import { isPlatformBrowser } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Breadcrumb } from './components/breadcrumb/breadcrumb';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Sidebar, Navbar, Breadcrumb, TranslateModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('edu-dashboard');

  isSidebarOpen: boolean = false;
  private isBrowser: boolean;

  private fallbackLangValue = 'az';

  constructor(
    private translate: TranslateService,
    private themeService: ThemeService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);

    this.translate.setFallbackLang(this.fallbackLangValue);

    if (this.isBrowser) {
      const savedLang = localStorage.getItem('lang') ?? this.fallbackLangValue;
      this.translate.use(savedLang);
    } else {
      this.translate.use(this.fallbackLangValue);
    }

  }

  ngAfterViewInit() {

    if (this.isBrowser) {
      setTimeout(() => {
        this.checkSidebarState();
      });
    }
  }
  toggleTheme() {
    this.themeService.toggleTheme();
  }
  get currentTheme() {
    return this.themeService.getTheme();
  }


  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
  

  @HostListener('window:resize')
  onResize() {
    if (this.isBrowser) {
      this.checkSidebarState();
    }
  }

  private checkSidebarState() {
    if (this.isBrowser) {
      this.isSidebarOpen = window.innerWidth > 992;
    }
  }

  toggleSidebarWithLink(){
    if(this.isBrowser && window.innerWidth < 992){
      this.isSidebarOpen = false;
    }
  }

  setLanguage(lang: string) {
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
  }
  get currentLang(): string {
    return this.translate.currentLang || this.fallbackLangValue;
  }
}
