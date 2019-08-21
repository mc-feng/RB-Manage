export const store = {
    debug: true,
    state: {
    },
    setMessageAction (key,newValue) {
      if (this.debug) console.log('setMessageAction triggered with', newValue)
      this.state[key] = newValue
    },
    clearMessageAction (key) {
      if (this.debug) console.log('clearMessageAction triggered')
      this.state[key] = ''
    }
}