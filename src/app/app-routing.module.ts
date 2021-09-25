import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiTestComponent } from './container/api-test/api-test.component';
import { CalendarViewComponent } from './container/calendar-view/calendar-view.component';

const routes: Routes = [
  { path: '', component: CalendarViewComponent },
  { path: 'calendar', component: CalendarViewComponent },
  { path: 'manga', component: ApiTestComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
