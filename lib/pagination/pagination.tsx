import React from 'react';
import Icon from '../icon';
import addNamespace from '../utilities/ts/add-namespace';
import BEM, { BEMInterface } from '../utilities/ts/bem';
import getWindowWidth from '../utilities/ts/get-window-width';
import getRange from '../utilities/ts/getRange';
import pxToRem from '../utilities/ts/px-to-rem';

interface Page {
  modifiers: string;
  number: number;
}

interface TPagination {
  nextPage: boolean;
  pages: number[];
  previousPage: boolean;
}

interface Props {
  className?: string;
  currentPage?: number;
  onChange: (page: number) => void;
  pages: Page[];
  style?: React.CSSProperties;
}

interface State {
  currentPage: number;
  highlightCoords: number | string;
  mounted: boolean;
  pages: Page[];
  siblings: number;
  width: string;
}

class Pagination extends React.Component<Props, State> {
  static defaultProps: Partial<Props> = {
    currentPage: 0,
    onChange: () => {
      return;
    }
  };

  listRef = React.createRef<HTMLUListElement>();

  totalPages: number = this.props.pages.length;

  mobileSiblings: number = 1;
  tabletSiblings: number = 2;
  desktopSiblings: number = 3;

  readonly state: Readonly<State> = {
    currentPage: this.props.currentPage === 0 ? 1 : this.props.currentPage,
    highlightCoords: 0,
    mounted: false,
    pages: this.props.pages,
    siblings: null,
    width: null
  };

  componentDidMount(): void {
    this.showPagination();
    this.updateDimensions();

    window.addEventListener(`resize`, this.updateDimensions);
  }

  componentWillUnmount(): void {
    window.removeEventListener(`resize`, this.updateDimensions);
  }

  componentDidUpdate(prevProps: Props): void {
    if (prevProps.pages !== this.props.pages) {
      this.setState({
        pages: this.props.pages
      });
    }
    if (prevProps.currentPage !== this.props.currentPage) {
      this.goToPage(this.props.currentPage);
    }
  }

  showPagination = (): void => {
    setTimeout(() => {
      this.setState({ mounted: true });
    }, 500);
  };

  updateDimensions = (): void => {
    const windowWidth: string = getWindowWidth();

    let siblings: number;

    if (windowWidth === `small`) {
      siblings = this.mobileSiblings;
    } else if (windowWidth === `medium`) {
      siblings = this.tabletSiblings;
    } else {
      siblings = this.desktopSiblings;
    }

    this.setState({ siblings }, () => {
      const listRef: HTMLUListElement = this.listRef.current;
      const paginationChildren: number = listRef.childNodes.length;

      let paginationWidth = null;

      if (windowWidth === `small`) {
        if (paginationChildren === 4) {
          paginationWidth = 112;
        } else if (paginationChildren === 5) {
          paginationWidth = 160;
        } else {
          paginationWidth = 208;
        }
      } else {
        if (paginationChildren === 4) {
          paginationWidth = 128;
        } else if (paginationChildren === 5) {
          paginationWidth = 184;
        } else if (paginationChildren === 6) {
          paginationWidth = 240;
        } else if (paginationChildren === 7) {
          paginationWidth = 296;
        } else if (paginationChildren === 8) {
          paginationWidth = 352;
        } else if (paginationChildren === 9) {
          paginationWidth = 408;
        } else {
          paginationWidth = 464;
        }
      }

      this.setState({ width: `${pxToRem(paginationWidth)}rem` });

      this.handleHighlight();
    });
  };

  fetchPagination = (): TPagination => {
    const totalDisplayNumbers: number =
      this.state.currentPage + this.state.siblings;
    let startPage: number;
    let endPage: number;
    if (this.totalPages >= totalDisplayNumbers) {
      const startIndex: number = this.state.currentPage - this.state.siblings;
      const endIndex: number = this.state.currentPage + this.state.siblings;
      const countEndIndex: number =
        startIndex < 1 ? 1 + this.state.siblings * 2 : endIndex;
      startPage = startIndex < 1 ? 1 : startIndex;

      endPage =
        countEndIndex > this.totalPages ? this.totalPages : countEndIndex;
    } else {
      const startIndex: number = this.totalPages - this.state.siblings * 2;
      startPage = startIndex < 1 ? 1 : startIndex;
      endPage = this.totalPages;
    }

    const pages: number[] = getRange(startPage, endPage);

    const previousPage: boolean = this.state.currentPage !== 1 ? true : false;
    const nextPage: boolean =
      this.state.currentPage !== this.totalPages ? true : false;

    return {
      nextPage,
      pages,
      previousPage
    };
  };

  handleNext = (event: React.MouseEvent | React.KeyboardEvent): void => {
    event.preventDefault();
    event.stopPropagation();

    this.goToPage(this.state.currentPage + 1);
  };

  handlePrevious = (event: React.MouseEvent | React.KeyboardEvent): void => {
    event.preventDefault();
    event.stopPropagation();

    this.goToPage(this.state.currentPage - 1);
  };

  handleClick = (event: React.MouseEvent): void => {
    event.preventDefault();
    event.stopPropagation();

    const element = event.target as HTMLElement;
    const pageNumber = parseInt(element.dataset.pageNumber, 10);

    this.goToPage(pageNumber);
  };

