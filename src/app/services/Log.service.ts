import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Log } from '../models/Log';

@Injectable()
export class LogService {
  logs: Log[];

  private logSource = new BehaviorSubject<Log>({id: null, text: null, date: null});
  selectedLog = this.logSource.asObservable();

  private stateSource = new BehaviorSubject<boolean>(true);
  stateClear = this.stateSource.asObservable();

  constructor() {
    // // this.logs = [
    // //   {id: '1', text: 'Generated components', date: new Date('06/06/2019 10:29:57')},
    // //   {id: '2', text: 'Added Bootstrap', date: new Date('07/06/2019 15:38:25')},
    // //   {id: '3', text: 'Added logs components', date: new Date('07/06/2019 17:06:34')}
    // ]

    this.logs = []; 
   }

   getLogs(): Observable<Log[]> {
     if(localStorage.getItem('logs') === null){
       this.logs = [];
     } else {
       this.logs = JSON.parse(localStorage.getItem('logs'));
     }
     //sort by date
     return of (this.logs.sort((a, b) => {
       return b.date = a.date;
     }));
   }

   setFormLog(log: Log){
     this.logSource.next(log);

   }

   addLog(log: Log){
     this.logs.unshift(log);

     // Add to local storage
     localStorage.setItem('logs', JSON.stringify (this.logs));
   }

   updateLog(log: Log){
     this.logs.forEach((cur, index) => {
       if(log.id === cur.id) {
         this.logs.splice(index, 1);
       }
     });
     this.logs.unshift(log);

      // Update local storage
      localStorage.setItem('logs', JSON.stringify (this.logs));
   }

   deleteLog(log: Log){
    this.logs.forEach((cur, index) => {
      if(log.id === cur.id) {
        this.logs.splice(index, 1);
      }
    });

      // Delete from local storage
      localStorage.setItem('logs', JSON.stringify (this.logs));
  }

  clearState(){
    this.stateSource.next(true);
  }
}
