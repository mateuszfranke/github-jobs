import { Component, OnInit } from '@angular/core';
import {GithubJobsService} from '../services/github-jobs.service';
import {GithubJobsModel} from '../models/github-jobs.model';
import {observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {

  jobs: GithubJobsModel[] = [];

  constructor(private ghService: GithubJobsService) { }

  ngOnInit(): void {
    this.ghService.getResults()
      .pipe(map((x: GithubJobsModel[]) => {
        const arr: GithubJobsModel[] = [];
        x.forEach(el => {
          el.created_at = this.daysPassedFromPublication(el.created_at);
          arr.push(el);
        });
        return arr;
      }))
      .subscribe((observer: GithubJobsModel[]) => {
      this.jobs = observer;
      console.log(this.jobs);
    });
  }

  daysPassedFromPublication(date: string): string{
    const currentDate = new Date();
    const newDate = new Date(date);
    const differenceInTime = currentDate.getTime() - newDate.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);
    return `${Math.floor(differenceInDays).toString()} days ago`;
  }

}
