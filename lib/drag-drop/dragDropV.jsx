// * React imports
import React from 'react';

// * utility imports
import { SortableContainer, SortableElement, arrayMove } from './index';
import addNamespace from '../utilities/ts/add-namespace';

// * child imports
import Card from '../card';
import list from './data/lists';

// * React component
const SortableItem = SortableElement(({ value }) => (
  <div className={addNamespace(`grid__item grid__item--s-12`)}>
    <Card modifiers="card--draggable">
      <p className={addNamespace(`p`)}>{value.label}</p>
    </Card>
  </div>
));

const SortableList = SortableContainer(({ items }) => {
  return (
    <section className={addNamespace(`grid grid--gutter-fixed`)}>
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
        axis="y"
        onSortEnd={onSortEnd}
        animateClass={addNamespace(`foo`)}
      />
    );
  }
}

export { SortableComponent as default };
