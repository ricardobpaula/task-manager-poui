import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PoBreadcrumb, PoDialogService, PoPageAction, PoTableAction, PoTableColumn } from '@po-ui/ng-components';
import { PoPageDynamicSearchFilters } from '@po-ui/ng-templates';
import { Task } from '../models/task';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.css']
})
export class ListTasksComponent {

  public tasks: Task[]
  public taskFiltered: Task[]
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
    this.taskFiltered = []
    this.isLoading = true

    this.columns = [
      { label: 'Status', property: 'done', width: '15%',
        type: 'label',
          labels: [
            { value: true, color: 'color-11', label: 'Concluido',  },
            { value: false, color: 'color-08', label: 'Pendente' }
          ]
      },
      { label: 'Nome', property: 'name', width: '50%'},
      { label: 'Data', property: 'date', type: 'date', width: '25%' },
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
        action:(row: any) => this.handleUpdate(row)
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
    if (task.done) {
      return this.alertTaskDone()
    }

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

  handleUpdate(task: Task) {
    if (task.done) {
      return this.alertTaskDone()
    }

    this.router.navigate(["tasks/edit-task",task.code])
  }

  handleComplete({ code, date, description, name, done }: Task) {
    if (done) {
      return this.alertTaskDone()
    }

    this.isLoading = true
    this.alert.confirm({
      title: 'Concluir tarefa',
      message: `Tem certeza que deseja concluir tarefa: ${name}`,
      confirm: () => this.taskService.update({
        code, name, description, date, done: true
      },code || '')
          .subscribe({
            next: () => this.loadTasks()
          }),
      cancel: () => this.isLoading = false,
      literals: {confirm: 'Concluir', cancel: 'Cancelar'}
    })
  }

  alertTaskDone() {
      this.alert.alert({
        title: 'Tarefa concluida',
        message: 'Tarefa já está concluida!',
        literals: { ok: 'Confirmar' }
      })
  }

  loadTasks() {
    this.taskService.list()
    .subscribe(tasks => {
      this.tasks = tasks
      this.taskFiltered = this.tasks
      this.isLoading = false
    })
  }

  onQuickFilter(filter: string) {
    this.taskFiltered = filter
      ? this.tasks.filter(task => task.name.includes(filter))
      : this.tasks
  }

  async ngOnInit(): Promise<void> {
    this.loadTasks()
  }

  onChangeDisclaimers(disclaimers: any[]) {
    if (disclaimers.length === 0) {
      this.taskFiltered = this.tasks
    }
  }

}
