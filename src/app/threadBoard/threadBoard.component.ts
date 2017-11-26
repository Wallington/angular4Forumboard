//import 
import 
{
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';


//importing the tool need for the display/sorting thread post
import { DataSource} from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { MatSort } from '@angular/material';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';

import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import
{
    Router
} from '@angular/router';

import 
{
    ActivatedRoute,
    Params
} from '@angular/router'

//importing headerComponent
//import { headerComponent } from '../header/header.component';
import { TextDialogComponent } from '../textDialog/textDialog.component';


@Component
({
    selector: 'app-threadBoard',
    templateUrl: './threadBoard.component.html',
    styleUrls: ['../../../node_modules/@angular/material/prebuilt-themes/indigo-pink.css', './threadBoard.styles.css', '../main/main.styles.css'],
    providers: []
})

export class threadBoardComponent implements OnInit
{
    constructor
    ( 
        private activeRoute: ActivatedRoute,
        private http: HttpClient,
        private router: Router,
        private dialog: MatDialog
    ){}
      displayedColumns = ['name','authorName','createdDate','recenentPostDate','postCount'];
      threadDatabase = new ThreadDataBase(this.http, this.activeRoute);
      dataSource : ThreadDataSoruce | null;
      
      ForumBoardName = "";
      @ViewChild(MatSort) sort: MatSort;
      
    ngOnInit()
    {
        this.dataSource = new ThreadDataSoruce(this.threadDatabase, this.sort);
          
         
        this.activeRoute.params.subscribe((params: Params) =>
        {
              //get the forum board name from server database
              this.ForumBoardName = params['forumBoardName'];
        });
    }

    SelectThread(name)
    {
        this.router.navigate(['/postBoard', this.ForumBoardName, name],{ preserveFragment: true });
    }

    //this create opeing of the dialog which call TextDialog
    OpenNewTopicModel(): void
    {
        this.dialog.open(TextDialogComponent,
        {
            width: '100%',
            data: {}
        });
    }
    TextDialogComponent.afterClosed().subscribe
    (
        result => 
        {
            console.log(result);
        }
    );

}

export interface Thread
{
    name: string;
    authorName: string;
    createdDate: string;
    recenentPostDate: string;
    postCount: number;
}

export class ThreadDataBase
{
    //stream that emit whenever data has been modified
    dataChange: BehaviorSubject<Thread[]> = new BehaviorSubject<Thread[]>([]);
    get data(): Thread[] {
        return this.dataChange.value;
    }

    constructor
    (
        private http: HttpClient,
        public activeRoute: ActivatedRoute      
    )
    {   
        this.AddThread();   
    }

    AddThread ()
    {
         this.activeRoute.params.subscribe((params: Params) =>
        {
           this.http.get('/thread/get/' + params['forumBoardName']).subscribe(jsonData =>
            {
                let jsonDataCount = Object.keys(jsonData).length
                for(let i = 0; i < jsonDataCount; i++)
                {
                    //console.log(jsonData['threads'][i]);
                    const copiedData = this.data.slice();
                    copiedData.push(this.CreateNewThread(jsonData[i]));
                    this.dataChange.next(copiedData);
                }
                
                //console.log(this.dataChange)
            });
        });
        
        
    } 
    
    private CreateNewThread (data)
    {
        return{
            name: data.name,
            authorName: data.authorName,
            createdDate: data.createdDate,
            recenentPostDate: data.recenentPostDate,
            postCount: data.postCount
        };
    }
    

}

export class ThreadDataSoruce extends DataSource<any>
{
    constructor
    (
        private threadDataBase: ThreadDataBase,
        private sort: MatSort
    )
    {
        super();
        
    }

    connect() : Observable<Thread[]>
    {
        const displayDataChanges = 
        [
            this.threadDataBase.dataChange,
            this.sort.sortChange,
        ];

        return Observable.merge(...displayDataChanges).map(() => 
        {
            
            return this.GetSortedData();
        });
    }

    disconnect(){}

    GetSortedData(): Thread[]
    {
        
        const data = this.threadDataBase.data.slice();
        if (!this.sort.active || this.sort.direction == '')
        {
            return data;
        }

        return data.sort((a, b) =>
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
                case 'recenentPostDate':
                {
                    [propertyA, propertyB] = [a.recenentPostDate, b.recenentPostDate];
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



/*    
    //define global verable in this class
    displayedColumns = ['userId','userName','progress','color'];
    exampleDatabase = new ExampleDatabase();
    dataSource = ExampleDataSource | null;

    @ViewChild(matSort) sort: matSort;

    ngOnInit()
    {
        this.dataSource = new ExampleDataSource(this.exampleDatabase, this.sort);
    }

}

const COLORS = ['maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple',
'fuchsia', 'lime', 'teal', 'aqua', 'blue', 'navy', 'black', 'gray'];
const NAMES = ['Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack',
'Charlotte', 'Theodore', 'Isla', 'Oliver', 'Isabella', 'Jasper',
'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'];

export interface UserData
{
    id: string;
    name: string;
    progress: string;
    color: string;
}

export class ExampleDatabase
{
    //stream that emit whenever the data has been modified
    dataChange: BehaviorSubject<UserData[]> = new BehaviorSubject<UserData[]>([]);
    get data(): UserData[] { return this.dataChange.value; }
    
    constructor()
    {
        //fil up the database with 100 users
        for(let i = 0; i < 100; i++)
        {
            this.addUser();
        }
    }

    

    addUser()
    {
        const copiedData = this.data.slice();
        copiedData.push(this.createNewUser());
        this.dataChange.next(copiedData);
    }

    private createNewUser()
    {
        const name = NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' '+
        NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

        return{
            id: (this.data.length + 1),
            name: name,
            progress: Math.round(Math.random() * 100).toString(),
            color: COLORS[Math.round(Math.random() * (COLORS.length - 1))],
        };
    }
    
}


 /* Data source to provide what data should be rendered in the table. Note that the data source
  can retrieve its data in any way. In this case, the data source is provided a reference
 * to a common data base, ExampleDatabase. It is not the data source's responsibility to manage
 * the underlying data. Instead, it only needs to take the data and send the table exactly what
 * should be rendered.


 export class ExampleDataSource extends DataSource<any>
 {
    constructor
    (
        private _exampleDatabase: ExampleDatabase, 
        private _sort: matSort
    ){ 
        super();
    }
    
    connect() : Observable<UserData[]>
    {
        const displayDataChanges = 
        [
            this._exampleDatabase.dataChange,
            this._sort.matSortChange,
        ];

        return Observable.merge(...displayDataChanges).map(() => 
        {
            return this.getSortedData();
        });
    }

    disconnect(){}

    //return a sorted copy of the database data
    getSortedData(): UserData[]
    {
        const data = this._exampleDatabase.data.slice();

        if(!this._sort.active || this._sort.direction == '')
        {
            return data;
        }

        return data.sort((a, b) => 
        {
            let propertyA: number|string = '';
            let propertyB: number|string = '';

            switch (this._sort.active)
            {
                case 'userId':
                {
                    [propertyA, propertyB] = [a.id, b.id];
                    break;
                }
                case 'userName':
                {
                    [propertyA, propertyB] = [a.name, b.name];
                    break;
                }
                case 'progress':
                {
                    [propertyA, propertyB] = [a.progress, b.progress];
                    break;
                }
                case 'color':
                {
                    [propertyA, propertyB] = [a.color, b.color];
                    break;
                }

            }

            let valueA = isNaN(+propertyA) ? propertyA : +propertyA;
            let valueB = isNaN(+propertyB) ? propertyB : +propertyB;

            return (valueA < valueB ? -1 : 1) * (this._sort.direction == 'asc' ? 1 : -1);
        });
    }
 }
*/