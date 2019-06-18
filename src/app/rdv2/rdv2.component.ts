import { OnInit } from '@angular/core';
import {formatDate} from '@angular/common';
import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef
} from '@angular/core';
import { UserService } from '../services/user.service';
import { TokenStorageService } from '../auth/token-storage.service';
import { HttpClient,HttpParams,HttpHeaders} from '@angular/common/http';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import { Subject, Observable, pipe } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView
} from 'angular-calendar';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};


@Component({
  selector: 'app-rdv2',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './rdv2.component.html',
  styleUrls: ['./rdv2.component.css']
})
export class Rdv2Component implements OnInit {
  listPatients:any;
  events: CalendarEvent[];
  today: Date;
  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event);
      }
    }
  ];

  events2: any;
  items: Array<CalendarEvent<{ time: any }>> = [];


  ngOnInit() {

    this.getAllRdvs();

  }



  @ViewChild('modalContent') modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };



  refresh: Subject<any> = new Subject();



  activeDayIsOpen: boolean = true;

  constructor(private modal: NgbModal,private http:HttpClient,private token: TokenStorageService, private userService:UserService) {}

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.viewDate = date;
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map(iEvent => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),

      }
    ];
  }

  addEvent2(eventToAdd: CalendarEvent) {
    this.events.push(eventToAdd);
  }


  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter(event => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }


  user:any;
  patient:Array<any>;
getAllRdvs()
{
  this.userService.getUserByUsername(this.token.getUsername()).subscribe((p:any)=>{
    this.today = new Date();

    var body = new HttpParams().set('DoctorId', p.id.toString());

    this.http.post("http://localhost:8080/api/rdv/checkrdv2",body.toString(),
    {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
    }).subscribe((res:any[])=>{
      console.log(res);
      for(let i=0; i<res.length; i++) {
        this.items.push(
        {
          title: res[i].patientId.name +" "+res[i].patientId.lastname+" "+ res[i].time,
          start: new Date(res[i].date),
      });
      this.events = this.items;
    }
    document.getElementById("loader").hidden=true;

    });


  });
}





}
