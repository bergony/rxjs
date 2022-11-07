import { of, fromEvent, interval } from "rxjs";
import { filter, map, pluck, reduce, take, scan, tap, mergeMap, switchMap, concatMap, exhaustMap } from "rxjs/operators";
import { ajax } from "rxjs/ajax";

const button = document.querySelector("#btn");

//ExhaustMap Ignora novos ate finalizar o atual
const observableExhaustMap = fromEvent(button, "click").pipe(
    exhaustMap(() => {
    return ajax.getJSON('https://jsonplaceholder.typicode.com/todos/1').pipe(
        take(5),
        tap({
            complete(){
                console.log('inner observable complete');
            }
        })
    );
  })
);
//concatMap Espera o obsevable terminar.
const observableConcatMap = fromEvent(button, "click").pipe(
    concatMap(() => {
    return ajax.getJSON('https://jsonplaceholder.typicode.com/todos/1').pipe(
        take(5),
        tap({
            complete(){
                console.log('inner observable complete');
            }
        })
    );
  })
);
//switchMap Novos obervable toma prioridade nos antigos
const observableSwitchMap = fromEvent(button, "click").pipe(
    switchMap(() => {
    return ajax.getJSON('https://jsonplaceholder.typicode.com/todos/1').pipe(
        take(5),
        tap({
            complete(){
                console.log('inner observable complete');
            }
        })
    );
  })
);

//mergeMap Em paralelo novos observable nao afeta os antigos
const observableMergeMap = fromEvent(button, "click").pipe(
    mergeMap(() => {
    return interval(1000).pipe(
        tap(console.log),
        take(5)
    );
  })
);
//tap manipula o objeto sem trocar o seu valor
const observableTap = interval(1).pipe(
  take(6),
  tap({
    next(val) {
      console.log(val);
    },
  }),
  reduce((acc, value) => acc + value, 0)
);
//scan
const observableScan = interval(1).pipe(
  take(6),
  scan((acc, value) => acc + value, 0)
);
//Take limita a quantidade.
const observableTake = interval(1).pipe(
  take(6),
  reduce((acc, value) => acc + value, 0)
);

//Reduce soma os valores em acc
const observableReduce = of(1, 2, 3, 4, 5).pipe(
  reduce((acc, value) => acc + value, 0)
);

//filter
const observableFilter = fromEvent(document, "keydown").pipe(
  map((event) => event?.code),
  filter((code) => code === "Space")
);

//pluck Find by di
//Use map and optional chaining: `pluck('foo', 'bar')`
//is `map(x => x?.foo?.bar)`. Will be removed in v8
const observablePLuck = fromEvent(document, "keydown").pipe(pluck("code"));
const observablePluckMap = fromEvent(document, "keydown").pipe(
  map((event) => event?.code)
);
// Map
const numberWithSymbo = of(1, 2, 3, 4, 5).pipe(map((value) => `$${value}`));

const subscription = observable.subscribe({
  next(value) {
    console.log(value);
  },
  complete() {
    console.log("complete");
  },
});

console.log("hello");
