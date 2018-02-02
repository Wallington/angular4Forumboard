import 
{
    Component,
     Inject
} from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component
({
    selector: 'dialogComponent',
    templateUrl: 'dialog.component.html',
    styleUrls: ['dialog.styles.scss']
})
export class DialogComponent
{
    constructor
    (
        public dialogRef: MatDialogRef<DialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data : any
    )
    {}

    Exit()
    {
        this.dialogRef.close();
    }
}