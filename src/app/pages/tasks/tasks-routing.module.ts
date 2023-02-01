import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormTaskComponent } from './form-task/form-task.component';
import { ListTasksComponent } from './list-tasks/list-tasks.component';

const routes: Routes = [
  { path: '', component: ListTasksComponent},
  { path: 'new-task', component: FormTaskComponent},
  { path: 'edit-task/:id', component: FormTaskComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule { }
