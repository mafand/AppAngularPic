import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
    selector: 'ap-search',
    templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit, OnDestroy {

    // EventEmitter. Evento personalizado.
    @Output() onTyping = new EventEmitter<string>();
    @Input() value: string = '';

    debounce: Subject<string> = new Subject<string>();

    ngOnInit(): void {
        this.debounce
            .pipe(debounceTime(300))
            .subscribe(filter => this.onTyping.emit(filter));
            // Quando der 300ms o subscribe vai emitir o evento onTyping com o valor (filter)
            // que foi digitado no componente atraves da instrucao (keyup)="debounce.next($event.target.value)"
            // A instrucao $event no componente recebe o valor disparado pelo evento.

    }

    ngOnDestroy(): void {
        this.debounce.unsubscribe(); // liberar memoria do componente
    }
}