// * React imports
import PropTypes from 'prop-types';
import React from 'react';

// * sibling imports
import OCIcon from '../icon';

// * utility imports
import getRange from '../utils/getRange';
import getWindowWidth from '../utils/getWindowWidth';
import prefix from '../utils/prefix';

// ! siblings PUT IN CONSTRUCTOR
const mobileSiblings = 1;
const tabletSiblings = 2;
const desktopSiblings = 3;

// * React component
class OCPagination extends React.Component {
  constructor(props) {
    super(props);

    this.paginationRef = React.createRef();

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
        status = pages[index].modifiers;
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
        <ul className={prefix('pagination__list')}>
          <li
            className={
              !pagination.previousPage
                ? prefix('pagination__item pagination__item--previous')
                : prefix(
                    'pagination__item pagination__item--previous pagination__item--selectable'
                  )
            }
            tabIndex={-1}
            onClick={
              pagination.previousPage ? event => handlePrevious(event) : null
            }
            onKeyDown={handleKeyDown}>
            <OCIcon modifiers="icon--arrow-left active" />
            <span className={prefix('pagination__label')}>Prev</span>
          </li>
        </ul>
        <div className={prefix('pagination__list-outer')}>
          <div
            className={prefix('pagination__highlight')}
            style={{ transform: `translateX(${state.highlightCoords}px)` }}
          />
          <ul className={prefix('pagination__list')} ref={paginationRef}>
            {pagination.pages.map(page => (
              <li
                key={page}
                className={
                  state.currentPage === page
                    ? getPageStatus(page)
                      ? prefix(
                          `pagination__item pagination__item--selectable ${getPageStatus(
                            page
                          )} active`
                        )
                      : prefix(
                          'pagination__item pagination__item--selectable active'
                        )
                    : getPageStatus(page)
                    ? prefix(
                        `pagination__item pagination__item--selectable ${getPageStatus(
                          page
                        )}`
                      )
                    : prefix('pagination__item pagination__item--selectable')
                }
                tabIndex={state.currentPage === page ? 0 : -1}
                onClick={event => handleClick(event, page)}
                onKeyDown={handleKeyDown}>
                {page}
              </li>
            ))}
            <li className={prefix('pagination__item')}>of</li>
            <li
              className={prefix(
                'pagination__item pagination__item--selectable'
              )}
              onClick={event => handleClick(event, state.totalPages)}
              tabIndex={-1}>
              {state.totalPages}
            </li>
          </ul>
        </div>
        <ul className={prefix('pagination__list')}>
          <li
            className={
              !pagination.nextPage
                ? prefix('pagination__item pagination__item--next')
                : prefix(
                    'pagination__item pagination__item--next pagination__item--selectable'
                  )
            }
            tabIndex={-1}
            onClick={pagination.nextPage ? event => handleNext(event) : null}
            onKeyDown={handleKeyDown}>
            <OCIcon modifiers="icon--arrow-right active" />
            <span className={prefix('pagination__label')}>Next</span>
          </li>
        </ul>
      </div>
    );
  }
}

OCPagination.propTypes = {
  pages: PropTypes.array.isRequired,
  currentPage: PropTypes.number,
  onPageChange: PropTypes.func.isRequired
};

OCPagination.defaultProps = {
  currentPage: 0
};

export default OCPagination;
