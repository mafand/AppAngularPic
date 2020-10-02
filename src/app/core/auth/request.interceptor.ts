import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import {HttpHandler} from '@angular/common/http';
import { Observable} from 'rxjs';
import { HttpEvent } from '@angular/common/http';
import { TokenService } from '../token/token.service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

    constructor(private tokenService: TokenService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (this.tokenService.hasToken()) {
            const token = this.tokenService.getToken();

            req = req.clone({
                setHeaders: {
                    'x-access-token': token
                }
            })
        }

        return next.handle(req);
    }

}