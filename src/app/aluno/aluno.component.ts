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
  alunoId: string;
  p = 1;
  loading = false;
  constructor(
    private alunoService: AlunosService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.getAlunos();
  }

  async delete(id) {
    try {
      Swal.fire({
        title: '<strong>Você deseja excluir esse registro?</u></strong>',
        icon: 'warning',
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
      }).then(async (result) => {
        if (!result.value) {
          return;
        }
        await this.alunoService.delete(id);
        this.toastr.success('Deletado com sucesso');
        return this.getAlunos();
      });

    } catch (error) {
      console.error(error);
      this.toastr.error('Erro ao deletar aluno');
    }
  }

  async getAlunos() {
    try {
      this.loading = true;
      this.alunos = await this.alunoService.list();
    } catch (error) {
      this.loading = false;
      console.error(error);
      this.toastr.error('Error ao carregar alunos');
    } finally {
      this.loading = false;
    }
  }
}
