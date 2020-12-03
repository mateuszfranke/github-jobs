import {Component, OnInit} from '@angular/core';
import {GithubJobsService} from '../../services/github-jobs.service';
import {DataService} from '../../services/data.service';
import {GithubJobsModel} from '../../models/github-jobs.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  keywords: string = '';
  counter = 0;
  jobs: GithubJobsModel[] = [];

  constructor(private githubServices: GithubJobsService,
              private dataService: DataService) {
  }

  ngOnInit(): void {
  }

  onKeyword($event): void {
    this.dataService.keywords.next($event);
  }

  onSearch(): void {
    this.jobs = [];
    this.githubServices.getDescriptions(this.counter)
      .subscribe((observer: GithubJobsModel[]) => {
        if (observer.length < 50) {
          this.jobs = [...observer, ...this.jobs];
          this.dataService.gitHubJobs.next(this.jobs);
        } else {
          this.counter += 1;
          this.jobs = [...observer, ...this.jobs];
          this.onSearch();
        }
      });
  }
}

