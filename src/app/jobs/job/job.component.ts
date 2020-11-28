import {Component, Input, OnInit, Output} from '@angular/core';
import {GithubJobsModel} from '../../models/github-jobs.model';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss']
})
export class JobComponent implements OnInit {

  @Input() job: GithubJobsModel = new GithubJobsModel();
  constructor() { }

  ngOnInit(): void {
  }

}
