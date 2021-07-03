import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackService } from 'src/app/services/shared/snack.service';

@Component({
  selector: 'app-about-dialog',
  template: `
    <div class="row">
      <div class="col mx-auto dialog-body">
        <h1 mat-dialog-title class="dialog-title">Create Your About Page</h1>
        <div mat-dialog-content>
          <mat-form-field appearance="outline">
            <mat-label>Your Name</mat-label>
            <input
              name="name"
              #name="ngModel"
              placeholder="Harvey Specter"
              matInput
              [(ngModel)]="data.name"
              required
              minlength="3"
              maxlength="25"
              autocomplete="off"
            />
          </mat-form-field>
          <mat-error *ngIf="name.touched && name.invalid">
            <div *ngIf="name.errors?.required">
              Now, don't tell me you don't have a name!
            </div>
            <div *ngIf="name.errors?.minlength">
              I asked your name, not your initials!
            </div>
            <div *ngIf="name.errors?.maxlength">ONLY Your Name!</div>
          </mat-error>

          <mat-form-field appearance="outline">
            <mat-label>A Short Tagline</mat-label>
            <input
              name="tagline"
              #tagline="ngModel"
              placeholder="I don't play the odds. I play the man."
              matInput
              [(ngModel)]="data.tagline"
              required
              minlength="3"
              maxlength="50"
              autocomplete="off"
            />
          </mat-form-field>
          <mat-error *ngIf="tagline.touched && tagline.invalid">
            <div *ngIf="tagline.errors?.required">
              A short and crisp tagline always stands out
            </div>
            <div *ngIf="tagline.errors?.minlength">
              I asked your tagline, not your initials!
            </div>
            <div *ngIf="tagline.errors?.maxlength">What is that, an essay?</div>
          </mat-error>

          <mat-form-field appearance="outline">
            <mat-label>You Bio</mat-label>
            <textarea
              name="bio"
              #bio="ngModel"
              placeholder="... blah blah blah ..."
              matInput
              [(ngModel)]="data.bio"
              minlength="10"
              maxlength="150"
              autocomplete="off"
              rows="5"
            ></textarea>
          </mat-form-field>
          <mat-error *ngIf="bio.touched && bio.invalid">
            <div *ngIf="bio.errors?.minlength">
              Must be at-least 10 characters!
            </div>
            <div *ngIf="bio.errors?.maxlength">What is that, an essay?</div>
          </mat-error>

          <mat-form-field appearance="outline">
            <mat-label>Your Avatar URL</mat-label>
            <input
              name="image"
              #image="ngModel"
              matInput
              type="url"
              [(ngModel)]="data.image"
              autocomplete="off"
            />
          </mat-form-field>
          <mat-error *ngIf="image.touched && image.invalid"> </mat-error>
        </div>
        <div mat-dialog-actions class="action-buttons">
          <button mat-button (click)="onNoClick()">Maybe, Later</button>
          <button
            (click)="afterSubmit()"
            [disabled]="name.invalid || tagline.invalid"
            mat-stroked-button
            color="accent"
            [mat-dialog-close]="data"
          >
            Create My Page
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
        display: flex;
        margin: 6px 0 -7px;
        justify-content: center;
      }

      @media screen and (max-width: 768px) {
        .action-buttons {
          flex-direction: column;
          margin-bottom: -5px;
        }

        .action-buttons button {
          margin-top: 5px;
        }
      }
    `,
  ],
})
export class AboutDialogComponent implements OnInit {
  constructor(
    private snackService: SnackService,
    private dialogRef: MatDialogRef<AboutDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {}

  afterSubmit(): void {
    this.snackService.creatingCustomer();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
