import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/auth/auth.service';
import { Router } from '@angular/router';
import { PlatformDetectorSercice } from 'src/app/core/platform/platform-detector.service';

@Component({
    templateUrl: './signin.component.html'
})
export class SignInComponent implements OnInit {

    loginForm: FormGroup;
    @ViewChild('userNameInput') userNameInput: ElementRef<HTMLInputElement>; // ElementRef - representacao de elementos/componentes do DOM
    // ViewChild - procura pelo input referenciado pelo seu argumento identificador (variavel template #userNameInput) e injeta na variavel 

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private platformDetectorService: PlatformDetectorSercice
    ) {

    }

    ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
            userName: ['', Validators.required],
            password: ['', Validators.required]
        });

        this.platformDetectorService.isPlatformBrowser() && this.userNameInput.nativeElement.focus();

    }

    login() {
        const userName = this.loginForm.get('userName').value;
        const password = this.loginForm.get('password').value;

        this.authService
            .authenticate(userName, password)
            .subscribe(
                () => {
                    //this.router.navigateByUrl('user/' + userName)
                    this.router.navigate(['user', userName])
                },
                err => {
                    console.log(err);
                    this.loginForm.reset(); // limpar o formulario
                    // Sera somente executado quando o codigo estiver sendo renderizado no browser. Isso evita problema quando o codigo e renderizado via server side.
                    // Manipulacao de DOM no server side.
                    this.platformDetectorService.isPlatformBrowser() && this.userNameInput.nativeElement.focus();
                });
    }

}