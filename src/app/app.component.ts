import { Component, OnInit } from '@angular/core';
import { CarService } from './services/car.service';
import { Car } from './models/car';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  filter: string = '';
  // Configuração da ordenação
  key: string = 'model'; // Define um valor padrão, para quando inicializar o componente
  reverse: boolean = false;
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }
  public paginaAtual = 1; // Dizemos que queremos que o componente quando carregar, inicialize na página 1.
  car = {} as Car;
  cars: Car[];


  constructor(private carService: CarService) { }

  ngOnInit() {
    this.getCars();
  }

  // defini se um carro será criado ou atualizado
  saveCar(form: NgForm) {
    if (this.car.id !== undefined) {
      this.carService.updateCar(this.car).subscribe(() => {
        this.cleanForm(form);
        alert('Registro atualizado com sucesso!');
      });
    } else {
      this.carService.saveCar(this.car).subscribe(() => {
        this.cleanForm(form);
        alert('Registro incluido com sucesso!');
      });
    }
  }

  // Chama o serviço para obtém todos os carros
  getCars() {
    this.carService.getCars().subscribe((cars: Car[]) => {
      this.cars = cars;
    });
  }

  // deleta um carro
  deleteCar(car: Car) {
    if (confirm("Deseja mesmo apagar o carro ID:" + car.id + " - " + car.model + "?")) {
      this.carService.deleteCar(car).subscribe(() => {
        this.getCars();
      });
    }
  }
    // copia o carro para ser editado.
    editCar(car: Car) {
      this.car = { ...car };
    }

    // limpa o formulario
    cleanForm(form: NgForm) {
      this.getCars();
      form.resetForm();
      this.car = {} as Car;
    }

  }