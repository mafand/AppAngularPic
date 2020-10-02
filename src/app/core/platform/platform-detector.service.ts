import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser} from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class PlatformDetectorSercice {

    constructor (@Inject(PLATFORM_ID) private platformId: string) {

    }

    isPlatformBrowser () {
        // descobrindo a plataforma de execucao/renderizacao. Browser ou Server Side
        return isPlatformBrowser(this.platformId);
    }
}