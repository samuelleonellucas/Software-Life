import { Component, OnInit } from "@angular/core";
import Swal from "sweetalert2";

@Component({
  selector: "app-aluno",
  templateUrl: "./aluno.component.html",
  styleUrls: ["./aluno.component.css"]
})
export class AlunoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  private showSweetAlert() {
    Swal.fire({
      title: '<strong>Você deseja excluir esse registro?</u></strong>',
      icon: 'warning',
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
    })
  }

}