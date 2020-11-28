import { Component, OnInit } from '@angular/core';
import {GithubJobsService} from '../services/github-jobs.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {

  constructor(private ghService: GithubJobsService) { }

  ngOnInit(): void {
    this.ghService.getResults();
  }

}
