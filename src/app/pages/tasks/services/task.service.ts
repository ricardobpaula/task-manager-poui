import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private readonly API = `${environment.baseUrl}/v1/tasks`
  constructor(private httpClient: HttpClient) { }

  list ():Observable<Task[]> {
    const headers = new HttpHeaders({
      Authorization: environment.token
    })

    return this.httpClient.get<Task[]>(this.API, {
      headers
    })
  }
}
