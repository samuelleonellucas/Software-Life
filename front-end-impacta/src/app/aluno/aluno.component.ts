import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-aluno',
  templateUrl: './aluno.component.html',
  styleUrls: ['./aluno.component.css']
})
export class AlunoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  pickDate() {

  }

  maskTelefone(){
    $(document).ready(function(){
    $('#telefone').mask('(00) 0000-0000');
});
}

}