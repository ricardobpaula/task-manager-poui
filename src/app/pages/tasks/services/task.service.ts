import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Task } from '../models/task';
import { TaskResume } from '../models/task-resume';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private readonly API = `${environment.baseUrl}/v1/tasks`
  private readonly headers = new HttpHeaders({ Authorization: environment.token })

  constructor(private httpClient: HttpClient) { }

  list ():Observable<Task[]> {
    return this.httpClient.get<Task[]>(this.API, { headers: this.headers })
  }

  get (id: string):Observable<Task> {
    return this.httpClient.get<Task>(`${this.API}/${id}`, { headers: this.headers })
  }

  create ({ code, date, description, name, done }: Task):Observable<void> {
    const task = {
      code, description, name, done, date: new Date(date).toISOString().slice(0,10)
    }
    return this.httpClient.post<any>(this.API, task, { headers: this.headers })
  }

  update ({ code, date, description, name, done }: Task, id: string):Observable<void> {
    const task = {
      code, description, name, done, date: new Date(date).toISOString().slice(0,10)
    }
    return this.httpClient.put<any>(`${this.API}/${id}`, task, { headers: this.headers })
  }

  delete (id: string):Observable<any> {
    return this.httpClient.delete<void>(`${this.API}/${id}`, { headers: this.headers })
  }

  resume ():Observable<TaskResume[]> {
    return this.httpClient.get<TaskResume[]>(`${this.API}/reports/resume`, { headers: this.headers })
  }
}
