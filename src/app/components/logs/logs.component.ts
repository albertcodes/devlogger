import { Component, OnInit } from '@angular/core';
import { text } from '@angular/core/src/render3';

import { LogService } from '../../services/Log.service';
import { Log } from '../../models/Log';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {
  logs: Log[];
  selectedLog: Log;
  loaded: boolean = false;

  constructor(private LogService: LogService) { }

  ngOnInit() {
    this.LogService.stateClear.subscribe(clear => {
      if(clear) {
        this.selectedLog = { id: '', text: '', date: ''};
      }
    });


    this.LogService.getLogs().subscribe(logs => {
      this.logs = logs;
      this.loaded = true;
    });
  }

  onSelect(log: Log){
    this.LogService.setFormLog(log);
    this.selectedLog = log;
    
  }

  onDelete(log: Log){
    if(confirm('Confirm Delete?')){
    this.LogService.deleteLog(log);
    }
    
  }

}