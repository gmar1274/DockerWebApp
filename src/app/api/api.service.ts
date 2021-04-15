
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../form/user';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
 
@Injectable({providedIn:'root'})
export class ApiService {
 
  baseURL: string = "http://localhost:3080/";
  users_api='api/v1/users';
  constructor(private http?: HttpClient) {
  }
 
  getUsers(): Observable<User[]> {
    console.log('getUser '+this.baseURL + this.users_api)
    return this.http.get<User[]>(this.baseURL + 'api/v1/users')
  }
 
  addUser(user:User): Observable<any> {
    const headers = { 'Content-Type': 'application/json'}  
    const body=JSON.stringify(user);
    console.log("JSON in POST");
    console.log(body);
    return this.http.post<User>(this.baseURL + this.users_api, body,{'headers':headers})
  }

  getGeoLocation(user:User):Observable<any>{
    //positionstack API
    return this.http.get("http://api.positionstack.com/v1/forward?access_key=d978d8c37e21cc1e2b44197ab283e307&query=" + user.address)    
  }
 
}