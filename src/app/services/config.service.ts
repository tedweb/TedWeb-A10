import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { ConfigModel } from '../models/config.model';
import { catchError, tap } from 'rxjs/operators';
import configData from '../../assets/config.json';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private readonly defaultPath: string = '../assets/config.json';
  private path: string = '../assets/cultures/';
  private configLoadedEvent = new BehaviorSubject<ConfigModel>(null);
  private profileLoadedEvent = new BehaviorSubject<ConfigModel>(null);
  private profileUnloadedEvent = new BehaviorSubject(null);
  private config: ConfigModel;
  private profile: ConfigModel;
  public configLoaded = this.configLoadedEvent.asObservable();
  public profileLoaded = this.profileLoadedEvent.asObservable();
  public profileUnloaded = this.profileUnloadedEvent.asObservable();

  constructor(private httpClient: HttpClient) {
    this.loadConfig();
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  public loadConfig(): any {
    this.config = configData as ConfigModel;
    this.configLoadedEvent.next(this.config);
  }

  public loadProfile(username: string = ''): any {
    var path = '../assets/' + username + '.json';
    this.httpClient.get<any>(path)
    .pipe(
      tap(data => {
        this.profile = data.json() as ConfigModel;
        this.config.user = this.profile.user;
        this.profileLoadedEvent.next(this.profile);
        console.log('culture loaded')
      }),
      catchError(this.handleError('getConfig', []))
    )
  }

  public unloadProfile(): any {
    this.config.user = undefined;
    this.profileUnloadedEvent.next(null);
  }

}
