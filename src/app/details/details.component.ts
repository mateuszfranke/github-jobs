import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DataService} from '../services/data.service';
import {GithubJobsModel} from '../models/github-jobs.model';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  jobId: string;
  job: GithubJobsModel;

  constructor(private rout: ActivatedRoute,
              private dataService: DataService) {
  }

  ngOnInit(): void {
    this.jobId = this.rout.snapshot.params.id;
    this.job = this.dataService.getSingle(this.jobId);
    console.log(this.job);
  }

}
