import { ApplicationConfig                    } from '@angular/core';
import { provideBrowserGlobalErrorListeners   } from '@angular/core';
import { provideHttpClient, withInterceptors  } from '@angular/common/http';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { authInterceptor                      } from './interceptors/auth.interceptor';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withInMemoryScrolling({anchorScrolling: 'enabled', scrollPositionRestoration: 'top'})),
    provideHttpClient(withInterceptors([authInterceptor]))
  ]
};
