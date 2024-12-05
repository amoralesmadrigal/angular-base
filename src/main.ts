import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core'; 

import { AppComponent } from './app/app.component';
import { bootstrapApplication } from '@angular/platform-browser';
import {appConfig} from './app/app.config'
import { environment } from '@envs/environment';

if (environment.production) {
  enableProdMode();
  console.warn = () => {};
  console.error = () => {};
}

bootstrapApplication(AppComponent, appConfig)
  .catch(err => console.error(err));
