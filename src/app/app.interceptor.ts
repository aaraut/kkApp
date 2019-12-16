import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";
declare var $:any;
@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
    constructor() { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        $('#loader').show();
        return next.handle(req).pipe(
            finalize(() => $('#loader').hide())
        );
    }
}
