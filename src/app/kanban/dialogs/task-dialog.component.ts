import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-task-dialog',
  template: `
    <h1 mat-dialog-title class="dialog-title">
      {{ data.isNew ? 'Create New Task' : 'Edit Your Task' }}
    </h1>
    <div mat-dialog-content class="content col mx-auto">
      <mat-form-field appearance="outline">
        <mat-label>
          {{ data.isNew ? 'Describe your task' : 'Edit Description' }}
        </mat-label>
        <textarea
          #description="ngModel"
          name="description"
          placeholder="Task description"
          matInput
          [(ngModel)]="data.task.description"
          mat-autosize
          rows="5"
          required
        ></textarea>
      </mat-form-field>
      <mat-error *ngIf="description.touched && description.invalid">
        Task description cannot be empty!
      </mat-error>
      <br />
      <mat-button-toggle-group
        #group="matButtonToggleGroup"
        [(ngModel)]="data.task.label"
      >
        <mat-button-toggle *ngFor="let opt of labelOptions" [value]="opt">
          <mat-icon [ngClass]="opt">
            {{ opt === 'gray' ? 'check_circle' : 'lens' }}
          </mat-icon>
        </mat-button-toggle>
      </mat-button-toggle-group>
    </div>
    <div mat-dialog-actions>
      <button
        class="action-button"
        [disabled]="description.invalid"
        mat-raised-button
        color="accent"
        [mat-dialog-close]="data"
      >
        {{ data.isNew ? 'Create Task' : 'Save Task' }}
      </button>
    </div>
  `,
  styles: [
    `
      .dialog-title {
        font-size: 24px;
        font-weight: bold;
        text-align: center;
      }

      .content {
        overflow-y: scroll;
        overflow-x: hidden;
        height: auto;
        padding: 20px;
        width: 100%;
        text-align: center;
      }

      .content::-webkit-scrollbar {
        display: none;
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

      textarea {
        display: block;
        width: 100%;
      }

      .blue {
        color: #71deff;
      }
      .green {
        color: #36e9b6;
      }
      .yellow {
        color: #ffcf44;
      }
      .purple {
        color: #b15cff;
      }
      .gray {
        color: gray;
      }
      .red {
        color: #e74a4a;
      }

      .action-button {
        display: block;
        margin: 0 auto 7px;
      }
    `,
  ],
})
export class TaskDialogComponent implements OnInit {
  labelOptions: string[] = ['purple', 'blue', 'green', 'yellow', 'red', 'gray'];

  constructor(
    private dialogRef: MatDialogRef<TaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
