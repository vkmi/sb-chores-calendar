import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarViewComponent } from './container/calendar-view/calendar-view.component';

const routes: Routes = [
  { path: 'calendar', component: CalendarViewComponent },
  { path: '**', redirectTo: 'calendar' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
