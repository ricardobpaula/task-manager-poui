import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { ListTasksComponent } from './list-tasks/list-tasks.component';
import { PoPageDynamicSearchModule } from '@po-ui/ng-templates';
import { PoTableModule } from '@po-ui/ng-components';
import { PoPageModule } from '@po-ui/ng-components';
import { FormTaskComponent } from './form-task/form-task.component';


@NgModule({
  declarations: [
    ListTasksComponent,
    FormTaskComponent
  ],
  imports: [
    CommonModule,
    PoPageDynamicSearchModule,
    PoTableModule,
    PoPageModule,
    TasksRoutingModule
  ]
})
export class TasksModule { }