  handleKeyDown = (event: React.KeyboardEvent): void => {
    const pagination: TPagination = this.fetchPagination();

    // 'ArrowLeft' key
    if (event.keyCode === 37) {
      event.preventDefault();
      event.stopPropagation();

      if (pagination.previousPage) {
        this.handlePrevious(event);
      }
    }

    // 'ArrowUp' key
    if (event.keyCode === 38) {
      event.preventDefault();
      event.stopPropagation();

      if (pagination.nextPage) {
        this.goToPage(this.totalPages);
      }
    }

    // 'ArrowRight' key
    if (event.keyCode === 39) {
      event.preventDefault();
      event.stopPropagation();

      if (pagination.nextPage) {
        this.handleNext(event);
      }
    }

    // 'ArrowDown' key
    if (event.keyCode === 40) {
      event.preventDefault();
      event.stopPropagation();

      if (pagination.previousPage) {
        this.goToPage(1);
      }
    }
  };

  goToPage = (pageNumber: number): void => {
    const listRef: HTMLUListElement = this.listRef.current;

    this.setState({ currentPage: pageNumber }, () => {
      const element: HTMLElement = listRef.getElementsByClassName(
        `active`
      )[0] as HTMLElement;
      element.focus();
      this.handleHighlight();
    });

    this.props.onChange(pageNumber);
  };

  handleHighlight = (): void => {
    const { state, totalPages, mobileSiblings, tabletSiblings } = this;

    let coords: number = 0;

    if (state.siblings === mobileSiblings) {
      if (state.currentPage === totalPages && totalPages >= 3) {
        coords = 96;
      } else if (state.currentPage !== 1) {
        coords = 48;
      }
    } else if (state.siblings === tabletSiblings) {
      if (state.currentPage === 2) {
        coords = 56;
      } else if (state.currentPage === totalPages - 1 && totalPages >= 5) {
        coords = 168;
      } else if (state.currentPage === totalPages && totalPages >= 4) {
        if (totalPages >= 5) {
          coords = 224;
        } else if (state.currentPage !== 1) {
          coords = 168;
        }
      } else if (state.currentPage !== 1) {
        coords = 112;
      }
    } else {
      if (state.currentPage === 2) {
        coords = 56;
      } else if (state.currentPage === 3) {
        coords = 112;
      } else if (state.currentPage === totalPages - 2 && totalPages >= 7) {
        coords = 224;
      } else if (state.currentPage === totalPages - 1 && totalPages >= 6) {
        if (totalPages >= 7) {
          coords = 280;
        } else if (state.currentPage !== 1) {
          coords = 224;
        }
      } else if (state.currentPage === totalPages && totalPages >= 5) {
        if (totalPages >= 7) {
          coords = 336;
        } else if (totalPages >= 6) {
          coords = 280;
        } else if (state.currentPage !== 1) {
          coords = 224;
        }
      } else if (state.currentPage !== 1) {
        coords = 168;
      }
    }

    this.setState({ highlightCoords: `${pxToRem(coords)}rem` });
  };

  getPageStatus = (pageNumber: number): string => {
    let status: string = ``;
    const pages: Page[] = this.state.pages;
    for (const page of pages) {
      if (page.number === pageNumber) {
        status = page.modifiers;
        break;
      }
    }
    return status;
  };

  render() {
    const {
      listRef,
      totalPages,
      props,
      state,
      handlePrevious,
      handleClick,
      handleNext,
      handleKeyDown,
      getPageStatus
    } = this;

    const pagination: TPagination = this.fetchPagination();

    const BEM_MODULE: BEMInterface = BEM(`pagination`);
    const {
      addClassNames,
      getElement,
      getModifier,
      getResult
    }: BEMInterface = BEM_MODULE;
    addClassNames(state.mounted ? `mounted` : ``);
    addClassNames(props.className);

    return (
      <div className={getResult()} style={props.style}>
        <ul className={getElement(`list`)}>
          <li
            className={
              !pagination.previousPage
                ? `${getElement(`item`)} ${getModifier(`previous`, `item`)}`
                : `${getElement(`item`)} ${getModifier(
                    `previous`,
                    `item`
                  )} ${getModifier(`selectable`, `item`)}`
            }
            tabIndex={-1}
            onClick={
              pagination.previousPage ? event => handlePrevious(event) : null
            }
            onKeyDown={handleKeyDown}>
            <Icon type="arrow-left" />
            <span className={getElement(`label`)}>Prev</span>
          </li>
        </ul>
        <ul
          ref={listRef}
          className={getElement(`list`)}
          style={{ width: state.width }}>
          <div
            className={getElement(`highlight`)}
            style={{
              transform: `translateX(${state.highlightCoords})`
            }}
            aria-hidden={true}
          />
          {pagination.pages.map(page => (
            <li
              key={page}
              className={`${getElement(`item`)} ${getModifier(
                `selectable`,
                `item`
              )}${
                getPageStatus(page)
                  ? ` ${addNamespace(getPageStatus(page))}`
                  : ``
              }${state.currentPage === page ? ` active` : ``}`}
              tabIndex={state.currentPage === page ? 0 : -1}
              onClick={handleClick}
              onKeyDown={handleKeyDown}
              data-page-number={page}>
              {page}
            </li>
          ))}
          <li className={getElement(`item`)}>of</li>
          <li
            className={`${getElement(`item`)} ${getModifier(
              `selectable`,
              `item`
            )}`}
            onClick={handleClick}
            tabIndex={-1}
            data-page-number={totalPages}>
            {totalPages}
          </li>
        </ul>
        <ul className={getElement(`list`)}>
          <li
            className={`${getElement(`item`)} ${getModifier(`next`, `item`)} ${
              pagination.nextPage ? getModifier(`selectable`, `item`) : ``
            }`}
            tabIndex={-1}
            onClick={pagination.nextPage ? event => handleNext(event) : null}
            onKeyDown={handleKeyDown}>
            <Icon type="arrow-right" />
            <span className={getElement(`label`)}>Next</span>
          </li>
        </ul>
      </div>
    );
  }
}

export { Pagination as default };
