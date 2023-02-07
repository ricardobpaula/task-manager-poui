import { Component, OnInit } from '@angular/core';
import { PoChartSerie } from '@po-ui/ng-components';
import { TaskService } from '../services/task.service';

interface Resume {
  done: number
  undone: number
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public data: PoChartSerie[]
  public resume: Resume
  public categories: string[]
  public resumePizza: PoChartSerie[]

  constructor(private taskService: TaskService) {
    this.data = []
    this.resumePizza = []
    this.resume = { done: 0, undone: 0 }
    this.categories = ['Não feito', 'Feito']
  }

  ngOnInit(): void {
    this.taskService.resume()
      .subscribe(report => {
        this.resume = report.reduce((sum,act) => ({
          done: sum.done + act.done,
          undone: sum.undone + act.undone
        }), { done: 0, undone: 0 })

        this.data = report.map(period => ({
          label: period.period,
          data: [period.undone, period.done]
        }))

        this.resumePizza = [
          {label: 'Feito', data: this.resume.done},
          {label: 'Não feito', data: this.resume.undone}
        ]
      })
  }
}
