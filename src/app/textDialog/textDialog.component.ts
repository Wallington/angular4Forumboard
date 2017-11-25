import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material"

@Component
({
    selector: 'text-dialog',
    templateUrl: './textDialog.html'
})
export class TextDialogComponent
{
    constructor
    (
        public dialogRef: MatDialogRef<TextDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    )
    {}
}