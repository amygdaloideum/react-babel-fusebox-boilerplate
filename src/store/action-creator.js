export default class ActionCreator {
  constructor(type) { this.type = type; }
  create = (payload = null) => ({ type: this.type, payload });
}
