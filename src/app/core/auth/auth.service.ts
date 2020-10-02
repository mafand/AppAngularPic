import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators'
import { UserService } from '../user/user.service';

const API_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private userSercice: UserService,
  ) {

  }

  authenticate(userName: string, password: string) {

    return this.http
      .post(API_URL + '/user/login',
        { userName: userName, password: password },
        { observe: 'response' } /*expoe/torna acessivel o conteudo da resposta*/
      )
      .pipe(tap(res => {
        const authToken = res.headers.get('x-access-token')
        this.userSercice.setToken(authToken);
        console.log(`User ${userName} authenticated with token ${authToken}`);
      }))

  }


}
