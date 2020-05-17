import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { AlunosService } from '../shared/services/alunos.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-aluno',
  templateUrl: './aluno.component.html',
  styleUrls: ['./aluno.component.css']
})
export class AlunoComponent implements OnInit {

  alunos: any = [];
  alunoId: string;

  constructor(
    private alunoService: AlunosService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getAlunos();
   }

  showSweetAlert() {
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
    } catch (error) {
      this.toastr.error('Error ao carregar alunos');
    }

  }
}
