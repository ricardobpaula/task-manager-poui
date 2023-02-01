import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PoBreadcrumb, PoDialogService, PoPageAction, PoTableAction, PoTableColumn } from '@po-ui/ng-components';
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
    private router: Router,
    private alert: PoDialogService) {
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
        label: 'Concluir',
        icon: 'po-icon po-icon-ok',
        action:(row: any) => this.handleComplete(row)
      },
      {
        label: 'Editar',
        icon: 'po-icon po-icon-edit',
        action:(row: any) => this.router.navigate(["tasks/edit-task",row.code])
      },
      {
        label: 'Excluir',
        icon: 'po-icon po-icon-delete',
        action:(row: any) => this.handleDelete(row)
      }
    ]

    this.breadcrumb = {
      items: [
        { label: 'Tarefas', link: '/tasks' }
      ]
    }
  }

  handleDelete(task: Task) {
    this.isLoading = true
    this.alert.confirm({
      title: 'Excluir tarefa',
      message: `Tem certeza que deseja excluir tarefa: ${task.name}`,
      confirm: () => this.taskService.delete(task.code || '')
          .subscribe({
            next: () => this.loadTasks()
          }),
      cancel: () => this.isLoading = false,
      literals: {confirm: 'Excluir', cancel: 'Cancelar'}
    })
  }

  handleComplete(task: Task) {
    if (task.done) {
      return this.alert.alert({
        title: 'Tarefa concluida',
        message: 'Tarefa já está concluida!',
        literals: { ok: 'Confirmar' }
      })
    }

    this.isLoading = true
    this.alert.confirm({
      title: 'Concluir tarefa',
      message: `Tem certeza que deseja concluir tarefa: ${task.name}`,
      confirm: () => this.taskService.update({
        code: task.code,
        name: task.name,
        description: task.description,
        done: true
      },task.code || '')
          .subscribe({
            next: () => this.loadTasks()
          }),
      cancel: () => this.isLoading = false,
      literals: {confirm: 'Concluir', cancel: 'Cancelar'}
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
