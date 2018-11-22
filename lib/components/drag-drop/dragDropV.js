import React, { Component } from 'react';
import { SortableContainer, SortableElement, arrayMove } from './index';

import { prefix } from '../utilities';

import OCCard from '../card';

import list from './data/lists';

const SortableItem = SortableElement(({ value }) => (
  <div className={prefix('grid__item grid__item--s-12')}>
    <OCCard modifiers="card--draggable">
      <p className={prefix('p')}>{value.label}</p>
    </OCCard>
  </div>
));

const SortableList = SortableContainer(({ items }) => {
  return (
    <section className={prefix('grid grid--gutter-x-fixed')}>
      {items.map((value, index) => (
        <SortableItem key={index} index={index} value={value} />
      ))}
    </section>
  );
});

class SortableComponent extends Component {
  state = {
    items: list.items
  };

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState({
      items: arrayMove(this.state.items, oldIndex, newIndex)
    });
  };

  render() {
    const { state, onSortEnd } = this;
    return (
      <SortableList
        items={state.items}
        axis="y"
        onSortEnd={onSortEnd}
        animateClass={prefix('foo')}
      />
    );
  }
}

export default SortableComponent;
