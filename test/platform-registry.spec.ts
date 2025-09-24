import { IFileDialog } from './../src/core/file-dialog';
import { FileDialogDesktop } from './../src/platforms/desktop/file-dialog-desktop';
import { FileDialogNative } from './../src/platforms/native/file-dialog-native';
import { describe, it, expect } from 'vitest';
import { DI, Registration } from 'aurelia';
import { PlatformRegistry } from '../src/core/platform-registry';

// --- Test fixtures ----------------------------------------------------------

// interface IFileDialog {
//   open(opts?: any): Promise<any>;
// }
// const IFileDialog = DI.createInterface<IFileDialog>('IFileDialog');

// class FileDialogNative implements IFileDialog {
//   open(opts?: any) { return Promise.resolve({ impl: 'native', opts }); }
// }
// class FileDialogDesktop extends FileDialogNative {
//   open(opts?: any) { return Promise.resolve({ impl: 'desktop', opts }); }
// }
// class FileDialogMobile extends FileDialogNative {
//   open(opts?: any) { return Promise.resolve({ impl: 'mobile', opts }); }
// }

// Helper to materialize what would be passed to Aurelia's au.register(...)
function flattenRegistry(r: PlatformRegistry): unknown[] {
  return [
    ...r.namedRegistrations.values(),
    ...r.registrations,
  ];
}

// Small helper to get constructor name safely
function ctorName(obj: any) {
  return obj?.constructor?.name;
}

describe('PlatformRegistry unshift override strategy', () => {

  it('Desktop overrides Native for container.get', () => {
    const reg = new PlatformRegistry()
      .withRegistrations([
        Registration.singleton(IFileDialog, FileDialogNative),
      ])
      .withRegistrations([
        Registration.singleton(IFileDialog, FileDialogDesktop),
      ]);

    // Order check: unshift means Desktop registration is first
    const flattened = flattenRegistry(reg);
    expect(flattened.length).toBe(2);

    // Register into DI container
    const container = DI.createContainer();
    container.register(...flattened);

    const resolved = container.get(IFileDialog);
    expect(ctorName(resolved)).toBe('FileDialogDesktop');

    const all = container.getAll(IFileDialog);
    expect(all.map(ctorName)).toEqual(['FileDialogDesktop', 'FileDialogNative']);
  });

  it('Instance registration gets shadowed by later singleton (override by order)', () => {
    const nativeInstance = { tag: 'native-instance' };

    const reg = new PlatformRegistry()
      .withRegistrations([
        Registration.instance(IFileDialog, nativeInstance),
      ])
      .withRegistrations([
        Registration.singleton(IFileDialog, FileDialogDesktop),
      ]);

    const flattened = flattenRegistry(reg);
    // First element should be the desktop singleton registration
    const container = DI.createContainer();
    container.register(...flattened);

    const resolved = container.get(IFileDialog);
    // Should NOT be the plain instance object
    expect(resolved).not.toBe(nativeInstance);
    expect(ctorName(resolved)).toBe('FileDialogDesktop');

    const all = container.getAll(IFileDialog);
    // Desktop first, then the raw instance
    expect([
      ctorName(all[0]),
      (all[1] as any).tag
    ]).toEqual(['FileDialogDesktop', 'native-instance']);
  });

  it('Does not instantiate earlier implementations unless resolved', () => {
    const reg = new PlatformRegistry()
      .withRegistrations([
        Registration.singleton(IFileDialog, FileDialogNative),
      ])
      .withRegistrations([
        Registration.singleton(IFileDialog, FileDialogDesktop),
      ]);

    const flattened = flattenRegistry(reg);
    const container = DI.createContainer();
    container.register(...flattened);

    // BEFORE any get(), check internal resolver shape (optional, fragile)
    const internal = (container as any)._resolvers?.get(IFileDialog);
    if (Array.isArray(internal)) {
      // Expect first resolver _state still to be the constructor Function (not an instance) pre-resolution
      expect(typeof internal[0]._state).toBe('function');
    }

    // Trigger resolution
    container.get(IFileDialog);

    if (Array.isArray(internal)) {
      expect(typeof internal[0]._state).toBe('object'); // now instantiated
    }
  });

  it('Order of registrations array is newest-first due to unshift', () => {
    const nativeReg = Registration.singleton(IFileDialog, FileDialogNative);
    const desktopReg = Registration.singleton(IFileDialog, FileDialogDesktop);

    const reg = new PlatformRegistry()
      .withRegistrations([nativeReg])
      .withRegistrations([desktopReg]);

    // registrations[0] should be desktopReg (latest)
    expect(reg.registrations[0]).toBe(desktopReg);
    expect(reg.registrations[1]).toBe(nativeReg);
  });
});
