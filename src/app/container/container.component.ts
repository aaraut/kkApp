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
      redirectTo: '#'
    },
    {
      name: 'Job Posting',
      id: 2,
      redirectTo: '#'
    },
    {
      name: 'Upcoming Seminars / Training',
      id: 3,
      redirectTo: '#'
    },
    {
      name: 'Company References',
      id: 4,
      redirectTo: '#'
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
      name: 'Admin',
      id: 7,
      redirectTo: '#'
    },
    {
      name: '',
      id: 8,
      redirectTo: '#'
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
