import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TestData } from './test.interfaces';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  public testProp: string = 'testProperty';
  private testPropPrivate: string = 'testProperty';

  constructor(private httpClient: HttpClient) { }

  public getData(): Observable<TestData> {
    const options = {
      headers: new HttpHeaders({
        'content-Type': 'application/json',
        'Authorization': 'my-auth-token'
      })
    };

    return this.httpClient.get<TestData>('https:www.google.com/googleMapData', options);
  }

  public getDataPromise(): Promise<TestData> {
    const options = {
      headers: new HttpHeaders({
        'content-Type': 'application/json',
        'Authorization': 'my-auth-token'
      })
    };

    return this.httpClient.get<TestData>('https:test.request.unknown/data', options).toPromise();
  }

  public someMethod(): string {
    return this.testProp;
  }

  public testMethod(property: string): string {
    return this.someMethod();
  }

}
