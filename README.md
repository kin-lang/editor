# Kin online editor (experimental)

Web playground for [Kin](https://github.com/kin-lang/kin).

## Notes

- The playground runs a **single buffer** in the browser.
- Multi-file modules (`koresha "…" nka alias` / `emerera_gukoresha`) need the **CLI**
  (`kin run entry.kin`) so files can be loaded from disk. See `examples/importing/`
  in the language repo and the [Modules](https://kinlang.vercel.app/docs/language-structure/Modules) docs.
- Typed samples and OOP/`ubwoko` printing are aligned with recent Kin releases when
  `@kin-lang/kin` is updated in this package.
