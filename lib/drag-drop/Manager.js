class Manager {
  refs = {};

  add(collection, ref) {
    if (!this.refs[collection]) {
      this.refs[collection] = [];
    }

    this.refs[collection].push(ref);
  }

  remove(collection, ref) {
    const index = this.getIndex(collection, ref);

    if (index !== -1) {
      this.refs[collection].splice(index, 1);
    }
  }

  isActive() {
    return this.active;
  }

  getActive() {
    let currentNode = ``;
    let nodes = this.refs[this.active.collection];

    for (let i = 0; i < nodes.length; i++) {
      let selectedNoded = nodes[i];
      if (selectedNoded.node.sortableInfo.index === this.active.index) {
        currentNode = selectedNoded;
        break;
      }
    }
    return currentNode;
  }

  getIndex(collection, ref) {
    return this.refs[collection].indexOf(ref);
  }

  getOrderedRefs(collection = this.active.collection) {
    return this.refs[collection].sort(sortByIndex);
  }
}

const sortByIndex = (
  {
    node: {
      sortableInfo: { index: index1 }
    }
  },
  {
    node: {
      sortableInfo: { index: index2 }
    }
  }
) => {
  return index1 - index2;
};

export { Manager as default };
