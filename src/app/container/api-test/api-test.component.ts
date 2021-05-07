import { Component, OnInit } from '@angular/core';
import { MangaService } from 'src/app/_services/manga.service';

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
      this.chapters = res?.results[0]?.relationships?.filter(
        (r: { type: string }) => r.type == 'chapter'
      ).map((c: { id: any; }) => c.id);
    });
  }
}
