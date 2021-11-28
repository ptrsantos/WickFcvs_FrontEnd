import { FormGroup, FormControl } from '@angular/forms';
import { Component, Input, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';




@Component({
  selector: 'app-ckeditor',
  templateUrl: './ckeditor.component.html',
  styleUrls: ['./ckeditor.component.css']
})
export class CkeditorComponent implements OnInit {

  @Input() conteudoExterno: string = "";
  @Input() conteudoParams: string;
  ckEditorForm: FormGroup
  ckeConfig: any;
  ckEditorConteudo: string;
  log: string = '';
  @Output() enviarConteudoEditor = new EventEmitter<any>();
  // @ViewChild(CKEditorComponent) ckEditor: CKEditorComponent;
  // @ViewChild('editor') editor: CKEditorComponent;
 

  name = 'Angular 4';
  config = {
   uiColor: '#ffffff',
   toolbar: [
    { name: 'document', groups: [ 'mode', 'document', 'doctools' ], items: [ 'Source', '-', 'Save', 'NewPage', 'ExportPdf', 'Preview', 'Print', '-', 'Templates' ] },
    { name: 'clipboard', groups: [ 'clipboard', 'undo' ], items: [ 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo' ] },
    { name: 'editing', groups: [ 'find', 'selection', 'spellchecker' ], items: [ 'Find', 'Replace', '-', 'SelectAll', '-', 'Scayt' ] },
    { name: 'forms', items: [ 'Form', 'Checkbox', 'Radio', 'TextField', 'Textarea', 'Select', 'Button', 'ImageButton', 'HiddenField' ] },
    '/',
    { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ], items: [ 'Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'CopyFormatting', 'RemoveFormat' ] },
    { name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ], items: [ 'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', 'CreateDiv', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'BidiLtr', 'BidiRtl', 'Language' ] },
    { name: 'links', items: [ 'Link', 'Unlink', 'Anchor' ] },
    { name: 'insert', items: [ 'Image', 'Flash', 'Table', 'HorizontalRule', 'Smiley', 'SpecialChar', 'PageBreak', 'Iframe' ] },
    '/',
    { name: 'styles', items: [ 'Styles', 'Format', 'Font', 'FontSize' ] },
    { name: 'colors', items: [ 'TextColor', 'BGColor' ] },
    { name: 'tools', items: [ 'Maximize', 'ShowBlocks' ] },
    { name: 'others', items: [ '-' ] },
    { name: 'about', items: [ 'About' ] }
   ],
   toolbarGroups: 
   [
    // { name: 'clipboard', groups: ['clipboard', 'undo'] },
    // { name: 'editing', groups: ['find', 'selection', 'spellchecker'] },
    // { name: 'links' }, { name: 'insert' },
    // { name: 'document', groups: ['mode', 'document', 'doctools'] },
    // { name: 'basicstyles', groups: ['basicstyles', 'cleanup'] },
    // { name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align'] },
    // { name: 'styles' },
    // { name: 'colors' }

    { name: 'document', groups: [ 'mode', 'document', 'doctools' ] },
    { name: 'clipboard', groups: [ 'clipboard', 'undo' ] },
    { name: 'editing', groups: [ 'find', 'selection', 'spellchecker' ] },
    { name: 'forms' },
    '/',
    { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
    { name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ] },
    { name: 'links' },
    { name: 'insert' },
    '/',
    { name: 'styles' },
    { name: 'colors' },
    { name: 'tools' },
    { name: 'others' },
    { name: 'about' }

  ],
   skin: 'kama',
   resize_enabled: false,
   removePlugins: 'elementspath,save,magicline',
   extraPlugins: 'divarea,smiley,justify,indentblock,colordialog',
   colorButton_foreStyle: {
      element: 'font',
      attributes: { 'color': '#(color)' }
   },
   height: 500,
   removeDialogTabs: 'image:advanced;link:advanced',
   //removeButtons: 'Subscript,Superscript,Anchor,Source,Table',
   removeButtons: 'Preview',
   format_tags: 'p;h1;h2;h3;pre;div',
   tabSpaces: 5
}


  public model: any = {};

  constructor(private spinnerService: NgxSpinnerService,) {
  }
  
  ngOnInit(): void {
    
    this.ckEditorConteudo = this.conteudoParams;
    this.ckEditorForm = new FormGroup({
      conteudo: new FormControl(this.ckEditorConteudo, [])
    })
  }

  ngAfterViewInit(){
    // let elemento = document.querySelector('.cke_contents')
    // elemento.setAttribute('style', 'height: 100px')
    
  }
  
  ngAfterViewChecked() {
    // setInterval(function(){ 
    //   this.spinnerService.hide();
    // }, 4000);

    setTimeout(() => {
      this.ocultarSpinner();
    }, 4000); 
    
  }
  
  ocultarSpinner(){
    this.spinnerService.hide();
  }
  
  onEditorChange(event){

  }

  onChange(event: any): void {
    
  }

  salvarEdicao(){
    this.enviarConteudoEditor.emit(this.ckEditorForm.controls.conteudo.value);
  }



}
