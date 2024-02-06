import {Component} from '@angular/core';
import {ManagerService} from "../_services/manager.service";

@Component({
  selector: 'app-driver-info',
  templateUrl: './driver-info.component.html',
  styleUrl: './driver-info.component.css'
})
export class DriverInfoComponent {

  constructor(private managerService: ManagerService) {
  }
}
