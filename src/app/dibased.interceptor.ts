import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, retry, tap } from 'rxjs/operators';
import { LoadingService } from './loading.service';
import { AuthService } from './auth.service';

@Injectable()
export class ResponseTimeInterceptorDI implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const startTime = Date.now();
    return next.handle(req).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          const endTime = Date.now();
          const responseTime = endTime - startTime;
          console.log(`Request to ${req.url} took ${responseTime}ms`);
        }
      })
    );
  }
}

@Injectable()
export class LoadingSpinnerInterceptorDI implements HttpInterceptor {
  constructor(private loadingService: LoadingService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loadingService.showLoadingSpinner(); // Show loading spinner UI element here
    return next.handle(req).pipe(
      finalize(() => {
        this.loadingService.hideLoadingSpinner(); // Hide loading spinner UI element
      })
    );
  }
}

@Injectable()
export class RetryInterceptorDI implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const maxRetries = 3; // Customize max retry attempts here
    return next.handle(req).pipe(
      retry(maxRetries),
      catchError((error: HttpErrorResponse) => {
        console.error('Retry Interceptor DI Error:', error);
        return throwError(()=> error);
      })
    );
  }
}

@Injectable()
export class AuthInterceptorDI implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = this.authService.getAuthToken();
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${authToken}`)
    });
    return next.handle(authReq);
  }
}

@Injectable()
export class LoggingInterceptorDI implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Request URL: ' + req.url);
    return next.handle(req);
  }
}