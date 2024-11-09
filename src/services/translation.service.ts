import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private renderer: Renderer2;
  private isRTL: boolean = false; // Initial direction is LTR

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  toggleDirection(): void {
    this.isRTL = !this.isRTL;
    const direction = this.isRTL ? 'rtl' : 'ltr';
    const lang = this.isRTL ? 'ar' : 'en';
    
    // Apply direction and language attributes to the body
    this.renderer.setAttribute(document.body, 'dir', direction);
    this.renderer.setAttribute(document.body, 'lang', lang);
  }

  getCurrentDirection(): string {
    return this.isRTL ? 'rtl' : 'ltr';
  }
}
