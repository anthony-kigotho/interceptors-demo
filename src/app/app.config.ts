import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { authInterceptorFunctional, loadingSpinnerInterceptorFunctional, loggingInterceptorFunctional, responseTimeInterceptorFunctional, retryInterceptorFunctional } from './functional.interceptor';
import { AuthInterceptorDI, LoadingSpinnerInterceptorDI, LoggingInterceptorDI, ResponseTimeInterceptorDI, RetryInterceptorDI } from './dibased.interceptor';
import { LoadingService } from './loading.service';
import { AuthService } from './auth.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([
        responseTimeInterceptorFunctional,
        loadingSpinnerInterceptorFunctional, 
        authInterceptorFunctional, 
        retryInterceptorFunctional, 
        loggingInterceptorFunctional, 
      ]),
      /* THE COMMENTED CONFIGURATIONS ARE FOR DI-based INTERCEPTORS 
          Comment withInterceptors() and uncomment the below code to use DI-based interceptors
      */

      //withInterceptorsFromDi(),
    ),
    //LoadingService,
    //AuthService,
    // { provide: HTTP_INTERCEPTORS, useClass: ResponseTimeInterceptorDI, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: LoadingSpinnerInterceptorDI, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorDI, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: RetryInterceptorDI, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptorDI, multi: true }
  ]
};
