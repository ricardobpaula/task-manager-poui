import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { ListTasksComponent } from './list-tasks/list-tasks.component';
import { PoPageDynamicSearchModule } from '@po-ui/ng-templates';
import { PoTableModule } from '@po-ui/ng-components';


@NgModule({
  declarations: [
    ListTasksComponent
  ],
  imports: [
    CommonModule,
    PoPageDynamicSearchModule,
    PoTableModule,
    TasksRoutingModule
  ]
})
export class TasksModule { }
