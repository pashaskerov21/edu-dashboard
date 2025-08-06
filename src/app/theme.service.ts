import { isPlatformBrowser } from "@angular/common";
import { Inject, Injectable, PLATFORM_ID, Renderer2, RendererFactory2 } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class ThemeService {
    private renderer: Renderer2;
    private currentTheme: 'light' | 'dark' = 'dark';
    private isBrowser: boolean;

    constructor(
        rendererFactory: RendererFactory2,
        @Inject(PLATFORM_ID) private platformId: Object
    ) {
        this.renderer = rendererFactory.createRenderer(null, null);
        this.isBrowser = isPlatformBrowser(this.platformId);

        if (this.isBrowser) {
            this.setTheme(this.currentTheme);
        }
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(this.currentTheme);
    }

    setTheme(theme: 'light' | 'dark') {
        const root = document.documentElement;
        this.renderer.removeClass(root, 'light');
        this.renderer.removeClass(root, 'dark');
        this.renderer.addClass(root, theme);
    }

    getTheme() {
        return this.currentTheme;
    }
}