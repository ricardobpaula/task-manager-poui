import { Component } from '@angular/core';
import { PoTableAction, PoTableColumn } from '@po-ui/ng-components';
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
  public actions: PoTableAction[]

  constructor(private taskService: TaskService) {
    this.tasks = []
    this.isLoading = true
    this.columns = [
      { label: 'Nome', property: 'name', width: '70%'},
      { label: 'Concluido',property: 'done', type: 'boolean',
        boolean: { trueLabel: 'Concluido', falseLabel: 'Pendente' }
      }
    ]
    this.actions = [{
      label: 'Editar', icon: 'po-icon po-icon-edit', action: this.handleEdit.bind(this)
    }]
  }

  async ngOnInit(): Promise<void> {
    this.taskService.list()
      .subscribe(tasks => {
        this.tasks = tasks
        this.isLoading = false
      })
  }

  async handleEdit(task: Task) {
    alert(task.code)
  }
}
