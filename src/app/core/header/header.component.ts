import { Component } from '@angular/core';
import { UserService } from '../user/user.service';
import { Observable } from 'rxjs';
import { User } from '../user/user';
import { Router } from '@angular/router';

@Component({
    selector: 'ap-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent {

    user$: Observable<User>; // uso da letra $ e boa pratica quando se trata de um Observable 

    constructor(
        private userService: UserService,
        private router: Router

    ) {
        this.user$ = userService.getUser();
    }

    logout() {
        this.userService.logout();
        this.router.navigate(['']); // navega para login
    }

}