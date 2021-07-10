import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  constructor(
    private title: Title,
    private meta: Meta,
    private router: Router
  ) {}

  generateTags({ title = '', description = '', image = '' }): void {
    this.title.setTitle(title);

    // this.meta.addTags([
    //   { name: 'author', content: title },
    //   { name: 'description', content: description },

    //   // Open Graph Tags
    //   {
    //     name: 'og:url',
    //     content: `https://orion.shubhranil.com${this.router.url}`,
    //   },
    //   { name: 'og:title', content: title },
    //   { name: 'og:description', content: description },
    //   { name: 'og:image', content: image },

    //   // Twitter Card Tags
    //   { name: 'twitter:card', content: 'summary' },
    //   { name: 'twitter:site', content: '@salpha037' },
    // ]);

    this.meta.updateTag({ name: 'author', content: title });
    this.meta.updateTag({ name: 'description', content: description });

    // Open Graph Tags
    this.meta.updateTag({ name: 'og:title', content: title });
    this.meta.updateTag({ name: 'og:description', content: description });
    this.meta.updateTag({ name: 'og:image', content: image });
    this.meta.updateTag({
      name: 'og:url',
      content: `https://orion.shubhranil.com${this.router.url}`,
    });

    // Twitter Card Tags
    this.meta.updateTag({ name: 'twitter:title', content: title });
    this.meta.updateTag({ name: 'twitter:description', content: description });
    this.meta.updateTag({ name: 'twitter:image', content: image });
    this.meta.updateTag({
      name: 'twitter:url',
      content: `https://orion.shubhranil.com${this.router.url}`,
    });
  }
}
