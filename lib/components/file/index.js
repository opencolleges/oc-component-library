// * React imports
import PropTypes from 'prop-types';
import React from 'react';

// * sibling imports
import OCIcon from '../icon';
import OCProgress from '../progress';

// * utility imports
import getBytes from '../utils/getBytes';
import getExtension from '../utils/getExtension';
import prefix from '../utils/prefix';
import getId from '../utils/getId';

// * React component
class OCFile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      selected: false,
      files: []
    };

    this.id = props.id ? props.id : getId();

    this.fileTypes = [];

    if (typeof props.fileTypes !== 'undefined') {
      if (typeof props.fileTypes === 'object' && props.fileTypes.length > 0) {
        props.fileTypes.map(value => this.fileTypes.push(value));
      }

      if (typeof props.fileTypes === 'string' && props.fileTypes !== '') {
        this.fileTypes = props.fileTypes.split(',');
      }
    }
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
        const fileSize = getBytes(fileList[index].size);
        if (this.fileTypes.length === 0) {
          result.push({ name: fileName, size: fileSize });
        } else {
          if (this.fileTypes.indexOf(getExtension(fileName)) !== -1) {
            result.push({ name: fileName, size: fileSize });
          } else {
            console.log(fileName + ' filename is not valid');
          }
        }
      }

      this.setState({
        files: result
      });

      result.length
        ? this.setState({ selected: true })
        : this.setState({ selected: false });
    });

    // this.props.onChange(this.props.name, this.props.value);
  };

  handleDragLeave = () => {
    this.setState({ active: false });
  };

  getItemsFromEvent = event => {
    const target = event.target || event.srcElement;
    let fileList = [];

    if (event.dataTransfer) {
      const dt = event.dataTransfer;

      if (dt.files && dt.files.length) {
        fileList = dt.files;
      } else if (dt.items && dt.items.length) {
        fileList = dt.items;
      }
    } else if (target && target.files) {
      fileList = target.files;
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
    const {
      props,
      state,
      id,
      fileTypes,
      handleDragEnter,
      handleDrop,
      handleDragLeave
    } = this;

    return (
      <div
        className={
          !props.modifiers
            ? prefix('file')
            : `${prefix(`file ${props.modifiers}`)}`
        }>
        <div className={prefix('file__outer')} onDragEnter={handleDragEnter}>
          <input
            id={id}
            className={
              !state.active
                ? prefix('file__input')
                : prefix('file__input active')
            }
            type="file"
            multiple={props.multiple}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            name={props.name}
            onChange={handleDrop}
            onDragEnter={event => event.preventDefault()}
            onDragOver={event => event.preventDefault()}
          />
          <div className={prefix('file__inner')}>
            <div className={prefix('file__image')}>
              <OCIcon modifiers="icon--cloud-upload active" />
            </div>
            <span className={prefix('file__blurb')}>
              <strong className={prefix('strong')}>
                {`Drag and drop ${!props.multiple ? 'a file' : 'files'}`}
              </strong>
              <br />
              or
            </span>
            <label htmlFor={id} className={prefix('file__label')}>
              {`Select ${!props.multiple ? 'a file' : 'files'}`}
            </label>
            <span className={prefix('file__types')}>{`${
              !state.selected
                ? fileTypes.join(', ')
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
                      <OCProgress progress={20} />
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
  name: PropTypes.string,
  id: PropTypes.string,
  modifiers: PropTypes.string,
  fileTypes: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  multiple: PropTypes.bool,
  onChange: PropTypes.func
};

OCFile.defaultProps = {
  fileTypes: 'jpg, jpeg, png, pdf'
};

export default OCFile;
