import { Injectable } from "@angular/core";
import { DialogService } from "primeng/dynamicdialog";
import { KeyboardShortcutsComponent, Keybind, Modifier } from "./keyboard-shortcuts.component";

// Re-export types from component
export { Keybind, Modifier };

// TODO figure out how to avoid so many peer dependencies (both DI and modules)

// TODO maybe use some kind of global "actions" with the keybinds
// -_- probably just NGXS at that point

/**
 * To inject:
 * ```typescript
 * imports: [KeyboardShortcutsComponent],
 * providers: [DialogService, KeyboardShortcutsService]
 * ```
 */
@Injectable()
export class KeyboardShortcutsService {
    private keybinds!: Keybind[];

    constructor(private readonly dialogService: DialogService) {}

    register(keybinds: Keybind[]): void {
        this.keybinds = keybinds;
        console.log('Registered keybinds', keybinds);
    }

    // TODO unify key handling a bit or something idk
    async keyDown(event: KeyboardEvent): Promise<void> {
        if (document.activeElement instanceof HTMLInputElement) {
            // Don't want to do anything here if an input element is focused
            // (and presumably the user is typing)
            return;
        }

        if (!this.keybinds) {
            console.info('Attempted to handle key before registering keybinds');
            return;
        }

        const keybind = this.keybinds.find(keybind => keybind.key === event.code);
        if (!keybind || !keybind.onKeyDown) {
            return;
        }

        for (const modifier of Object.values(Modifier)) {
            const keybindHasModifier = Boolean(keybind.modifiers?.includes(modifier));

            // XOR
            if (event[modifier] !== keybindHasModifier) {
                return;
            }
        }

        // Override any other actions bound to this key
        event.preventDefault();

        const result = keybind.onKeyDown(event);
        if (result instanceof Promise) {
            await result;
        }
    }

    async keyUp(event: KeyboardEvent): Promise<void> {
        if (document.activeElement instanceof HTMLInputElement) {
            // Don't want to do anything here if an input element is focused
            // (and presumably the user is typing)
            return;
        }

        if (!this.keybinds) {
            console.info('Attempted to handle key before registering keybinds');
            return;
        }

        const keybind = this.keybinds.find(keybind => keybind.key === event.code);
        if (!keybind || !keybind.onKeyUp) {
            return;
        }

        for (const modifier of Object.values(Modifier)) {
            const keybindHasModifier = Boolean(keybind.modifiers?.includes(modifier));

            // XOR
            if (event[modifier] !== keybindHasModifier) {
                return;
            }
        }

        // Override any other actions bound to this key
        event.preventDefault();

        const result = keybind.onKeyUp(event);
        if (result instanceof Promise) {
            await result;
        }
    }

    showHelp(): void {
        if (!this.keybinds) {
            throw new Error('Attempted to handle key before registering keybinds');
        }

        this.dialogService.open(KeyboardShortcutsComponent, {
            data: { keybinds: this.keybinds },
            header: 'Keyboard Shortcuts',
            width: '28em',
            closeOnEscape: true
        });
    }
}
