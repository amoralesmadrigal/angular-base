import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: true,
    imports: [HeaderComponent, RouterOutlet]
})
export class AppComponent {
  title = 'mi-proyecto';

  constructor(private translate: TranslateService) {
    // Establecer el idioma predeterminado
    const savedLang = localStorage.getItem('language') || 'en';
    this.translate.setDefaultLang(savedLang);
    this.translate.use(savedLang);
  }

  // Cambiar el idioma
  changeLanguage(lang: string) {
    this.translate.use(lang);
    localStorage.setItem('language', lang);
  }
}
