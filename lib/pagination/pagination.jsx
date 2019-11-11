import PropTypes from 'prop-types';
import React from 'react';
import Icon from '../icon';
import BEM from '../utilities/ts/bem';
import getRange from '../utilities/ts/getRange';
import getWindowWidth from '../utilities/ts/get-window-width';
import namespace from '../utilities/ts/namespace';
import pxToRem from '../utilities/ts/px-to-rem';

class Pagination extends React.Component {
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

    window.addEventListener(`resize`, this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener(`resize`, this.updateDimensions);
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

    if (windowWidth === `small`) {
      siblings = this.mobileSiblings;
    } else if (windowWidth === `medium`) {
      siblings = this.tabletSiblings;
    } else {
      siblings = this.desktopSiblings;
    }

    this.setState({ siblings: siblings }, () => {
      const paginationRef = this.paginationRef.current;
      const paginationChildren = paginationRef.childNodes.length;

      let paginationWidth = null;

      if (windowWidth === `small`) {
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

    this.setState({ currentPage: pageNumber }, () => {
      paginationRef.getElementsByClassName(namespace(`active`))[0].focus();
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
    let status = ``;
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

    const bem = BEM(`pagination`);
    bem.addClassNames(state.mounted ? `mounted` : ``);
    bem.addClassNames(props.className);

    return (
      <div className={bem.getResult()} style={props.style}>
        <ul className={bem.getElement(`list`)}>
          <li
            className={
              !pagination.previousPage
                ? `${bem.getElement(`item`)} ${bem.getModifier(
                    `previous`,
                    `item`
                  )}`
                : `${bem.getElement(`item`)} ${bem.getModifier(
                    `previous`,
                    `item`
                  )} ${bem.getModifier(`selectable`, `item`)}`
            }
            tabIndex={-1}
            onClick={
              pagination.previousPage ? event => handlePrevious(event) : null
            }
            onKeyDown={handleKeyDown}>
            <Icon type="arrow-left" />
            <span className={bem.getElement(`label`)}>Prev</span>
          </li>
        </ul>
        <ul
          ref={paginationRef}
          className={bem.getElement(`list`)}
          style={{ width: pxToRem(state.width, `string`) }}>
          <div
            className={bem.getElement(`highlight`)}
            style={{
              transform: `translateX(${pxToRem(
                state.highlightCoords,
                `string`
              )})`
            }}
            aria-hidden={true}
          />
          {pagination.pages.map(page => (
            <li
              key={page}
              className={
                state.currentPage === page
                  ? getPageStatus(page)
                    ? namespace(
                        `pagination__item pagination__item--selectable ${getPageStatus(
                          page
                        )} active`
                      )
                    : namespace(
                        `pagination__item pagination__item--selectable active`
                      )
                  : getPageStatus(page)
                  ? namespace(
                      `pagination__item pagination__item--selectable ${getPageStatus(
                        page
                      )}`
                    )
                  : `${bem.getElement(`item`)} ${bem.getModifier(
                      `selectable`,
                      `item`
                    )}`
              }
              tabIndex={state.currentPage === page ? 0 : -1}
              onClick={event => handleClick(event, page)}
              onKeyDown={handleKeyDown}>
              {page}
            </li>
          ))}
          <li className={bem.getElement(`item`)}>of</li>
          <li
            className={`${bem.getElement(`item`)} ${bem.getModifier(
              `selectable`,
              `item`
            )}`}
            onClick={event => handleClick(event, totalPages)}
            tabIndex={-1}>
            {totalPages}
          </li>
        </ul>
        <ul className={bem.getElement(`list`)}>
          <li
            className={`${bem.getElement(`item`)} ${bem.getModifier(
              `next`,
              `item`
            )} ${
              pagination.nextPage ? bem.getModifier(`selectable`, `item`) : ``
            }`}
            tabIndex={-1}
            onClick={pagination.nextPage ? event => handleNext(event) : null}
            onKeyDown={handleKeyDown}>
            <Icon type="arrow-right" />
            <span className={bem.getElement(`label`)}>Next</span>
          </li>
        </ul>
      </div>
    );
  }
}

Pagination.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  pages: PropTypes.array.isRequired,
  currentPage: PropTypes.number,
  onChange: PropTypes.func.isRequired
};

Pagination.defaultProps = {
  currentPage: 0,
  onChange: () => {}
};

export { Pagination as default };
