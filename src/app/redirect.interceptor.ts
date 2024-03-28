import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Injectable} from "@angular/core";
import {catchError, mergeMap, Observable, of, throwError} from "rxjs";

@Injectable()
export class RedirectInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      mergeMap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse && event.status === 302) {
          console.log("sos")
          const redirectUrl = event.headers.get('Location');
          if (redirectUrl) {
            const newRequest = req.clone({url: redirectUrl});
            return this.intercept(newRequest, next);
          } else {
            return throwError('Missing redirect location in response');
          }
        }
        // Not a redirect or final response
        return of(event);
      }),
      catchError(error => {
        // Handle errors (network issues, server errors, etc.)
        return throwError(error);
      })
    );
  }
}
