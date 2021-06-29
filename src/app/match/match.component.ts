import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Definition } from '../models/definition.model';
import { Word } from '../models/word.model';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss'],
})
export class MatchComponent implements OnInit {
  selectedWord: string | null = null;

  words: Word[] = [
    { displayName: 'Deserunt', selected: false, assigned: false },
    { displayName: 'Consequuntur', selected: false, assigned: false },
    { displayName: 'Explicabo', selected: false, assigned: false },
    { displayName: 'Reiciendis', selected: false, assigned: false },
    { displayName: 'Perspiciatis', selected: false, assigned: false },
    { displayName: 'Necessitatibus', selected: false, assigned: false },
    { displayName: 'Repudiandae', selected: false, assigned: false },
    { displayName: 'Cumque', selected: false, assigned: false },
    { displayName: 'Esse', selected: false, assigned: false },
    { displayName: 'Cupiditate', selected: false, assigned: false },
    { displayName: 'Blanditiis ', selected: false, assigned: false },
    { displayName: 'Temporibus', selected: false, assigned: false },
    { displayName: 'Quaerat', selected: false, assigned: false },
    { displayName: 'Laboriosam', selected: false, assigned: false },
    { displayName: 'Architecto', selected: false, assigned: false },
    { displayName: 'Repellendus', selected: false, assigned: false },
    { displayName: 'Numquam', selected: false, assigned: false },
    { displayName: 'Cupiditate', selected: false, assigned: false },
    { displayName: 'Upiditate', selected: false, assigned: false },
    { displayName: 'Voluptatem', selected: false, assigned: false },
  ];

  defs: Definition[] = [
    {
      definition:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt velit perferendis. Sapiente vel eum harum.',
      assignedWord: '',
    },
    {
      definition:
        'est reiciendis quo magnam iure. Reiciendis numquam autem deleniti suscipit, cum eum eveniet magni tenetur',
      assignedWord: '',
    },
    {
      definition:
        'odit doloremque accusamus doloribus quibusdam repellat distinctio consequuntur? Quis fugiat omnis, aliquam sunt nulla nesciunt',
      assignedWord: '',
    },
    {
      definition:
        'Minus dolorem illum, vero est voluptates adipisci, exercitationem in laudantium a maiores dolore deleniti, quaerat',
      assignedWord: '',
    },
    {
      definition:
        'placeat rerum. Quisquam quas quibusdam accusantium. Accusamus earum architecto corporis optio maiores, blanditiis omnis cux!',
      assignedWord: '',
    },
    {
      definition:
        'Deserunt, ad eveniet expedita suscipit ratione, perferendis esse facilis, omnis iste eius fuga ea quibusdam',
      assignedWord: '',
    },
    {
      definition:
        'natus debitis ducimus dicta cumque beatae culpa numquam nisi possimus asperiores? Cupiditate corporis asperiores vitae.',
      assignedWord: '',
    },
    {
      definition:
        'Repudiandae quasi quam nemo rerum necessitatibus molestiae eaque aspernatur odio laborum, reiciendis minima illo perspiciatis',
      assignedWord: '',
    },
    {
      definition:
        'tempore ea consequuntur ad sequi impedit. Vitae iure, quas recusandae labore numquam facere? Odit, fuga.',
      assignedWord: '',
    },
    {
      definition:
        'Libero suscipit voluptates recusandae non nisi assumenda enim sed dignissimos commodi, minima ipsa illo totam',
      assignedWord: '',
    },
    {
      definition:
        'Liste quo. In hic, nesciunt, tempora sunt repudiandae voluptatum perspiciatis accusantium aperiam ullam at ea.',
      assignedWord: '',
    },
    {
      definition:
        'Non, illum dicta. Asperiores culpa sunt ullam inventore saepe doloribus quae itaque maxime quo in',
      assignedWord: '',
    },
    {
      definition:
        'Hic accusantium deserunt labore dolorem similique, dolore repudiandae quis, ratione sapiente soluta error consectetur adipisci.',
      assignedWord: '',
    },
    {
      definition:
        'Earum minima natus mollitia repellendus nemo est deleniti quisquam eligendi nobis. Ratione et in beatae',
      assignedWord: '',
    },
    {
      definition:
        'Cupiditate, blanditiis nihil voluptatum quisquam, assumenda sunt voluptas eius voluptates doloremque, inventore consequatur id hic.',
      assignedWord: '',
    },
    {
      definition:
        'Eos aperiam eligendi est, repudiandae voluptatem, sed temporibus ut ratione molestias et numquam amet fugit',
      assignedWord: '',
    },
    {
      definition:
        'Obcaecati, quisquam ipsam recusandae aspernatur iste eum! Hic omnis rem est consequatur ut incidunt et.',
      assignedWord: '',
    },
    {
      definition:
        'Obcaecati eos, consequatur consectetur sint deserunt, saepe ea, facilis adipisci praesentium nam sunt. Fugit incidunt',
      assignedWord: '',
    },
    {
      definition:
        'Quo voluptas, ea, earum non ut, deleniti odio velit consectetur totam eius. Fugit, magnam praesentium?',
      assignedWord: '',
    },
    {
      definition:
        'Eaque fuga cupiditate, at ex tenetur mollitia iste dolore? Quas consequuntur porro corrupti blanditiis illo',
      assignedWord: '',
    },
    {
      definition:
        'Asperiores est distinctio perspiciatis, eum doloremque? Repellendus autem atque, voluptate nesciunt veritatis totam dolorum eius.',
      assignedWord: '',
    },
    {
      definition:
        'Itaque reiciendis, aspernatur quasi ratione sum, magnam blanditiis atque accusantium, cupiditate nobis in vel eum',
      assignedWord: '',
    },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {}

  selectWord(word: string): void {
    this.selectedWord = null;

    this.words.forEach((x) => {
      if (x.displayName === word) {
        this.selectedWord = word;
        x.selected = true;
      } else {
        x.selected = false;
      }
    });
  }

  assignWord(def: Definition): void {
    if (this.selectedWord) {
      def.assignedWord = this.selectedWord;

      this.words.forEach((x) => {
        if (x.displayName === this.selectedWord) {
          x.assigned = true;
          x.selected = false;
        }

        x.selected = false;
      });

      this.selectedWord = null;
    }
  }

  unassignWord(def: Definition): void {
    const word = this.words.find((x) => x.displayName === def.assignedWord);

    if (word) {
      word.assigned = false;
      def.assignedWord = null;
    }
  }

  submitted(): void {
    this.router.navigate(['/match-finish']);
  }
}
