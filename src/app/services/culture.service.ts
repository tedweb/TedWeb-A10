import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CultureService {
  private path: string = '../assets/cultures/';
  private culture: string = '';
  private ext: string = '.json';
  private dictionary: any;
  private loadEvent = new BehaviorSubject<string>('');
  public load = this.loadEvent.asObservable();

  constructor(private httpClient: HttpClient) { }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  public get (value: string): void {
    if (value && this.culture != value) {
      this.culture = value;
      var path = this.path + this.culture + this.ext;
      this.httpClient.get(path)
        .subscribe(data => {
          this.dictionary = data;
          this.loadEvent.next(this.dictionary);
          console.log('culture loaded')
        });

      // this.httpClient.get<any>(path)
      // .pipe(
      //   tap(data => {
      //     this.dictionary = data.json();
      //     this.loadEvent.next(this.dictionary);
      //     console.log('culture loaded')
      //   }),
      //   catchError(this.handleError('getConfig', []))
      // )
    }
  }

  public translate(term: string): string {
    var result = term;
    if (this.dictionary && this.dictionary[term]) {
      result = this.dictionary[term];
    }
    return result;
  }
}
