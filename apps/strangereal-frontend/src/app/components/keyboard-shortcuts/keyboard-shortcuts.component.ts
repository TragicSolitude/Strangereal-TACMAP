import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TableModule } from 'primeng/table';

export enum Modifier {
    Shift = 'shiftKey',
    Ctrl = 'ctrlKey',
    Alt = 'altKey'
}

export interface Keybind {
    key: keyof typeof KEYNAMES;
    modifiers?: Modifier[],
    description: string;
    onKeyDown?: (event: KeyboardEvent) => void | Promise<void>;
    onKeyUp?: (event: KeyboardEvent) => void | Promise<void>;
}

@Component({
    selector: 'strangereal-keyboard-shortcuts',
    standalone: true,
    imports: [CommonModule, TableModule],
    templateUrl: './keyboard-shortcuts.component.html',
    styleUrls: ['./keyboard-shortcuts.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KeyboardShortcutsComponent {
    keynames = KEYNAMES;
    keybinds: Keybind[];

    constructor(public readonly dialogRef: DynamicDialogRef,
                public readonly config: DynamicDialogConfig) {

        const { keybinds } = config.data;
        if (!keybinds) {
            throw new Error('Must provide keybinds to help component');
        }

        this.keybinds = keybinds;
    }

    formatModifiers(modifiers: Modifier[]): string[] {
        return modifiers
            .map(modifier => {
                switch (modifier) {
                    case Modifier.Shift: return 'Shift';
                    case Modifier.Ctrl: return 'Ctrl';
                    case Modifier.Alt: return 'Alt';
                }
            });
    }

    formatKey(keybind: Keybind): string {
        let keys = [] as string[];
        if (keybind.modifiers) {
            keys = keys.concat(this.formatModifiers(keybind.modifiers));
        }

        keys.push(KEYNAMES[keybind.key]);

        return keys.join(' + ');
    }
}

export const KEYNAMES = {
    Escape: 'Escape',
    Digit1: '1',
    Digit2: '2',
    Digit3: '3',
    Digit4: '4',
    Digit5: '5',
    Digit6: '6',
    Digit7: '7',
    Digit8: '8',
    Digit9: '9',
    Digit0: '0',
    Minus: '-',
    Equal: '=',
    Backspace: 'Backspace',
    Tab: 'Tab',
    KeyQ: 'Q',
    KeyW: 'W',
    KeyE: 'E',
    KeyR: 'R',
    KeyT: 'T',
    KeyY: 'Y',
    KeyU: 'U',
    KeyI: 'I',
    KeyO: 'O',
    KeyP: 'P',
    BracketLeft: '[',
    BracketRight: ']',
    Enter: 'Enter',
    ControlLeft: 'Left Ctrl',
    KeyA: 'A',
    KeyS: 'S',
    KeyD: 'D',
    KeyF: 'F',
    KeyG: 'G',
    KeyH: 'H',
    KeyJ: 'J',
    KeyK: 'K',
    KeyL: 'L',
    Semicolon: ';',
    Quote: '\'',
    Backquote: '`',
    ShiftLeft: 'Left Shift',
    Backslash: '\\',
    KeyZ: 'Z',
    KeyX: 'X',
    KeyC: 'C',
    KeyV: 'V',
    KeyB: 'B',
    KeyN: 'N',
    KeyM: 'M',
    Comma: ',',
    Period: '.',
    Slash: '/',
    ShiftRight: 'Right Shift',
    NumpadMultiply: '',
    AltLeft: 'Left Alt',
    AltRight: 'Right Alt',
    Space: 'Space',
    CapsLock: 'Caps Lock',
    // TODO Function keys
} as const;
