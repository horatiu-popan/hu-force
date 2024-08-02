import { Component } from '@angular/core';
import { CompanyService } from '../company/service/company.service';
import { Company } from '../company/model/company.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  title: string = "HuForce";
}
