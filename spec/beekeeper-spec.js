'use babel';

import Beekeeper from '../lib/beekeeper';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('Beekeeper', () => {
  let workspaceElement, activationPromise;

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('beekeeper');
  });

  describe('when the beekeeper:toggle event is triggered', () => {
    it('hides and shows the modal panel', () => {
      // Before the activation event the view is not on the DOM, and no panel
      // has been created
      expect(workspaceElement.querySelector('.beekeeper')).not.toExist();

      // This is an activation event, triggering it will cause the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'beekeeper:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        expect(workspaceElement.querySelector('.beekeeper')).toExist();

        let beekeeperElement = workspaceElement.querySelector('.beekeeper');
        expect(beekeeperElement).toExist();

        let beekeeperPanel = atom.workspace.panelForItem(beekeeperElement);
        expect(beekeeperPanel.isVisible()).toBe(true);
        atom.commands.dispatch(workspaceElement, 'beekeeper:toggle');
        expect(beekeeperPanel.isVisible()).toBe(false);
      });
    });

    it('hides and shows the view', () => {
      // This test shows you an integration test testing at the view level.

      // Attaching the workspaceElement to the DOM is required to allow the
      // `toBeVisible()` matchers to work. Anything testing visibility or focus
      // requires that the workspaceElement is on the DOM. Tests that attach the
      // workspaceElement to the DOM are generally slower than those off DOM.
      jasmine.attachToDOM(workspaceElement);

      expect(workspaceElement.querySelector('.beekeeper')).not.toExist();

      // This is an activation event, triggering it causes the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'beekeeper:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        // Now we can test for view visibility
        let beekeeperElement = workspaceElement.querySelector('.beekeeper');
        expect(beekeeperElement).toBeVisible();
        atom.commands.dispatch(workspaceElement, 'beekeeper:toggle');
        expect(beekeeperElement).not.toBeVisible();
      });
    });
  });
});
