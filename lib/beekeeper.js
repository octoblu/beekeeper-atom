"use babel"

import BeekeeperView from "./beekeeper-view"
import { CompositeDisposable } from "atom"

export default {
  beekeeperView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.beekeeperView = new BeekeeperView(state.beekeeperViewState)
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.beekeeperView.getElement(),
      visible: false,
    })

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable()

    // Register command that configures this view
    this.subscriptions.add(
      atom.commands.add("atom-workspace", {
        "beekeeper:configure": () => this.configure(),
      }),
    )
  },

  deactivate() {
    this.modalPanel.destroy()
    this.subscriptions.dispose()
    this.beekeeperView.destroy()
  },

  serialize() {
    return {
      beekeeperViewState: this.beekeeperView.serialize(),
    }
  },

  configure() {
    console.log("Beekeeper was configured!")
    return this.modalPanel.isVisible() ? this.modalPanel.hide() : this.modalPanel.show()
  },
}
