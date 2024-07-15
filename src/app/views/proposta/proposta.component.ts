import { Component } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { propostaDados } from './propostaData';
import {MatExpansionModule} from '@angular/material/expansion';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-proposta',
  standalone: true,
  imports: [MatTableModule,MatExpansionModule],
  templateUrl: './proposta.component.html',
  styleUrl: './proposta.component.scss'
})


export class PropostaComponent {
  
  displayedColumns: string[] = [
    'ID da Proposta',
    'Nome/Razão Social do Cliente',
    'CPF/CNPJ do Cliente',
    'Produto',
    'Valor da Proposta',
    'Status da Proposta',
    'Sub-Status da Proposta (funil da mesa)',
    'SLA',
    'Analista Responsável',
    'Data Criação',
    'Criada Por (responsável)'
  ];
  dataSource = propostaDados;

  exportAsXLSX() {
    const worksheet = XLSX.utils.json_to_sheet(this.dataSource);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Propostas');
    XLSX.writeFile(workbook, 'propostas.xlsx');
  }
  
  exportAsCSV() {
    const csvData = this.convertToCSV(this.dataSource);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'propostas.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  convertToCSV(objArray: any[]): string {
    const header = Object.keys(objArray[0]).join(',') + '\n';
    const rows = objArray.map(obj => {
      return Object.values(obj).map(value => {
        return `"${value}"`;
      }).join(',');
    }).join('\n');
    return header + rows;
  }
}
