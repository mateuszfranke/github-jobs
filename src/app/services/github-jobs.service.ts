import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {GithubJobsModel} from '../models/github-jobs.model';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class GithubJobsService{

  constructor(private http: HttpClient) {
  }

  getResults(): Observable<GithubJobsModel[]>{
    const url = `${environment.herokuUrl}` + 'https://jobs.github.com/positions.json?description=python&location=new+york';
    return this.http.get<GithubJobsModel[]>(url);
  }
  getDescriptions(description: string): Observable<GithubJobsModel[]>{
    const githubJobsUrl = `https://jobs.github.com/positions.json?description=${description}`;
    const url = `${environment.herokuUrl}${githubJobsUrl}`;
    return this.http.get<GithubJobsModel[]>(url);
  }
}
