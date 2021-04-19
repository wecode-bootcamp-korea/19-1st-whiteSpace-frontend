import React, { Component } from 'react';

export default class ReviewTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      changedFileIndex: -1,
    };
    this.fileUploaderRef = React.createRef();
  }
  fileUpload = e => {
    let changedFile = e.target.files[0];
    let uploadedFiles = e.target.files;
    if (this.state.changedFileIndex >= 0) {
      this.setState(prevState => {
        const list = [];
        prevState.files.map((file, i) => {
          if (i === prevState.changedFileIndex) list.push(changedFile);
          else list.push(file);
        });
        return {
          files: list,
          changedFileIndex: -1,
        };
      });
    } else if (this.state.files.length > 0) {
      this.setState(prevState => {
        return { files: [...prevState.files, ...uploadedFiles] };
      });
    } else this.setState({ files: [...e.target.files] });
  };
  Change(index, file) {
    console.log('Change Function');
    this.setState({ changedFileIndex: index });
    this.fileUploaderRef.current.click();
  }
  Delete(name) {
    this.setState(prevState => {
      const list = [];
      prevState.files.map((file, i) => {
        if (file.name !== name) {
          list.push(file);
        }
      });
      return {
        files: list,
        changedFileIndex: -1,
      };
    });
  }
  render() {
    return (
      <div className="Browse">
        <input
          type="file"
          multiple="multiple"
          id="file"
          ref={this.fileUploaderRef}
          onChange={this.fileUpload}
        />
        <table className="filesName">
          <tbody>
            {this.state.files.map((file, i) => (
              <tr key={i}>
                <th style={{ textAlign: 'left' }}>{file.name} :</th>
                <th>
                  <button type="file" onClick={() => this.Change(i)}>
                    Change
                  </button>
                </th>
                <th>
                  <button onClick={() => this.Delete(file.name)}>Delete</button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
