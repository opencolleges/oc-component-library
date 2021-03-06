// * React imports
import PropTypes from 'prop-types';
import React from 'react';

// * utility imports
import getRange from '../utilities/js/getRange';
import getWindowWidth from '../utilities/js/getWindowWidth';
import prefix from '../utilities/js/prefix';

// * child imports
import OCIcon from '../icon';

// * React component
export default class OCPagination extends React.Component {
  constructor(props) {
    super(props);

    this.paginationRef = React.createRef();

    this.state = {
      pages: this.props.pages,
      siblings: null,
      currentPage: this.props.currentPage === 0 ? 1 : this.props.currentPage,
      width: null,
      highlightCoords: 0,
      mounted: false
    };

    this.totalPages = this.props.pages.length;

    this.mobileSiblings = 1;
    this.tabletSiblings = 2;
    this.desktopSiblings = 3;
  }

  componentDidMount() {
    this.showPagination();
    this.updateDimensions();

    window.addEventListener('resize', this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.pages !== this.props.pages) {
      this.setState({
        pages: this.props.pages
      });
    }
    if (prevProps.currentPage !== this.props.currentPage) {
      this.goToPage(this.props.currentPage);
    }
  }

  showPagination = () => {
    setTimeout(() => {
      this.setState({ mounted: true });
    }, 500);
  };

  updateDimensions = () => {
    const windowWidth = getWindowWidth();

    let siblings;

    if (windowWidth === 'small') {
      siblings = this.mobileSiblings;
    } else if (windowWidth === 'medium') {
      siblings = this.tabletSiblings;
    } else {
      siblings = this.desktopSiblings;
    }

    this.setState({ siblings: siblings }, function() {
      const paginationRef = this.paginationRef.current;
      const paginationChildren = paginationRef.childNodes.length;

      let paginationWidth = null;

      if (windowWidth === 'small') {
        if (paginationChildren === 4) paginationWidth = 112;
        else if (paginationChildren === 5) paginationWidth = 160;
        else paginationWidth = 208;
      } else {
        if (paginationChildren === 4) paginationWidth = 128;
        else if (paginationChildren === 5) paginationWidth = 184;
        else if (paginationChildren === 6) paginationWidth = 240;
        else if (paginationChildren === 7) paginationWidth = 296;
        else if (paginationChildren === 8) paginationWidth = 352;
        else if (paginationChildren === 9) paginationWidth = 408;
        else paginationWidth = 464;
      }

      this.setState({ width: paginationWidth });

      this.handleHighlight();
    });
  };

  fetchPagination = () => {
    const totalDisplayNumbers = this.state.currentPage + this.state.siblings;
    let startPage, endPage;
    if (this.totalPages >= totalDisplayNumbers) {
      const startIndex = this.state.currentPage - this.state.siblings;
      const endIndex = this.state.currentPage + this.state.siblings;
      const countEndIndex =
        startIndex < 1 ? 1 + this.state.siblings * 2 : endIndex;
      startPage = startIndex < 1 ? 1 : startIndex;

      endPage =
        countEndIndex > this.totalPages ? this.totalPages : countEndIndex;
    } else {
      const startIndex = this.totalPages - this.state.siblings * 2;
      startPage = startIndex < 1 ? 1 : startIndex;
      endPage = this.totalPages;
    }

    const pages = getRange(startPage, endPage);

    const previousPage = this.state.currentPage !== 1 ? true : false;
    const nextPage = this.state.currentPage !== this.totalPages ? true : false;

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

      pagination.nextPage && this.goToPage(this.totalPages);
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

    this.props.onChange(pageNumber);
  };

  handleHighlight = () => {
    const { state, totalPages, mobileSiblings, tabletSiblings } = this;

    if (state.siblings === mobileSiblings) {
      if (state.currentPage === 1) {
        this.setState({ highlightCoords: 0 });
      } else if (state.currentPage === totalPages && totalPages >= 3) {
        this.setState({ highlightCoords: 96 });
      } else {
        this.setState({ highlightCoords: 48 });
      }
    } else if (state.siblings === tabletSiblings) {
      if (state.currentPage === 1) {
        this.setState({ highlightCoords: 0 });
      } else if (state.currentPage === 2) {
        this.setState({ highlightCoords: 56 });
      } else if (state.currentPage === totalPages - 1 && totalPages >= 5) {
        this.setState({ highlightCoords: 168 });
      } else if (state.currentPage === totalPages && totalPages >= 4) {
        if (totalPages >= 5) {
          this.setState({ highlightCoords: 224 });
        } else {
          this.setState({ highlightCoords: 168 });
        }
      } else {
        this.setState({ highlightCoords: 112 });
      }
    } else {
      if (state.currentPage === 1) {
        this.setState({ highlightCoords: 0 });
      } else if (state.currentPage === 2) {
        this.setState({ highlightCoords: 56 });
      } else if (state.currentPage === 3) {
        this.setState({ highlightCoords: 112 });
      } else if (state.currentPage === totalPages - 2 && totalPages >= 7) {
        this.setState({ highlightCoords: 224 });
      } else if (state.currentPage === totalPages - 1 && totalPages >= 6) {
        if (totalPages >= 7) {
          this.setState({ highlightCoords: 280 });
        } else {
          this.setState({ highlightCoords: 224 });
        }
      } else if (state.currentPage === totalPages && totalPages >= 5) {
        if (totalPages >= 7) {
          this.setState({ highlightCoords: 336 });
        } else if (totalPages >= 6) {
          this.setState({ highlightCoords: 280 });
        } else {
          this.setState({ highlightCoords: 224 });
        }
      } else {
        this.setState({ highlightCoords: 168 });
      }
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
      totalPages,
      props,
      state,
      handlePrevious,
      handleClick,
      handleNext,
      handleKeyDown,
      getPageStatus
    } = this;

    const pagination = this.fetchPagination();

    let classNames = prefix('pagination');

    state.mounted && (classNames += ` ${prefix('mounted')}`);

    props.className && (classNames += ` ${props.className}`);

    return (
      <div className={classNames} style={props.style}>
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
        <ul
          ref={paginationRef}
          className={prefix('pagination__list')}
          style={{ width: `${state.width / 16}rem` }}>
          <div
            className={prefix('pagination__highlight')}
            style={{
              transform: `translateX(${state.highlightCoords / 16}rem)`
            }}
            aria-hidden={true}
          />
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
            className={prefix('pagination__item pagination__item--selectable')}
            onClick={event => handleClick(event, totalPages)}
            tabIndex={-1}>
            {totalPages}
          </li>
        </ul>
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
  className: PropTypes.string,
  style: PropTypes.object,
  pages: PropTypes.array.isRequired,
  currentPage: PropTypes.number,
  onChange: PropTypes.func.isRequired
};

OCPagination.defaultProps = {
  currentPage: 0,
  onChange: () => {}
};
