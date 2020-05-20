import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ProfessorService } from '../shared/services/professores.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-professor',
  templateUrl: './professor.component.html',
  styleUrls: ['./professor.component.css']
})
export class ProfessorComponent implements OnInit {

  professores: any = [];
  professorId: string;
  p = 1;
  loading = false;
  constructor(
    private professorService: ProfessorService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getProfessores();
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
        await this.professorService.delete(id);
        this.toastr.success('Deletado com sucesso');
        return this.getProfessores();
      });

    } catch (error) {
      console.error(error);
      this.toastr.error('Erro ao deletar professor');
    }
  }

  async getProfessores() {
    try {
      this.loading = true;
      this.professores = await this.professorService.list();
    } catch (error) {
      this.loading = false;
      this.toastr.error('Error ao carregar professores');
    } finally {
      this.loading = false;
    }

  }
}
