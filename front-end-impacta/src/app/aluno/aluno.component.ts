import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { AlunosService } from '../shared/services/alunos.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-aluno',
  templateUrl: './aluno.component.html',
  styleUrls: ['./aluno.component.css']
})
export class AlunoComponent implements OnInit {

  alunos: any = [];
  constructor(
    private alunoService: AlunosService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.getAlunos();
  }

  private showSweetAlert() {
    Swal.fire({
      title: '<strong>Você deseja excluir esse registro?</u></strong>',
      icon: 'warning',
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
    });
  }
  async getAlunos() {
    try {
      this.alunos = await this.alunoService.list();
      this.toastr.success('Alunos');
    } catch (error) {

    }

  }

  // async create() {
  //   const res
  // }
}
