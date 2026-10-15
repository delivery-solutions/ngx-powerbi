# Changelog

## 2.0.0 (2026-10-15)

Changes

- Built with Angular 22 (TypeScript 6, ng-packagr 22, ESLint 9 flat config)
- Still supports Angular 15+ consumers (peer range `>=15.0.0`): verified with Angular 15.2.10 and 22.1.7 apps
- `build_lib`/`build_lib_prod` rewrite the published input metadata to the pre-Angular 16 format (`scripts/downlevel-input-metadata.js`), because Angular 15 cannot read the newer format
- Component is explicitly `standalone: false`; no `changeDetection` is set because Angular 15's linker rejects `ChangeDetectionStrategy.Eager` (the template has no bindings, so behaviour is unchanged)
- Fixed `<ngx-powerbi-component>` failing to embed with "did not find any matching component": the `type` (default `ReportType.Report`) is now lowercased before it is passed to powerbi-client
- Removed the Protractor e2e setup (the builder no longer exists)
