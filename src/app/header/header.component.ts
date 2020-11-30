import {Component, OnInit} from '@angular/core';
import {GithubJobsService} from '../services/github-jobs.service';
import {DataService} from '../services/data.service';
import {GithubJobsModel} from '../models/github-jobs.model';
import {SearchModel} from '../models/search.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  keywords: string;
  search: SearchModel;
  counter = 0;
  jobs: GithubJobsModel[] = [];

  constructor(private githubServices: GithubJobsService,
              private dataService: DataService) {
  }

  ngOnInit(): void {
    this.dataService.searchModel.subscribe((observer: SearchModel) => this.search = observer);
  }

  onSearch(): void {
    this.githubServices.getDescriptions(this.keywords, this.search, this.counter)
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

