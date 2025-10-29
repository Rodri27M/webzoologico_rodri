import { Component } from '@angular/core';
import { AnimalService } from '../../services/animal-service';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-animal-component',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './animal-component.html',
  styleUrl: './animal-component.css'
})
export class AnimalComponent {
animalList: any = [];
animalForm: FormGroup | any;
constructor (private animalService: AnimalService, 
  private formaBuilder: FormBuilder,
  private router: Router,
  private toastr: ToastrService) {}
getAllAnimals() {
  this.animalService.getAllAnimalsData().subscribe((data:{}) => {
    this.animalList = data;
 
  });
}
ngOnInit() {
  this.animalForm = this.formaBuilder.group({
      nombre: '',
      edad: 0,
      tipo: ''
  });
  this.getAllAnimals();
}
 newMessage(messageText: string) {
    this.toastr.success('Clic aquí para actualizar la lista', messageText)
      .onTap
      .pipe(take(1))
      .subscribe(() => window.location.reload());
  } 
  newAnimalEntry() {
    this.animalService.newAnimal(this.animalForm.value).subscribe(
      () => {
        //Redirigiendo a la ruta actual /inicio y recargando la ventana​
        this.router.navigate(['/inicio'])
        .then(() => {
          this.newMessage('Registro exitoso');
        })
      }
    );
  }
}
