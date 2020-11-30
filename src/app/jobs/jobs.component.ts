import { Component, OnInit } from '@angular/core';
import {GithubJobsService} from '../services/github-jobs.service';
import {GithubJobsModel} from '../models/github-jobs.model';
import {map} from 'rxjs/operators';
import {DataService} from '../services/data.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {

  jobs: GithubJobsModel[] = [];

  constructor(private ghService: GithubJobsService,
              private dataService: DataService) { }

  ngOnInit(): void {
    this.ghService.getResults()
      .subscribe((observer: GithubJobsModel[]) => {
      this.jobs = observer;
      console.log(this.jobs);
      // this.dataService.gitHubJobs.next(this.jobs);
    });

    this.dataService.gitHubJobs.subscribe((observer: GithubJobsModel[]) => {
      this.jobs = observer;
    });
  }

  // daysPassedFromPublication(date: string): string{
  //   const currentDate = new Date();
  //   const newDate = new Date(date);
  //   const differenceInTime = currentDate.getTime() - newDate.getTime();
  //   const differenceInDays = differenceInTime / (1000 * 3600 * 24);
  //   return `${Math.floor(differenceInDays).toString()} days ago`;
  // }

}
