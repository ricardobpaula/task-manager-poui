import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PoBreadcrumb, PoPageAction, PoTableAction, PoTableColumn } from '@po-ui/ng-components';
import { Task } from '../models/task';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.css']
})
export class ListTasksComponent {

  public tasks: Task[]
  public columns: PoTableColumn[]
  public isLoading: boolean
  public pageActions: PoPageAction[]
  public tableActions: PoTableAction[]
  public breadcrumb: PoBreadcrumb

  constructor(
    private taskService: TaskService,
    private router: Router) {
    this.tasks = []
    this.isLoading = true

    this.columns = [
      { label: 'Nome', property: 'name', width: '70%'},
      { label: 'Concluido',property: 'done', type: 'boolean', width: '20%',
        boolean: { trueLabel: 'Concluido', falseLabel: 'Pendente' }
      }
    ]

    this.pageActions = [
      {
        label: 'Nova Tarefa',
        action: () => this.router.navigate(['/tasks/new-task']),
        icon: 'po-icon po-icon-plus-circle'}
    ]

    this.tableActions = [
      {
        label: 'Editar',
        icon: 'po-icon po-icon-edit',
        action:(row: any) => this.router.navigate(["tasks/edit-task",row.code])
      },
      {
        label: 'Excluir',
        icon: 'po-icon po-icon-delete',
        action:(row: any) => this.handleDelete(row.code)
      }
    ]

    this.breadcrumb = {
      items: [
        { label: 'Tarefas', link: '/tasks' }
      ]
    }
  }

  handleDelete(id: string) {
    this.isLoading = true
    this.taskService.delete(id)
      .subscribe({
        next: () => this.loadTasks()
      })
  }

  loadTasks() {
    this.taskService.list()
    .subscribe(tasks => {
      this.tasks = tasks
      this.isLoading = false
    })
  }

  async ngOnInit(): Promise<void> {
    this.loadTasks()
  }

}
