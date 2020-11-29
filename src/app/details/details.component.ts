import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  jobId: string;

  constructor(private rout: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.jobId = this.rout.snapshot.params.id;
    console.log(this.jobId);
  }

}
