// * React imports
import PropTypes from 'prop-types';
import React from 'react';

import * as _ from 'lodash';

import NAMESPACE from '../utilities/js/constants';

import getBytes from '../utilities/js/getBytes';
import getExtension from '../utilities/js/getExtension';
import find from '../utilities/js/find';
import namespace from '../utilities/js/namespace';
import remove from '../utilities/js/remove';

import Icon from '../icon';
import Table from '../table';
import TableBody from '../table-body';
import TableRow from '../table-row';
import TableCell from '../table-cell';
import Progress from '../progress';

export default class File extends React.Component {
  constructor(props) {
    super(props);

    this.fileRef = React.createRef();
    this.id = props.id ? props.id : _.uniqueId(`${NAMESPACE}-`);

    this.state = {
      active: false,
      files: props.files.length > 0 ? props.files : [],
      error: find('file--error', this.props.modifiers),
      success: find('file--success', this.props.modifiers)
    };
  }

  componentDidUpdate(previousProps, previousState) {
    if (this.props.modifiers !== previousProps.modifiers) {
      this.setState({
        error: find('file--error', this.props.modifiers),
        success: find('file--success', this.props.modifiers)
      });
    }

    if (this.state.files.length !== previousState.files.length) {
      this.setState({
        error: false,

        success: false
      });
    }

    if (previousProps.files !== this.props.files) {
      const prevFiles = [...this.state.files];

      for (let i = 0; i < this.props.files.length; i++) {
        const file = this.props.files[i];

        let addFile = true;

        for (let i = 0; i < prevFiles.length; i++) {
          const prevFile = prevFiles[i];

          if (file.name === prevFile.name) {
            addFile = false;

            if (file.progress !== prevFile.progress) {
              prevFile.progress = file.progress;
            }
          }
        }

        if (addFile) {
          prevFiles.push(file);
        }
      }
      this.setState({ files: prevFiles });
    }
  }

  handleDragEnter = () => {
    this.setState({ active: true });
  };

  handleDragLeave = () => {
    this.setState({ active: false });
  };

  isValidFileSize = size => {
    if (size <= this.props.fileSize) return true;

    return false;
  };

  isValidFileType = name => {
    if (this.props.fileTypes.indexOf(getExtension(name.toLowerCase())) !== -1)
      return true;

    return false;
  };

  handleChange = e => {
    // e.preventDefault();
    // e.stopPropagation();

    let newFiles;
    const fileRef = this.fileRef.current;

    if (typeof e.dataTransfer !== 'undefined') {
      newFiles = e.dataTransfer.files;
    } else {
      newFiles = fileRef.files;
    }

    const files = [...this.state.files];
    const callbackFiles = [];

    if (this.props.multiple || this.state.files.length === 0) {
      for (let i = 0; i < newFiles.length; i++) {
        const newFile = newFiles[i];

        let addFile = true;

        for (let i = 0; i < files.length; i++) {
          const file = files[i];

          if (newFile.name === file.name) {
            addFile = false;

            break;
          }
        }

        if (addFile) {
          if (!this.isValidFileType(newFile.name)) {
            files.push({
              name: newFile.name,
              size: newFile.size,
              progress: 0,
              message: 'Invalid file type',
              modifiers: 'progress--error'
            });
          } else if (!this.isValidFileSize(newFile.size)) {
            files.push({
              name: newFile.name,
              size: newFile.size,
              progress: 0,
              message: `File exceeds ${getBytes(this.props.fileSize)}`,
              modifiers: 'progress--error'
            });
          } else {
            files.push({
              name: newFile.name,
              size: newFile.size,
              progress: 0
            });

            callbackFiles.push(newFile);
          }
        }
        if (addFile && !this.props.multiple) break;
      }
    } else {
      // console.log('else condition');
    }

    callbackFiles.length && this.props.onChange(callbackFiles, this.props.name);
    this.setState({ active: false, files: files });

    // * Manually empty the FileList object to force the onChange() method to
    // *  fire if the same file has been uploaded a second time.
    fileRef.value = '';
  };

