import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import Icon from '../icon';
import Progress from '../progress';
import Table from '../table';
import TableBody from '../table-body';
import TableRow from '../table-row';
import TableCell from '../table-cell';
import BEM from '../utilities/ts/bem';
import getBytes from '../utilities/ts/getBytes';
import getExtension from '../utilities/ts/getExtension';
import getId from '../utilities/ts/get-id';
import namespace from '../utilities/ts/namespace';
import remove from '../utilities/ts/remove';
import isUndefined from '../utilities/ts/is-undefined';

class File extends React.Component {
  constructor(props) {
    super(props);

    this.fileRef = React.createRef();
    this.id = props.id ? props.id : getId();

    this.state = {
      active: false,
      files: props.files.length > 0 ? props.files : [],
      error: _.includes(_.split(this.props.modifiers, ` `), `file--error`),
      success: _.includes(_.split(this.props.modifiers, ` `), `file--success`)
    };
  }

  componentDidUpdate(previousProps, previousState) {
    if (this.props.modifiers !== previousProps.modifiers) {
      this.setState({
        error: _.includes(_.split(this.props.modifiers, ` `), `file--error`),
        success: _.includes(_.split(this.props.modifiers, ` `), `file--success`)
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

    if (isUndefined(e.dataTransfer)) {
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
              message: `Invalid file type`,
              modifiers: `progress--error`
            });
          } else if (!this.isValidFileSize(newFile.size)) {
            files.push({
              name: newFile.name,
              size: newFile.size,
              progress: 0,
              message: `File exceeds ${getBytes(this.props.fileSize)}`,
              modifiers: `progress--error`
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
    fileRef.value = ``;
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

    const modifiers = remove([`error`, `success`], props.modifiers);

    const bem = BEM(`file`);
    bem.addModifiers(modifiers);
    bem.addModifiers(state.error ? `error` : ``);
    bem.addModifiers(state.success ? `success` : ``);
    bem.addClassNames(props.className);

    return (
      <div className={bem.getResult()} style={props.style}>
        <div className={bem.getElement(`outer`)} onDragEnter={handleDragEnter}>
          <input
            ref={fileRef}
            id={id}
            className={`${bem.getElement(`input`)}${
              state.active ? ` active` : ``
            }`}
            type="file"
            multiple={props.multiple}
            onDragLeave={handleDragLeave}
            onDrop={handleChange}
            name={props.name}
            onChange={handleChange}
            onDragEnter={e => e.preventDefault()}
            onDragOver={e => e.preventDefault()}
          />
          <div className={bem.getElement(`inner`)}>
            <div className={bem.getElement(`image`)}>
              <Icon type="cloud-upload" />
            </div>
            <span className={bem.getElement(`description`)}>
              <strong className={namespace(`strong`)}>
                {`Drag and drop ${props.multiple ? `files` : `a file`}`}
              </strong>
              <br />
              or
            </span>
            <label htmlFor={id} className={bem.getElement(`label`)}>
              {`Select ${props.multiple ? `files` : `a file`}`}
            </label>
            <span className={bem.getElement(`types`)}>{`${
              state.selected
                ? `${state.files.length} ${
                    state.files.length > 1 ? `files` : `file`
                  } added`
                : props.fileTypes.join(`, `)
            }`}</span>
          </div>
        </div>
        {(state.error || state.success) && props.message && (
          <span className={bem.getElement(`message`)}>{props.message}</span>
        )}
        {state.files.length !== 0 && (
          <div className={bem.getElement(`list`)}>
            <Table>
              <TableBody>
                {state.files.map(file => (
                  <TableRow key={file.name} modifiers={bem.getElement(`item`)}>
                    <TableCell>
                      <span className={bem.getElement(`name`)}>
                        {file.name}
                        {` `}
                      </span>
                      <span className={bem.getElement(`size`)}>
                        {getBytes(file.size)}
                      </span>
                    </TableCell>
                    <TableCell modifiers="middle" style={{ width: `33.333%` }}>
                      <Progress
                        progress={file.progress}
                        message={file.message}
                        modifiers={
                          file.modifiers
                            ? `compact ${file.modifiers}`
                            : `compact`
                        }
                      />
                    </TableCell>
                    <TableCell modifiers="middle" width={40}>
                      <button
                        className={bem.getElement(`button`)}
                        title="Remove"
                        onClick={e => handleClick(e, file.name)}>
                        <Icon type="close" />
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
  message: PropTypes.string,
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
  fileTypes: [`jpg`, `jpeg`, `png`, `pdf`],
  multiple: false,
  onChange: () => {},
  onRemove: () => {}
};

export { File as default };
