import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {
  headerItems = [
    {
      name: 'Home',
      id: 1,
      redirectTo: '/home'
    },
    {
      name: 'Job Posting',
      id: 2,
      redirectTo: '/posting'
    },
    {
      name: 'Upcoming Seminars / Training',
      id: 3,
      redirectTo: '#'
    },
    {
      name: 'Company References',
      id: 4,
      redirectTo: '/company'
    },
    {
      name: 'Our Story',
      id: 5,
      redirectTo: '#'
    },
    {
      name: 'Society Contribution',
      id: 6,
      redirectTo: '#'
    },
    {
      name: 'Login',
      id: 7,
      redirectTo: '/login'
    },
    {
      name: 'Admin',
      id: 8,
      redirectTo: '/admin'
    }


  ]
  constructor() { }
  currentSection = 'section1';
  ngOnInit() {
  }

  scrollTo(section) {
    document.querySelector('#' + section)
    .scrollIntoView();
  }

  onSectionChange(sectionId: string) {
    this.currentSection = sectionId;
  }

}
