import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import { prefix, getRange, getWindowWidth } from '../utilities';
import OCIcon from '../icon';

// siblingss
const mobileSiblings = 1;
const tabletSiblings = 2;
const desktopSiblings = 3;

class OCPagination extends Component {
  constructor(props) {
    super(props);

    this.paginationRef = createRef();

    this.state = {
      pages: this.props.pages,
      totalPages: this.props.pages.length,
      currentPage: this.props.currentPage === 0 ? 1 : this.props.currentPage,
      highlightCoords: 0
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);

    this.updateDimensions();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  updateDimensions = () => {
    const windowWidth = getWindowWidth();

    let siblings;

    if (windowWidth === 'small') {
      siblings = mobileSiblings;
    } else if (windowWidth === 'medium') {
      siblings = tabletSiblings;
    } else {
      siblings = desktopSiblings;
    }

    this.setState({ siblings: siblings }, function() {
      this.handleHighlight();
    });
  };

  fetchPagination = () => {
    const totalDisplayNumbers = this.state.currentPage + this.state.siblings;
    let startPage, endPage;

    if (this.state.totalPages >= totalDisplayNumbers) {
      const startIndex = this.state.currentPage - this.state.siblings;
      const endIndex = this.state.currentPage + this.state.siblings;

      startPage = startIndex < 1 ? 1 : startIndex;
      endPage =
        endIndex > this.state.totalPages
          ? this.state.totalPages
          : startIndex < 1
          ? endIndex + 1 + Math.abs(startIndex)
          : endIndex;
    } else {
      const startIndex = this.state.totalPages - this.state.siblings * 2;
      startPage = startIndex < 1 ? 1 : startIndex;
      endPage = this.state.totalPages;
    }

    const pages = getRange(startPage, endPage);

    const previousPage = this.state.currentPage !== 1 ? true : false;
    const nextPage =
      this.state.currentPage !== this.state.totalPages ? true : false;

    return {
      pages: pages,
      previousPage: previousPage,
      nextPage: nextPage
    };
  };

  handleNext = event => {
    event.preventDefault();
    event.stopPropagation();

    this.goToPage(this.state.currentPage + 1);
  };

  handlePrevious = event => {
    event.preventDefault();
    event.stopPropagation();

    this.goToPage(this.state.currentPage - 1);
  };

  handleClick = (event, pageNumber) => {
    event.preventDefault();
    event.stopPropagation();

    this.goToPage(pageNumber);
  };

  handleKeyDown = event => {
    const pagination = this.fetchPagination();

    // 'ArrowLeft' key
    if (event.keyCode === 37) {
      event.preventDefault();
      event.stopPropagation();

      pagination.previousPage && this.handlePrevious(event);
    }

    // 'ArrowUp' key
    if (event.keyCode === 38) {
      event.preventDefault();
      event.stopPropagation();

      pagination.nextPage && this.goToPage(this.state.totalPages);
    }

    // 'ArrowRight' key
    if (event.keyCode === 39) {
      event.preventDefault();
      event.stopPropagation();

      pagination.nextPage && this.handleNext(event);
    }

    // 'ArrowDown' key
    if (event.keyCode === 40) {
      event.preventDefault();
      event.stopPropagation();

      pagination.previousPage && this.goToPage(1);
    }
  };

  goToPage = pageNumber => {
    const paginationRef = this.paginationRef.current;

    this.setState({ currentPage: pageNumber }, function() {
      paginationRef.getElementsByClassName(prefix('active'))[0].focus();
      this.handleHighlight();
    });

    this.props.onPageChange(pageNumber);
  };

  handleHighlight = () => {
    if (this.state.siblings === mobileSiblings) {
      this.state.currentPage === 1
        ? this.setState({ highlightCoords: 0 })
        : this.state.currentPage !== this.state.totalPages
        ? this.setState({ highlightCoords: 48 })
        : this.setState({ highlightCoords: 96 });
    } else if (this.state.siblings === tabletSiblings) {
      this.state.currentPage === 1
        ? this.setState({ highlightCoords: 0 })
        : this.state.currentPage === 2
        ? this.setState({ highlightCoords: 56 })
        : this.state.currentPage !== this.state.totalPages - 1 &&
          this.state.currentPage !== this.state.totalPages
        ? this.setState({ highlightCoords: 112 })
        : this.state.currentPage === this.state.totalPages - 1
        ? this.setState({ highlightCoords: 168 })
        : this.setState({ highlightCoords: 224 });
    } else {
      this.state.currentPage === 1
        ? this.setState({ highlightCoords: 0 })
        : this.state.currentPage === 2
        ? this.setState({ highlightCoords: 56 })
        : this.state.currentPage === 3
        ? this.setState({ highlightCoords: 112 })
        : this.state.currentPage !== this.state.totalPages - 2 &&
          this.state.currentPage !== this.state.totalPages - 1 &&
          this.state.currentPage !== this.state.totalPages
        ? this.setState({ highlightCoords: 168 })
        : this.state.currentPage === this.state.totalPages - 2
        ? this.setState({ highlightCoords: 224 })
        : this.state.currentPage === this.state.totalPages - 1
        ? this.setState({ highlightCoords: 280 })
        : this.setState({ highlightCoords: 336 });
    }
  };

  getPageStatus = pageNumber => {
    let status = '';
    const pages = this.state.pages;
    for (let index = 0; index < pages.length; index++) {
      if (pages[index].number === pageNumber) {
        status = pages[index].status;
        break;
      }
    }
    return status;
  };

  render() {
    const {
      paginationRef,
      state,
      handlePrevious,
      handleClick,
      handleNext,
      handleKeyDown,
      getPageStatus
    } = this;

    const pagination = this.fetchPagination();

    return (
      <div className={prefix('pagination')}>
        <div className={prefix('pagination__list-outer')}>
          <div
            className={prefix('pagination__highlight')}
            style={{ transform: `translateX(${state.highlightCoords}px)` }}
          />
          <ul className={prefix('pagination__list')} ref={paginationRef}>
            <li
              className={prefix('pagination__item')}
              onClick={
                pagination.previousPage ? event => handlePrevious(event) : null
              }>
              <OCIcon modifiers="icon--chevron-left" />
              <span className={prefix('pagination__label')}>Prev</span>
            </li>
            {pagination.pages.map(page => (
              <li
                key={page}
                className={
                  state.currentPage === page
                    ? getPageStatus(page)
                      ? prefix(
                          `pagination__item pagination__item--${getPageStatus(
                            page
                          )} active`
                        )
                      : prefix('pagination__item active')
                    : getPageStatus(page)
                    ? prefix(
                        `pagination__item pagination__item--${getPageStatus(
                          page
                        )}`
                      )
                    : prefix('pagination__item')
                }
                tabIndex={state.currentPage === page ? 0 : -1}
                onClick={event => handleClick(event, page)}
                onKeyDown={state.currentPage === page ? handleKeyDown : null}>
                {page}
              </li>
            ))}
            <li className={prefix('pagination__item pagination__item--alt')}>
              of
            </li>
            <li
              className={prefix('pagination__item')}
              onClick={event => handleClick(event, state.totalPages)}>
              {state.totalPages}
            </li>
            <li
              className={prefix('pagination__item')}
              onClick={pagination.nextPage ? event => handleNext(event) : null}>
              <OCIcon modifiers="icon--chevron-right" />
              <span className={prefix('pagination__label')}>Next</span>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

OCPagination.propTypes = {
  pages: PropTypes.array.isRequired,
  currentPage: PropTypes.number,
  onPageChange: PropTypes.func
};

OCPagination.defaultProps = {
  pages: [
    {
      number: 1,
      status: 'error'
    },
    {
      number: 2,
      status: 'success'
    },
    {
      number: 3,
      status: 'error'
    },
    {
      number: 4,
      status: 'error'
    },
    {
      number: 5,
      status: 'error'
    },
    {
      number: 6
    },
    {
      number: 7,
      status: 'success'
    },
    {
      number: 8,
      status: 'error'
    },
    {
      number: 9,
      status: 'error'
    },
    {
      number: 10,
      status: 'error'
    }
  ],
  currentPage: 0,
  onPageChange: data => {
    console.log(`Pagination data returned: ${data}`);
  }
};

export default OCPagination;
