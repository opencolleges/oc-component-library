import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { prefix, getRange, getDeviceType } from '../utilities';
import OCIcon from '../icon';

//Neighbours
const MOBILE_NEIGHBOUR = 1;
const TABLET_NEIGHBOUR = 2;
const DESKTOP_NEIGHBOUR = 3;

class OCPagination extends Component {
  constructor(props) {
    super(props);
    const { totalPage, currentPropPage } = this.props;

    this.state = {
      currentPage: currentPropPage === 0 ? 1 : currentPropPage
    };

    this.totalPage = totalPage;
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);
    this.updateDimensions();
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }
  updateDimensions = () => {
    let windowWidth = getDeviceType();
    let neighbour;
    if (windowWidth === 'MOBILE') {
      neighbour = MOBILE_NEIGHBOUR;
    } else if (windowWidth === 'TABLET') {
      neighbour = TABLET_NEIGHBOUR;
    } else {
      neighbour = DESKTOP_NEIGHBOUR;
    }
    this.setState({ neighbour: neighbour });
  };
  generatePagination = () => {
    const { currentPage, neighbour } = this.state;
    const totalPage = this.totalPage;

    const totalDisplayNumbers = currentPage + neighbour;
    let startPage, endPage;

    if (totalPage >= totalDisplayNumbers) {
      const startIndex = currentPage - neighbour;
      const endIndex = currentPage + neighbour;

      startPage = startIndex < 1 ? 1 : startIndex;
      endPage =
        endIndex > totalPage
          ? totalPage
          : startIndex < 1
          ? endIndex + 1 + Math.abs(startIndex)
          : endIndex;
    } else {
      const startIndex = totalPage - neighbour * 2;
      startPage = startIndex < 1 ? 1 : startIndex;
      endPage = totalPage;
    }

    const pages = getRange(startPage, endPage);
    const previousPage = currentPage !== 1 ? true : false;
    const nextPage = currentPage !== totalPage ? true : false;

    return {
      pages: pages,
      previousPage: previousPage,
      nextPage: nextPage
    };
  };

  renderPrevious(status) {
    let previous;
    if (status) {
      previous = (
        <li
          className={prefix(
            'pagination__navigation pagination__navigation--previous active'
          )}
          onClick={e => this.handlePrevious(e)}>
          <span className={prefix('pagination__label ')}>
            <OCIcon modifiers="icon--chevron-left" />
          </span>
        </li>
      );
    } else {
      previous = (
        <li
          className={prefix(
            'pagination__navigation pagination__navigation--previous'
          )}>
          <span className={prefix('pagination__label ')}>
            <OCIcon modifiers="icon--chevron-left" />
          </span>
        </li>
      );
    }
    return previous;
  }

  renderNext(status) {
    let next;
    if (status) {
      next = (
        <li
          className={prefix(
            'pagination__navigation pagination__navigation--next active'
          )}
          onClick={e => this.handleNext(e)}>
          <span className={prefix('pagination__label ')}>
            <OCIcon modifiers="icon--chevron-right" />
          </span>
        </li>
      );
    } else {
      next = (
        <li
          className={prefix(
            'pagination__navigation pagination__navigation--next'
          )}>
          <span className={prefix('pagination__label ')}>
            <OCIcon modifiers="icon--chevron-right" />
          </span>
        </li>
      );
    }
    return next;
  }

  handleNext = e => {
    e.preventDefault();
    const { currentPage } = this.state;
    this.goToPage(currentPage + 1);
  };

  handlePrevious = e => {
    e.preventDefault();
    const { currentPage } = this.state;
    this.goToPage(currentPage - 1);
  };
  handleClick = (e, pageNo) => {
    e.preventDefault();
    this.goToPage(pageNo);
  };
  goToPage = pageNo => {
    const { onPageChanged } = this.props;
    this.setState({ currentPage: pageNo });
    onPageChanged(pageNo);
  };

  render() {
    const { currentPage } = this.state;
    const paginationData = this.generatePagination();
    console.log('paginationData', paginationData);
    return (
      <div className={prefix('pagination')}>
        <ul className={prefix('pagination__list')}>
          {/* Previous Item*/}
          {this.renderPrevious(paginationData.previousPage)}
          {/* Items*/}
          {paginationData.pages.map(number => (
            <li
              key={number}
              className={
                prefix('pagination__item pagination__navigation') +
                ' ' +
                (currentPage === number ? prefix('active') : '')
              }
              onClick={e => this.handleClick(e, number)}>
              <span className={prefix('pagination__label ')}>{number}</span>
            </li>
          ))}

          {/* Of*/}
          <li
            className={prefix(
              'pagination__item pagination__navigation pagination__navigation--of'
            )}>
            <span className={prefix('pagination__label ')}>Of</span>
          </li>
          {/* Last Page*/}
          <li
            className={prefix('pagination__item pagination__navigation')}
            onClick={e => this.handleClick(e, this.totalPage)}>
            <span className={prefix('pagination__label ')}>
              {this.totalPage}
            </span>
          </li>
          {/* Next Item*/}
          {this.renderNext(paginationData.nextPage)}
        </ul>
      </div>
    );
  }
}
OCPagination.propTypes = {
  totalPage: PropTypes.any.isRequired,
  currentPropPage: PropTypes.any,
  onPageChanged: PropTypes.func
};
OCPagination.defaultProps = {
  currentPropPage: 0,
  onPageChanged: data => {
    console.log('Pagination data Returned', data);
  }
};

export default OCPagination;
