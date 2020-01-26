import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-highlighter',
  templateUrl: './highlighter.component.html',
  styleUrls: ['./highlighter.component.scss']
})
export class HighlighterComponent implements OnInit, AfterViewInit {

  highlightedTextDiv: string;

  highlightedText: { [key: string]: { showText: boolean, text: Array<string> } } = {};

  Color = Color;
  colors: Array<Color> = [Color.RED, Color.YELLOW, Color.GREEN];

  @ViewChild('sourceTextArea', {static: false})
  private sourceTextArea: ElementRef<HTMLTextAreaElement>;

  // @ViewChild('targetTextArea', {static: false})
  // private targetTextArea: TemplateRef<HTMLTextAreaElement>;

  constructor() {
  }

  ngOnInit(): void {
    this.highlightedText[Color.RED] = {showText: true, text: []};
    this.highlightedText[Color.YELLOW] = {showText: true, text: []};
    this.highlightedText[Color.GREEN] = {showText: true, text: []};
  }

  ngAfterViewInit(): void {
    this.sourceTextArea.nativeElement.addEventListener('keyup', (text) => {
      this.textAreaChange();
    });
  }

  textAreaChange(): void {
    this.highlightedTextDiv = this.sourceTextArea.nativeElement.value;
  }

  highlightText = () => {
    return (color: Color): void => {
      if (this.sourceTextArea.nativeElement.value) {
        const selectedText: string =
          this.sourceTextArea.nativeElement.value.substring(
            this.sourceTextArea.nativeElement.selectionStart,
            this.sourceTextArea.nativeElement.selectionEnd
          );
        this.highlightedText[color].text.push(selectedText);

        const highlightedElement = `<span class='${color.toString().toLowerCase()}'>${selectedText}</span>`;
        const position: number = this.highlightedTextDiv.indexOf(selectedText, this.sourceTextArea.nativeElement.selectionStart);
        this.highlightedTextDiv = this.highlightedTextDiv.substring(0, position) + highlightedElement + this.highlightedTextDiv.substring(position + selectedText.length);
      }
    };
  };

  showText = () => {
    return (color: Color): void => {
      this.highlightedText[color].showText = !this.highlightedText[color].showText;
    };
  };

  getHighlightedText(): string {
    return Object.values(this.highlightedText)
      .filter(color => color.showText)
      .map(color => color.text.join('')).join('');
  }
}

enum Color {
  RED = 'RED',
  YELLOW = 'YELLOW',
  GREEN = 'GREEN'
}