  handleClick = (e, fileName) => {
    e.preventDefault();
    e.stopPropagation();

    const files = [...this.state.files];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (file.name === fileName) {
        files.splice(i, 1);

        this.props.onRemove(file);
        break;
      }
    }

    this.setState({ files: files });
  };

  render() {
    const {
      props,
      state,
      fileRef,
      id,
      handleDragEnter,
      handleChange,
      handleDragLeave,
      handleClick
    } = this;

    const modifiers = remove(['file--error', 'file--success'], props.modifiers);

    let classNames = namespace('file');

    modifiers && (classNames += ` ${namespace(modifiers)}`);

    state.error && (classNames += ` ${namespace('file--error')}`);
    state.success && (classNames += ` ${namespace('file--success')}`);

    props.className && (classNames += ` ${props.className}`);

    return (
      <div className={classNames} style={props.style}>
        <div className={namespace('file__outer')} onDragEnter={handleDragEnter}>
          <input
            ref={fileRef}
            id={id}
            className={
              !state.active
                ? namespace('file__input')
                : namespace('file__input active')
            }
            type="file"
            multiple={props.multiple}
            onDragLeave={handleDragLeave}
            onDrop={handleChange}
            name={props.name}
            onChange={handleChange}
            onDragEnter={event => event.preventDefault()}
            onDragOver={event => event.preventDefault()}
          />
          <div className={namespace('file__inner')}>
            <div className={namespace('file__image')}>
              <Icon modifiers="icon--cloud-upload active" />
            </div>
            <span className={namespace('file__description')}>
              <strong className={namespace('strong')}>
                {`Drag and drop ${!props.multiple ? 'a file' : 'files'}`}
              </strong>
              <br />
              or
            </span>
            <label htmlFor={id} className={namespace('file__label')}>
              {`Select ${!props.multiple ? 'a file' : 'files'}`}
            </label>
            <span className={namespace('file__types')}>{`${
              !state.selected
                ? props.fileTypes.join(', ')
                : `${state.files.length} ${
                    state.files.length > 1 ? 'files' : 'file'
                  } added`
            }`}</span>
          </div>
        </div>
        {(state.error || state.success) && props.message && (
          <span className={namespace('file__message')}>{props.message}</span>
        )}
        {state.files.length !== 0 && (
          <div className={namespace('file__list')}>
            <Table>
              <TableBody>
                {state.files.map(file => (
                  <TableRow key={file.name} modifiers="file__item">
                    <TableCell>
                      <span className={namespace('file__name')}>
                        {file.name}{' '}
                      </span>
                      <span className={namespace('file__size')}>
                        {getBytes(file.size)}
                      </span>
                    </TableCell>
                    <TableCell modifiers="td--middle" width="33.333%">
                      <Progress
                        progress={file.progress}
                        message={file.message}
                        modifiers={
                          !file.modifiers
                            ? 'progress--compact'
                            : `progress--compact ${file.modifiers}`
                        }
                      />
                    </TableCell>
                    <TableCell modifiers="td--middle" width={40}>
                      <button
                        className={namespace('file__button')}
                        title="Remove"
                        onClick={e => handleClick(e, file.name)}>
                        <Icon modifiers="icon--close active" />
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    );
  }
}

File.propTypes = {
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  id: PropTypes.string,
  modifiers: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  files: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      size: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
        .isRequired,
      progress: PropTypes.number.isRequired
    })
  ),
  fileSize: PropTypes.number,
  fileTypes: PropTypes.array,
  multiple: PropTypes.bool,
  onChange: PropTypes.func,
  onRemove: PropTypes.func
};

File.defaultProps = {
  files: [],
  fileSize: 10485760,
  fileTypes: ['jpg', 'jpeg', 'png', 'pdf'],
  multiple: false,
  onChange: () => {},
  onRemove: () => {}
};
