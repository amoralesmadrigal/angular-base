import {ApplicationConfig} from '@angular/core'
import { provideAnimations } from '@angular/platform-browser/animations';
import { withInterceptorsFromDi, provideHttpClient, HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// Función para crear el cargador de traducciones
export function createTranslateLoader(http: HttpClient): TranslateLoader {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json'); // Asegúrate de que esta ruta sea correcta
  }
export const appConfig: ApplicationConfig = {
    providers: [
        provideAnimations(),
        provideHttpClient(withInterceptorsFromDi()),
        TranslateModule.forRoot({
            loader: {
            provide: TranslateLoader,
            useFactory: createTranslateLoader,
            deps: [HttpClient],
            },
        }).providers,
        TranslateService,
    ]
}