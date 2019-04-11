// * React imports
import PropTypes from 'prop-types';
import React from 'react';

// * utility imports
import getId from '../utils/getId';
import prefix from '../utils/prefix';

// * child imports
import OCToast from '../toast';

// * React component
export default class OCToaster extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toast: this.props.toast ? this.addId(this.props.toast) : []
    };
  }

  addId = toast => {
    for (let index = 0; index < toast.length; index++) {
      if (!toast[index].id) {
        toast[index].id = getId();
      }
    }

    return toast;
  };

  componentDidUpdate(previousProps) {
    if (previousProps !== this.props) {
      this.setState({
        toast: [...this.state.toast, ...this.addId(this.props.toast)]
      });
    }
  }

  handleClick = id => {
    // * create an additional instance of array, so that .splice() doesn't
    // * directly mutate state.
    const toast = [...this.state.toast];

    for (let index = 0; index < toast.length; index++) {
      if (toast[index].id === id) {
        toast.splice(index, 1);
      }
    }

    this.setState({ toast: toast });

    // this.props.handleClick(toast);
  };

  render() {
    const { state, handleClick } = this;

    return (
      <div className={prefix('toaster')}>
        {state.toast.map(toast => (
          <OCToast
            key={toast.id}
            id={toast.id}
            modifiers={toast.modifiers}
            icon={toast.icon}
            heading={toast.heading}
            message={toast.message}
            onClick={handleClick}
          />
        ))}
      </div>
    );
  }
}

OCToaster.propTypes = {
  toast: PropTypes.arrayOf(
    PropTypes.shape({
      modifiers: PropTypes.string,
      heading: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired
    })
  )
  // handleClick: PropTypes.func
};

// OCToaster.defaultProps = {
//   handleClick: () => {}
// };
