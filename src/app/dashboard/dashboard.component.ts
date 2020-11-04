import { DashboardService } from './dashboard.service';
import { Component } from '@angular/core';

import {
  PoChartGaugeSerie,
  PoChartType,
  PoDialogService,
  PoDonutChartSeries,
  PoPieChartSeries,
} from '@po-ui/ng-components';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  topState: string;
  totalValue: string;
  moreStates = 0;
  overdue: PoChartGaugeSerie;

  overdueChartType: PoChartType = PoChartType.Gauge;

  writtenOffChartType: PoChartType = PoChartType.Donut;

  writtenOff: Array<PoDonutChartSeries>;

  pending: Array<PoPieChartSeries>;

  items: Array<any>;

  constructor(
    private poAlert: PoDialogService,
    private dashboardService: DashboardService
  ) {
    dashboardService.getOverdue().subscribe((response: any) => {
      const percent =
        100 - (response.items[0].overdue * 100) / response.items[0].writtenOff;
      this.overdue = {
        value: percent,
        description: `foram pagos sem atraso...`,
      };
    });
    dashboardService.getReceivable().subscribe((response: any) => {
      let topFlag = true;
      this.writtenOff = response.items
        .filter(({ location, total }) => {
          if (topFlag) {
            this.topState = location;
            this.totalValue = this.getFormattedPrice(total, 3);
            topFlag = false;
            return false;
          }
          return true;
        })
        .map(({ location, quantity, total }) => {
          return {
            category: location,
            value: quantity,
            tooltip: `${location}(${this.getFormattedPrice(total)})`,
          };
        });
    });
    dashboardService.getPending().subscribe((response: any) => {
      this.items = response.items.map((item) => {
        item.total = this.getFormattedPrice(item.total);
        return item;
      });
      this.pending = response.items
        .filter((_, index) => {
          if (response.items.length - index > 5) {
            this.moreStates++;
            return false;
          } else {
            return true;
          }
        })
        .map(({ location, quantity, total }) => {
          return {
            category: location,
            value: quantity,
            tooltip: `${location}(${total})`,
          };
        });
    });
  }

  getFormattedPrice(price: number, maximumSignificantDigits = 15): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumSignificantDigits,
    }).format(price);
  }

  searchMore(event: any): void {
    window.open(
      `http://google.com/search?q=PIB+no+estado+${event.category}`,
      '_blank'
    );
  }

  showMeTheDates(event: any): void {
    this.poAlert.alert({
      title: 'Detalhe',
      message: `Foram baixados ${event.value} títulos no estado ${event.category}!`,
      ok: () => {},
    });
  }
}
