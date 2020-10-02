https://github.com/mafand/AppAngularPic.git

### Parte 1

npm install -g @angular/cli@6.0.7

ng --version

ng new alurapic

ng serve --open

localhost:4200

Em Angular tudo é um componente.

Data binding de um atributo HTML: teremos que envolvê-lo em colchetes []. Ex.: <img [src]="url" [alt]="title">. "url" e "title" são propriedades do componente.

Data binding utilizamos {{ }} (Angular expression) dentro de tags e [ ] para atributos.

---

Todos componentes devem fazer parte de um Modulo.

AppModule, também denominado root module ("módulo raiz") no Angular, por ser o primeiro a ser carregado pela aplicação.

@NgModule({
    declarations: [ Component ],
    exports: [ Component ]
})

* declarations: Tudo aquilo que o módulo possui. Se enxergam entre si dentro do módulo. Visualização interna.
* exports: Enxergado no módulo de quem importou. Visualização externa. Quando o conteudo de exports será usado no template de outro componente. Caso contrario não é necessário o component estar declarado em exports.

---

@Input() -> propriedades podem receber um parâmetro externo, passando um valor por meio da forma declarativa do componente.

Exemplo: 

@Input() description = '';

Indicamos que 'description' é 'Inbound properties', ou seja, aceitam receber um valor por meio de sua forma declarativa.


--- 

Diretiva, capaz de alterar o comportamento de um componente já existente. 

--- 

Web API -> back end

---

Observable (Operações asyncronas, semelhante ao promisse) -> Proveniente do RxJs

---

Ao criarmos um serviço, usamos o decorator @Injectable() que indica que o serviço é injetável.

@Injectable({
    providedIn: 'root' /* escopo root */
})
export class PhotoService {
 
}

* providedIn -> indica em qual escopo será possivel injetar o serviço.

Não precisa pertencer a um module.

---

Todo componente Angular possui um ciclo de vida. 

Interface OnInit, metodo ngOnInit. 

A fase OnInit ocorre depois da instanciação de AppComponent, e depois do componente receber as inbound properties. 

---

Gerar novo componente photo-list na pasta src/app/photos

ng generate component photos/photo-list

---

CommonModule -> biblioteca comum de diretivas como por exemplo *ngFor

---

Rotas

O Angular interpreta a URL e verifica se há um roteamento associado. Se não tiver nenhum roteamento que serve, é mostrado um erro no console.

RouterModule -> Módulo de rotas do Angular.

<router-outlet> -> É dentro desta tag que deverá se exibir o componente/página relacionado a rota.

Acts as a placeholder that Angular dynamically fills based on the current router state.


---

interface OnChanges

metodo ngOnChanges -> Este método recebe como parâmetro todas as possíveis mudanças das 'inbound properties' do nosso componente. Tais mudanças são do tipo 'SimpleChanges'.
Caso haja alguma mudança, uma propriedade com mesmo nome da inbound property que sofreu a mudança será adicionada dinamicamente.

ngOnChanges(changes: SimpleChanges) {
	if (changes.photos) {
	  this.rows = this.groupColumns(this.photos);
	}
}

---

Event binding. (unidirecional) -> View do template para o componente (Model).

No Angular, é feito colocando-se o nome do evento entre parênteses - (keyup)="filter = $event.target.value". 

Ou seja, para o evento keyup, a expressão "filter = $event.target.value" será avaliada.


---

Pipes ("tubos", em português) podem gerar transformações nos dados.

Para que seja um Pipe, sua classe deve ser anotada com o decorator @Pipe, além de implementar o método transform() da interface PipeTransform.

export class FiltroPorTitulo implements PipeTransform {
}

---

Resolver. Capaz de lidar com dados durante a navegação de uma rota para disponibilizá-los a um componente antes deste ser carregado.

Motivação por trás do Resolver - a resolução de dados assíncronos dos quais o componente depende antes de ser ativado, 
no momento em que a rota é ativada, antes mesmo dela avaliar tal componente.

---

Padrão debounce com RxJs

---

icones

https://fontawesome.com/


---

Recebe o conteudo que esta dentro de uma tag do componente.

Template do componente 'xy'

<div>
	<ng-content></ng-content>
</div>

Funciona como um local dentro do template do componente no qual os elementos filhos serão adicionados.

Componente

<xy>
	'Conteudo a ser colocado no lugar da tag <ng-content>'
</xy>


---

@Output()

Output properties são usadas em event binding

O nome da output property é o mesmo nome do evento utilizado por aqueles que desejam interagir com o componente.

Não basta aplicar um decorator Output, é necessário que a propriedade seja uma instância de EventEmitter

@Output() onTyping = new EventEmitter<string>();


---

Diretiva

Todo componente é uma diretiva que possui template. No entanto, uma diretiva em seu estado bruto não possui templates.

Podemos injetar no constructor da diretiva uma referência para o elemento no qual ela foi associada. Angular nos dá acesso ao elemento através do wrapper ElementRef.

Podemos usar uma diretiva como atributo envolvendo o valor do seu seletor entre colchetes.

@Directive({
    selector: '[apDarkenOnHover]'
})


---

### Parte 2 (autenticação)


Model Driven Forms

import { ReactiveFormsModule } from '@angular/forms' -> Modulo para trabalhar com formularios

- Validação ficará no componente, e não no template.


FormGroup -> Controlar o formulário

FormBuilder -> Construtor de formulário


---

Safe navigation operator

Acessar a propriedade para um objeto que não existe e não está definido.

loginForm.get('userName').errors?.required


---

Criando serviço

ng g s core/auth -> onde 'g' de generate e s de 'service'


---

Token de autenticação

O token é gerado no padrão JWT (J*son *Web Token)

Um dos algoritmos de criptografia usado em sua assinatura é o HMAC SHA256 (HS256)

O token pode ser decodificado.

É utilizada uma frase secreta para gerar e criptografar o token. Então é possível descriptografá-lo, mas para criptografá-lo novamente e ele ser um token válido, é necessário saber a frase secreta.

Armazenamento de token e feito no window.localStorage

Descriptografar o token e acessar o nome de usuário no Payload

npm install jwt-decode@2.2.0

Este módulo auxiliará neste processo de captura do valor localizado no Payload do JWT.


---

Biblioteca RxJS

BehaviorSubject

O BehaviorSubject se assemelha ao Subject.

Após a emissão de um valor, caso este não seja consumido ou escutado, o BehaviorSubject o manterá armazenado. E se alguém faz o subscribe depois, terá acesso ao último valor emitido.

O BehaviorSubject armazena a última emissão até que alguém apareça para consumi-la.


---

ng build --prod

