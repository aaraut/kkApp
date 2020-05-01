import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {

  teamDetails = [
    {
      name: 'Lorem Ipsum',
      gender: 'm',
      skillSet: 'Full Stack Dev',
      desc: "Sachin is an IIT Roorkee grad, ex-Googler and now heads Sales/Marketing/Operations at HackerEarth. Being a developer by skill he continues to code in small amount. He is deeply passionate about his work and is a fitness freak."
    },
    {
      name: 'Lorem Ipsum',
      gender: 'm',
      skillSet: 'Full Stack Dev',
      desc: "Sachin is an IIT Roorkee grad, ex-Googler and now heads Sales/Marketing/Operations at HackerEarth. Being a developer by skill he continues to code in small amount. He is deeply passionate about his work and is a fitness freak." 
    },
    {
      name: 'Lorem Ipsum',
      gender: 'm',
      skillSet: 'Full Stack Dev',
      desc: "Rahul is a designer at HackerEarth and he loves to make things easy and usable. Before joining  HackerEarth he worked at SignEasy & Launchyard. In his  free time you'll find him sketching and he is very fond of movies."
    },
    {
      name: 'Lorem Ipsum',
      gender: 'm',
      skillSet: 'Full Stack Dev',
      desc: "Virendra Jain is a graduate from IIT Roorkee and works as a Software Developer. Apart from work, he likes listening to bollywood music, travelling , playing badminton and following sports."
    },
    {
      name: 'Lorem Ipsum',
      gender: 'm',
      skillSet: 'Full Stack Dev',
      desc: "Aishwarya is a Software Engineer at HackerEarth, likes to learn and experiment with more technologies. Apart from technologies she also loves to experiment with fusion cooking and exploring places for good food."
    },
    {
      name: 'Lorem Ipsum',
      gender: 'm',
      skillSet: 'Full Stack Dev',
      desc: "Jasmine is an MBA in Marketing and IT and works as an Inside Sales Professional. Apart from having a motivational interest in sales functions; she also has a keen interest in social welfare activities and works with different NGOs."
    },
  ]
  constructor() { }

  ngOnInit() {
  }
  

}
