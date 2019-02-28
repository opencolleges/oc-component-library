// * React imports
import React from 'react';

// * sibling imports
import OCCard from '../card';
import list from './data/lists';

// * utility imports
import { SortableContainer, SortableElement, arrayMove } from './index';
import prefix from '../utils/prefix';

// * React component
const SortableItem = SortableElement(({ value }) => (
  <div
    className={prefix(
      'grid__item grid__item--s-6 grid__item--m-4 grid__item--l-2'
    )}>
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

class SortableComponent extends React.Component {
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
        onSortEnd={onSortEnd}
        animateClass={prefix('foo')}
        axis="xy"
      />
    );
  }
}

export default SortableComponent;
