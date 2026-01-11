import {
  ChangeDetectionStrategy,
  Component,
  contentChild,
  ElementRef,
  input,
  output,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-ui-text-input',
  imports: [ReactiveFormsModule],
  templateUrl: './text-input.html',
  styleUrl: './text-input.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiTextInput {
  protected readonly leftIcon = contentChild<ElementRef<HTMLElement>>('leftIcon');

  readonly class = input('');
  readonly inputClassName = input('');
  readonly placeholder = input<HTMLInputElement['placeholder']>();
  readonly autofocus = input<HTMLInputElement['autofocus']>();

  readonly formControl = input.required<FormControl>();

  protected readonly focus = output<FocusEvent>();
  protected readonly blur = output<FocusEvent>();
}
