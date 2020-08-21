import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BoardService } from 'src/app/services/kanban/board.service';

@Component({
  selector: 'app-task-dialog',
  template: `
    <h1 mat-dialog-title class="dialog-title">
      {{ data.isNew ? 'Add New Task' : 'Edit Your Task' }}
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
    <div mat-dialog-actions class="action-buttons">
      <button mat-stroked-button (click)="onNoClick()">
        Close
      </button>
      <button
        [disabled]="description.invalid"
        mat-raised-button
        color="accent"
        [mat-dialog-close]="data"
      >
        <mat-icon class="icon-btn" *ngIf="data.isNew">add_circle</mat-icon>
        <mat-icon class="icon-btn" *ngIf="!data.isNew">save</mat-icon>
        {{ data.isNew ? 'Add Task' : 'Save' }}
      </button>

      <app-delete-button
        *ngIf="!data.isNew"
        (delete)="handleDeleteEvent()"
        [isDialog]="true"
      ></app-delete-button>
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
        width: 80% !important;
      }

      mat-button-toggle-group {
        width: auto;
        flex-wrap: wrap;
      }

      :host .mat-button-toggle {
        border: 0.5px none #000;
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

      .action-buttons {
        display: flex;
        flex-direction: row;
        justify-content: center;
        margin-bottom: 2px;
      }

      .icon-btn {
        margin-top: -2px;
      }
    `,
  ],
})
export class TaskDialogComponent implements OnInit {
  labelOptions: string[] = ['purple', 'blue', 'green', 'yellow', 'red', 'gray'];

  constructor(
    private dialogRef: MatDialogRef<TaskDialogComponent>,
    private boardService: BoardService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  handleDeleteEvent() {
    this.boardService.removeTask(this.data.boardId, this.data.task);
  }
}
