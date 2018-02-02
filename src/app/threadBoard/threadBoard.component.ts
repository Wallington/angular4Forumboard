import 
{
     Component,
     OnInit,
     ViewChild,
     NgZone
} from "@angular/core";

import { MainComponent } from '../main/main.component'
import { Http} from '@angular/http';
import { CookieService } from 'ngx-cookie'
import { Params, ActivatedRoute } from '@angular/router'

//importing the tool need for the display/sorting
import { DataSource} from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { MatSort } from '@angular/material';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';

import { MatDialog } from '@angular/material';
import { DialogComponent } from "../dialog/dialog.component";
import { ObservableMedia } from '@angular/flex-layout'

@Component
({
    selector: 'ThreadBoardComponent',
    templateUrl: './threadBoard.component.html',
    styleUrls: ['./threadBoard.styles.scss'],
})

export class ThreadBoardComponent implements OnInit
{

    constructor
    (
        private MainComp : MainComponent,
        private CookieServ: CookieService,
        private Http : Http,
        private ActivatedRoute : ActivatedRoute,
        public Dialog: MatDialog,
        private Media: ObservableMedia,
        private NgZone : NgZone
    ){}
    // decalaring the name of the board
    forumboardName = '';
    // decalaring the id of the board
    forumboardID = '';

    //Each of the column want to display
    displayedColumns = ['name','authorName','createdDate', 'lastedPostDate', 'postCount'];

    threadDatabase = new ThreadDataBase(this.Http, this.ActivatedRoute);

    dataSource : ThreadDataSource | null;

    @ViewChild(MatSort) sort: MatSort;

    

    ngOnInit()
    {
        this.MainComp.DisplayProfile( this.CookieServ.getObject('profile'));
        this.MainComp.hideMainMenu = false;
        this.ActivatedRoute.params.subscribe ((parms: Params) =>
        {
            this.Http.get('http://localhost:8081/db/get/forumboard/byid/' + parms['forumboardID']).subscribe (data =>
            {
                let forumData = JSON.parse(data["_body"]);
                this.forumboardID = forumData["_id"];
                this.forumboardName = forumData["name"];
            });
        });

        this.dataSource = new ThreadDataSource(this.threadDatabase, this.sort)
    }

    
    NewTopic() // create a new topic 
    {
        let size = 400; //default is set default size by 400px width
        let dialogData = 
        {
            subject : '',
            message: '' 
        }

        
        if(this.Media.isActive('xs')) //checking for extra small phone size
        {
            size = 400;
        }
        else if( this.Media.isActive('sm')) //checking for small phone size
        {
            size = 500
        }
        else if( this.Media.isActive('md')) //checking for medium phone size
        {
            size = 800
        }
        else if( this.Media.isActive('lg')) //checking for large phone size
        {
            size = 1000
        }
        else if( this.Media.isActive('xl')) //checking for extra large phone size
        {
            size = 1500
        }
        //injecting the Dialog Component into our thread component
        let textDialog = this.Dialog.open(DialogComponent, 
        {
            width: size + 'px', // convert to X size to string example 400px
            data: dialogData
        });

        textDialog.afterClosed().subscribe(data =>
        {
            this.AddTopic(data)
        });
    }

    AddTopic(data)
    {
        let authorName = this.CookieServ.getObject('profile');
        authorName = authorName['name'];
       
        //we are calling the server to create the new thread, data is place as follow the thread model order
        this.Http.head('http://localhost:8081/db/create/thread/'+ this.forumboardID + '/' + data.subject + '/' + authorName + '/'+ data.message ).subscribe();
        this.NgZone.run(()=>
        {
           new BehaviorSubject<Thread[]>([]);
        });

    }

}

export interface Thread
{
    name: string;
    authorName: string;
    createdDate: string;
    lastedPostDate: string;
    postCount: number;
}

export class ThreadDataBase
{
    //emit whenever data has been modified
    dataChange: BehaviorSubject<Thread[]> = new BehaviorSubject<Thread[]>([]);
    get data(): Thread[]
    {
        return this.dataChange.value;
    }

    constructor
    (
        
        private Http : Http,
        private ActivatedRoute : ActivatedRoute
    )
    {
        this.AddThread();
    }

    AddThread()
    {
        this.ActivatedRoute.params.subscribe ((parms: Params) =>
        {
            
            this.Http.get('http://localhost:8081/db/get/threads/byid/' + parms['forumboardID'] ).subscribe(data1 =>
            {
                
                let threadData = JSON.parse(data1['_body']);
                let threadDataCount = Object.keys(threadData).length;
                for(let i = 0; i < threadDataCount; i++)
                {
                    const copiedData = this.data.slice();
                    copiedData.push(this.CreateNewThread(threadData[i]));
                    this.dataChange.next(copiedData);
                }
            });
        });
        
    }

    private CreateNewThread(data)
    {
        return{
            name: data.name,
            authorName: data.authorName,
            createdDate: data.createdDate,
            lastedPostDate: data.lastedPostDate,
            postCount: data.postCount
        };
    }
}

export class ThreadDataSource extends DataSource<any>
{
    constructor
    (
        private ThreadDataBase: ThreadDataBase,
        private sort: MatSort
    )
    {
        super();
    }

    connect() : Observable<Thread[]>
    {
        const displayDataChanges = 
        [
            this.ThreadDataBase.dataChange,
            this.sort.sortChange
        ];

        return Observable.merge(...displayDataChanges).map
        (
            () =>
            {
                return this.GetSortedData();
            }
        );
    }

    disconnect(){}

    GetSortedData(): Thread[]
    {
        const data = this.ThreadDataBase.data.slice();
        if (!this.sort.active || this.sort.direction == '')
        {
            return data;
        }

        return data.sort(
            (a, b) =>
            {
                let propertyA: number|string = '';
                let propertyB: number|string = '';

                switch(this.sort.active)
                {
                    case 'name':
                    {
                        [propertyA, propertyB] = [a.name, b.name];
                        break;
                    }
                    case 'authorName':
                    {
                        [propertyA, propertyB] = [a.authorName, b.authorName];                    
                        break;
                    }
                    case 'createdDate':
                    {
                        [propertyA, propertyB] = [a.createdDate, b.createdDate];
                        break;
                    }
                    case 'lastedPostDate':
                    {
                        [propertyA, propertyB] = [a.lastedPostDate, b.lastedPostDate];
                        break;
                    }
                    case 'postCount':
                    {
                        [propertyA, propertyB] = [a.postCount, b.postCount];
                        break;
                    }
                }

                let valueA = isNaN(+propertyA) ? propertyA : +propertyA;
                let valueB = isNaN(+propertyB) ? propertyB : +propertyB;

                return (valueA < valueB ? -1 : 1) * (this.sort.direction == 'asc' ? 1 : -1);
            });
        }
}