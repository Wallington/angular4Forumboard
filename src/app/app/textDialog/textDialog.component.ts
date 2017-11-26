import { Component, Inject } from "@angular/core";
import { MD_DIALOG_DATA, MdDialogRef } from "@angular/material"

@Component
({
    selector: 'text-dialog',
    templateUrl: './textDialog.html'
})
export class TextDialogComponent
{
    constructor
    (
        public dialogRef: MdDialogRef<TextDialogComponent>,
        @Inject(MD_DIALOG_DATA) public data: any
    )
    {}
}