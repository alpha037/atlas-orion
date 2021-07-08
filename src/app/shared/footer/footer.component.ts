import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <footer class="footer footer-main">
      <p class="footer-company-name">
        <span>All Rights Reserved. </span>
        <span
          ><a href="https://atlas.shubhranil.com" target="_blank" rel="noopener"
            >Atlas Inc.</a
          >
          &copy; {{ date }}</span
        >
      </p>
    </footer>
  `,
  styles: [
    `
      .footer-main {
        background-color: #292c2f;
        box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.12);
        box-sizing: border-box;
        width: 100%;
        text-align: center;

        padding: 30px 50px;
        /* margin-top: -40px; */
      }

      a {
        color: #ffffff;
        text-decoration: none;
      }

      .footer-main .footer-company-name {
        color: #8f9296;
        font-size: 15px;
        font-weight: 500;
        margin: 0;
        letter-spacing: 3px;
      }

      @media (max-width: 992px) {
        .footer-main {
          font: bold 14px;
        }
      }

      @media (max-width: 770px) {
        .footer-main .footer-company-name {
          display: flex;
          flex-direction: column;
          font-size: 14px;
        }
      }
    `,
  ],
})
export class FooterComponent implements OnInit {
  public date: number;

  constructor() {}

  ngOnInit(): void {
    this.date = new Date().getFullYear();
  }
}
