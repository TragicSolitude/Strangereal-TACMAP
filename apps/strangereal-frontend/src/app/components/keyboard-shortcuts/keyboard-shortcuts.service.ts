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
    keyDown(event: KeyboardEvent): Promise<void> {
        if (!this.keybinds) {
            throw new Error('Attempted to handle key before registering keybinds');
        }

        const keybind = this.keybinds.find(keybind => keybind.key === event.code);
        if (!keybind || !keybind.onKeyDown) {
            return Promise.resolve();
        }

        if (keybind.modifiers) {
            for (const modifier of keybind.modifiers) {
                if (!event[modifier]) {
                    return Promise.resolve();
                }
            }
        }

        try {
            const result = keybind.onKeyDown(event);
            if (result instanceof Promise) {
                return result;
            }

            return Promise.resolve(result);
        } catch (e) {
            return Promise.reject(e);
        }
    }

    keyUp(event: KeyboardEvent): Promise<void> {
        if (!this.keybinds) {
            throw new Error('Attempted to handle key before registering keybinds');
        }

        const keybind = this.keybinds.find(keybind => keybind.key === event.code);
        if (!keybind || !keybind.onKeyUp) {
            return Promise.resolve();
        }

        if (keybind.modifiers) {
            for (const modifier of keybind.modifiers) {
                if (!event[modifier]) {
                    return Promise.resolve();
                }
            }
        }

        try {
            const result = keybind.onKeyUp(event);
            if (result instanceof Promise) {
                return result;
            }

            return Promise.resolve(result);
        } catch (e) {
            return Promise.reject(e);
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
