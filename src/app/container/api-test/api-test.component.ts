import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { concatAll, concatMap, delay } from 'rxjs/operators';
import { Manga, MangaService } from 'src/app/_services/manga.service';

@Component({
  selector: 'app-api-test',
  templateUrl: './api-test.component.html',
  styleUrls: ['./api-test.component.scss'],
})
export class ApiTestComponent implements OnInit {
  username: string = '';
  password: string = '';
  title = '';
  chapters = [];
  matches: Manga[];

  isLoggedIn = false;

  constructor(private mangadex: MangaService) {}

  ngOnInit(): void {}

  login() {
    this.mangadex.login(this.username, this.password).subscribe((res) => {
      console.log(res);

      this.isLoggedIn = true;
    });
  }

  searchManga() {
    this.mangadex.getMangaByTitle(this.title).subscribe((res) => {
      this.matches = res;
    });
  }

  async getMangaChapters(index) {
    this.chapters = [];

    // const chaptersIds = this.matches[i].relationships
    //   ?.filter((r) => r.type == 'chapter')
    //   .map((c) => c.id);
    const chaptersObs = this.matches[index].relationships
      ?.filter((r) => r.type == 'chapter')
      .map((c) => this.mangadex.getChapterById(c.id));

    let i = 0;
    of([...chaptersObs])
      .pipe(
        concatAll(),
        concatMap((x) => of(x).pipe(delay(200)))
      )
      .subscribe((res) =>
        res.subscribe((r) => {
          console.log('got chapter', r);
          this.chapters = [...this.chapters, r];
          i++;
          if (i == chaptersObs.length) {
            this.chapters.sort(this.mangadex.compareChapters);
            console.log(this.chapters.map((c) => c.data.attributes.chapter));
          }
        })
      );

    // for (const [index, id] of chaptersIds.entries()) {

    //   this.mangadex.getChapterById(id).subscribe((res) => {
    //     console.log('got chapter', index, res);
    //     this.chapters = [...this.chapters, res];
    //     if (index === chaptersIds.length - 1) {
    //       this.chapters.sort(this.mangadex.compareChapters);
    //       console.log(this.chapters.map((c) => c.data.attributes.chapter));
    //     }
    //   });
    // }
  }
}
