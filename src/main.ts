import 'hammerjs';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { OKTA_CONFIG } from '@okta/okta-angular';
import { AppConfig } from './app/app.config';

fetch('/assets/appconfig.json', {method: 'get'}).then( (response) => {
  response.json().then((settings) => {
    let booleanProperties = ["useMockData", "production"];
    booleanProperties.forEach( (value, index, array) => {
      settings[array[index]] = settings[array[index]] == 'true';
    });
    if(settings.production) {
      enableProdMode();
    }
    platformBrowserDynamic([
      {
        provide: AppConfig,
        useValue: settings
      },
      {
        provide: OKTA_CONFIG,
        useValue: settings.okta
      }
    ]).bootstrapModule(AppModule)
  }).catch(err => console.log(err))
})
