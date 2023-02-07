import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormTaskComponent } from './form-task/form-task.component';
import { ListTasksComponent } from './list-tasks/list-tasks.component';

const routes: Routes = [
  { path: '', component: DashboardComponent},
  { path: 'tasks', component: ListTasksComponent},
  { path: 'tasks/new-task', component: FormTaskComponent},
  { path: 'tasks/edit-task/:id', component: FormTaskComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule { }
