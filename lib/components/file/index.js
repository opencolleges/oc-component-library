import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { prefix, uniqueId, find, remove, byteSize } from '../utilities';

import OCIcon from '../icon';
import OCProgress from '../progress';

class OCFile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: uniqueId(),
      multiple: find('file--multiple', this.props.modifiers),
      active: false,
      selected: false,
      files: []
    };
  }

  handleDragEnter = () => {
    this.setState({ active: true });
  };

  handleDrop = event => {
    this.setState({ active: false });
    event.preventDefault();

    Promise.resolve(this.getItemsFromEvent(event)).then(fileList => {
      let result = [];
      for (let index = 0; index < fileList.length; index++) {
        const fileName = fileList[index].name;
        const fileSize = byteSize(fileList[index].size);

        result.push({ name: fileName, size: fileSize });
      }

      this.setState({
        files: result
      });

      result.length
        ? this.setState({ selected: true })
        : this.setState({ selected: false });
    });
  };

  handleDragLeave = () => {
    this.setState({ active: false });
  };

  getItemsFromEvent = event => {
    let fileList = [];

    if (event.dataTransfer) {
      const dt = event.dataTransfer;

      if (dt.files && dt.files.length) {
        fileList = dt.files;
      } else if (dt.items && dt.items.length) {
        fileList = dt.items;
      }
    } else if (event.target && event.target.files) {
      fileList = event.target.files;
    }

    return fileList;
  };

  handleClick = event => {
    event.preventDefault();

    this.setState({
      files: []
    });
  };

  render() {
    const { props, state, handleDragEnter, handleDrop, handleDragLeave } = this;

    const modifiers = remove(['file--multiple'], props.modifiers);

    return (
      <div
        className={
          !modifiers ? prefix('file') : `${prefix(`file ${modifiers}`)}`
        }>
        <div className={prefix('file__outer')} onDragEnter={handleDragEnter}>
          <input
            id={state.id}
            className={
              !state.active
                ? prefix('file__input')
                : prefix('file__input active')
            }
            type="file"
            multiple={state.multiple}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            name={props.name}
            onChange={handleDrop}
            onDragEnter={event => event.preventDefault()}
            onDragOver={event => event.preventDefault()}
          />
          <div className={prefix('file__inner')}>
            <div className={prefix('file__image')}>
              <OCIcon modifiers="icon--cloud-upload" />
            </div>
            <span className={prefix('file__blurb')}>
              <strong className={prefix('strong')}>
                {`Drag and drop ${!state.multiple ? 'a file' : 'files'}`}
              </strong>
              <br />
              or
            </span>
            <label htmlFor={state.id} className={prefix('file__label')}>
              {`Select ${!state.multiple ? 'a file' : 'files'}`}
            </label>
            <span className={prefix('file__types')}>{`${
              !state.selected
                ? props.fileTypes.join(', ')
                : `${state.files.length} ${
                    state.files.length > 1 ? 'files' : 'file'
                  } uploaded`
            }`}</span>
          </div>
        </div>
        <div className={prefix('file__meta')}>
          {state.files.length !== 0 && (
            <table className={prefix('table')}>
              <thead className={prefix('thead')}>
                <tr className={prefix('tr')}>
                  <th className={prefix('th')}>Name</th>
                  <th className={prefix('th')}>Size</th>
                  <th className={prefix('th')}>Status</th>
                </tr>
              </thead>
              <tbody className={prefix('tbody')}>
                {state.files.map((file, index) => (
                  <tr className={prefix('tr')} key={index}>
                    <td className={prefix('td')}>{file.name}</td>
                    <td className={prefix('td')}>{file.size}</td>
                    <td className={prefix('td')}>
                      {/* <OCStatus /> */}
                      <OCProgress state="inprogress" percentage={20} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    );
  }
}

OCFile.propTypes = {
  modifiers: PropTypes.string,
  name: PropTypes.string,
  fileTypes: PropTypes.oneOfType([PropTypes.array, PropTypes.string])
};

OCFile.defaultProps = {
  fileTypes: 'All file types are supported'
};

export default OCFile;
