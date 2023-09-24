## Symbology

Use `normalize-file-names.sh` to change the file names of the symbols to all
lowercase and hyphens

use [https://www.npmjs.com/package/svg-symbol-sprite](svg-symbol-sprite (npm))
to generate the spritesheet:
```bash
npx svg-symbol-sprite \
    --input 'Symbology/All' \
    --output '../apps/strangereal-frontend/src/assets/symbology-sprite.svg' \
    --prefix 'symbology-'
```
