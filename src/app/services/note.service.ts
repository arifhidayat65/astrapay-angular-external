import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Note } from '../models/note';
import { environment } from '../../environments/environment';

@Injectable()
export class NoteService {
  private apiUrl = `${environment.apiUrl}/notes`;

  constructor(private http: Http) {}

  getNotes(): Observable<Note[]> {
    return this.http.get(this.apiUrl)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  addNote(content: string): Observable<Note> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post(this.apiUrl, JSON.stringify({ content: content }), { headers: headers })
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  deleteNote(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`)
      .catch(this.handleError);
  }

  private handleError(error: any) {
    let errMsg: string;
    
    // Check if it's an Angular Response object
    if (error instanceof Response) {
      try {
        const body = error.json() || '';
        errMsg = body.message || body.error || JSON.stringify(body);
      } catch (e) {
        errMsg = error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      }
    } else if (error.status === 0) {
      // Common case for connection refused / CORS issues
      errMsg = 'Cannot connect to backend server. Please ensure http://localhost:8080 is running.';
    } else {
      errMsg = error.message ? error.message : error.toString();
    }

    // Filter out the cryptic "isTrusted" message which happens when stringifying raw events
    if (errMsg.indexOf('isTrusted') !== -1) {
      errMsg = 'Network Error: Connection failed or was blocked (CORS).';
    }

    console.error('API Error:', errMsg);
    return Observable.throw(errMsg);
  }
}
