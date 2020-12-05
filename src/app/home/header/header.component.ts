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
    this.clearCurrentJobs();
    this.startLoader();
    this.getJobsData();
  }

  isEmptySearch(jobs: GithubJobsModel[]): void{
    if (jobs?.length < 1) {
      this.dataService.noResults.next(true);
    }else{
      this.dataService.noResults.next(false);
    }
  }

  getJobsData(): void {
    this.githubServices.getDescriptions(this.counter)
      .subscribe((observer: GithubJobsModel[]) => {
        this.isEmptySearch(observer);
        if (observer.length < 50) {
          this.jobs = [...observer, ...this.jobs];
          this.counter = 0;
          this.dataService.gitHubJobs.next(this.jobs);
        } else {
          this.counter += 1;
          this.jobs = [...observer, ...this.jobs];
          this.getJobsData();
        }
      });
  }

  clearCurrentJobs(): void {
    this.jobs = [];
    this.dataService.gitHubJobs.next([]);
  }

  startLoader(): void {
    this.dataService.loading.next(true);
    this.dataService.noResults.next(false);
  }
}

