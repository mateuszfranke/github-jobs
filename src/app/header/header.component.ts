import { Component, OnInit } from '@angular/core';
import {GithubJobsService} from '../services/github-jobs.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private githubServices: GithubJobsService) { }

  keywords: string;

  ngOnInit(): void {
  }

  onSearch(): void {
    this.githubServices.getDescriptions(this.keywords).subscribe(x => console.log(x));
  }
}
