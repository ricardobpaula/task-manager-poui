import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { ListTasksComponent } from './list-tasks/list-tasks.component';
import { PoPageDynamicSearchModule } from '@po-ui/ng-templates';
import { PoDynamicModule, PoNotificationModule, PoTableModule, PoChartModule, PoWidgetModule  } from '@po-ui/ng-components';
import { PoPageModule } from '@po-ui/ng-components';
import { FormTaskComponent } from './form-task/form-task.component';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  declarations: [
    ListTasksComponent,
    FormTaskComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    PoPageDynamicSearchModule,
    PoTableModule,
    PoPageModule,
    PoDynamicModule,
    PoNotificationModule,
    TasksRoutingModule,
    PoChartModule,
    PoWidgetModule
  ]
})
export class TasksModule { }
