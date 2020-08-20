import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-board-dialog',
  template: `
    <div class="row">
      <div class="col mx-auto dialog-body">
        <h1 mat-dialog-title class="dialog-title">Create A New Board</h1>
        <div mat-dialog-content>
          <p>What do we call this board?</p>
          <mat-form-field appearance="outline">
            <mat-label>A Short Sassy Name</mat-label>
            <input
              name="title"
              #title="ngModel"
              placeholder="Jane's Board"
              matInput
              [(ngModel)]="data.title"
              required
              minlength="5"
              maxlength="20"
            />
          </mat-form-field>
          <mat-error *ngIf="title.touched && title.invalid">
            <div *ngIf="title.errors?.required">
              Oops! This is a required field!
            </div>
            <div *ngIf="title.errors?.minlength">
              Must be at least 5 characters.
            </div>
            <div *ngIf="title.errors?.maxlength">
              Cannot be more than 20 characters.
            </div>
          </mat-error>
        </div>
        <div mat-dialog-actions class="action-buttons">
          <button mat-button (click)="onNoClick()">
            Maybe, Later
          </button>
          <button
            [disabled]="title.invalid"
            mat-stroked-button
            color="accent"
            [mat-dialog-close]="data.title"
          >
            Create My Board
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .dialog-title {
        font-size: 24px;
        font-weight: bold;
      }

      .dialog-body {
        text-align: center;
      }

      .mat-form-field {
        width: 60%;
      }

      .mat-error {
        font-size: 14px;
        color: #f85959;
        font-weight: 600;
        margin-bottom: 10px;
      }

      .mat-error:focus {
        border-color: #f85959;
      }

      .action-buttons {
        display: block;
        margin: 0 auto;
      }
    `,
  ],
})
export class BoardDialogComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<BoardDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
