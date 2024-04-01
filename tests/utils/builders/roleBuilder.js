export class RoleBuilder {
  role = {};
  setName(name) {
    this.role.name = name;
    return this;
  }
  setStatus(status) {
    this.role.status = status;
    return this;
  }
  setRegulatoryBody(regulatoryBody) {
    this.role.regulatoryBody = regulatoryBody;
    return this;
  }
  build() {
    return this.role;
  }
}
