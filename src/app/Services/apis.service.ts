import { Injectable, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from '../Auth/auth.service';
import { setMaxListeners } from 'process';

@Injectable({
  providedIn: 'root',
})
export class ApisService {
  msg = { title: 'Title', titleId: '0' };
  headers = new HttpHeaders();
  constructor(private _http: HttpClient, private auth: AuthService) { }

  // **************************** SUPER ADMIN API ***********************************

  /**
   * Handle Http operation that failed.
   * @param email
   * @param password
   * @returns  in API return get JSON data
   */
  login(email, password): Observable<any> {
    let url = '/http://168.183.132.182/api/user/login';
    return this._http.post(url +"?email="+email+"&password="+password , "optional" ).pipe(
      catchError(this.handleError<any>('updatePost'))
    );
  }

  /**
   * Handle Http operation that failed.
   * @param    email
   * @returns  in API return get JSON data
   */
  validateEmail(email): Observable<any> {
    let url = '/api/forgot-password';
    return this._http.post(url, { email: email }).pipe(
      catchError(this.handleError<any>('updatePost'))
    );
  }

  /**
   * Handle Http operation that failed.
   * @param    newPassword
   * @returns  in API return get JSON data
   */
  setPassword(newPassword): Observable<any> {
    let url = '/api/change-password-signup?token=' + this.auth.getToken();
    return this._http.post(url, { newPassword: newPassword }).pipe(
      catchError(this.handleError<any>('updatePost'))
    );
  }

  /**
   * Handle Http operation that failed.
   * @param    resetPasswordToken
   * @param    userId
   * @param    newPassword
   * @returns  in API return get JSON data
   */
  resetPassword(resetPasswordToken, userId, newPassword): Observable<any> {
    let url = '/api/reset-password';
    return this._http
      .post(url, {
        resetPasswordToken: resetPasswordToken,
        userId: userId,
        newPassword: newPassword,
      })
      .pipe(
        catchError(this.handleError<any>('updatePost'))
      );
  }

  signup(formData): Observable<any> {
    let url = '/api/user/register';
    return this._http.post(url, formData).pipe(catchError(this.handleError<any>('updatePost')));
  }

  homefeed(): Observable<any> {
    this.headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.auth.getToken() });
    let url = "/api/posts/list";
    return this._http.post(url, {}, { headers: this.headers });
  }

  guestHomefeed(): Observable<any> {
    // this.headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.auth.getToken() });
    let url = "/api/posts/list/guest";
    return this._http.post(url, {}, { headers: this.headers });
  }

  listComment(post_id): Observable<any> {
    this.headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.auth.getToken() });
    let url = "/api/post/comment";
    return this._http.post(url, { post_id: post_id }, { headers: this.headers });
  }

  addcomment(post_id, comment): Observable<any> {
    this.headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.auth.getToken() });
    let url = "/api/post/comment/create";
    return this._http.post(url, { post_id: post_id, comment: comment }, { headers: this.headers });

  }

  userProfile(): Observable<any> {
    this.headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.auth.getToken() });
    let url = '/api/user/profile'
    return this._http.post(url, {}, { headers: this.headers });
  }
  userProfileUpdate(username,phone,address,shelter_name,shelter_city,shelter_bio,opening_hour,closing_hour,state): Observable<any> {
    this.headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.auth.getToken() });
    let url = '/api/user/update'
    return this._http.post(url, {username:username,phone:phone,address:address,shelter_name:shelter_name,shelter_city:shelter_city,shelter_bio:shelter_bio,opening_hour:opening_hour,closing_hour:closing_hour,state:state}, { headers: this.headers });
  }

  liked(): Observable<any> {
    this.headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.auth.getToken() });
    let url = '/api/user/posts/liked'
    return this._http.post(url, {}, { headers: this.headers });
  }

  saved(): Observable<any> {
    this.headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.auth.getToken() });
    let url = '/api/user/posts/saved'
    return this._http.post(url, {}, { headers: this.headers });
  }
  post(id): Observable<any> {
    this.headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.auth.getToken() });
    let url = '/api/posts/get'
    return this._http.post(url, {id:id}, { headers: this.headers });
  }

  listState(): Observable<any> {
    // this.headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.auth.getToken() });
    let url = "/api/states/list";
    return this._http.post(url, {},);

  }

  listColor(): Observable<any> {
    // this.headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.auth.getToken() });
    let url = "/api/colors/list";
    return this._http.post(url, {},);
  }

  sendOtp(email,phone,username): Observable<any> {
    // this.headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.auth.getToken() });
    let url = "/api/otp";
    return this._http.post(url, {email:email,phone:phone,username:username},);

  }

  search(state_id, color_id, sex,age,energy_level,size): Observable<any> {
    this.headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.auth.getToken() });
    let url = "/api/post/search";
    return this._http.post(url, {state_id:state_id, color_id:color_id,sex:sex,age:age,energy_level:energy_level,size:size}, { headers: this.headers });

  }

  
  like(post_id, value): Observable<any> {
    this.headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.auth.getToken() });
    let url = "/api/post/like";
    return this._http.post(url, {post_id:post_id, value:value}, { headers: this.headers });

  }
  getnotification(){
    this.headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.auth.getToken() });
    let url = "/api.happytailstv.com/api/user/notifications";
    return this._http.post(url, { headers: this.headers });
  }


  /**
   * Handle Http operation that failed.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // Log raw error to console
      // console.error(error); // log to console instead

      // Log custom error message to console

      // Send custom error message to view
      // return throwError(`${operation} failed: ${error.message}`);
      return throwError(` Network error, please try again later.`);
    };
  }
}
