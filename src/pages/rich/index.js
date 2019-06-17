import React, { Component } from "react";
import { Card, Button, Modal } from "antd";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
class Rich extends Component {
  state = {
    showRichText: false,
    editorState: ""
  };
  onEditorStateChange = editorState => {
    this.setState({
      editorState
    });
  };
  handerClear = editorState => {
    this.setState({
      editorState: ""
    });
  };
  handerGet = () => {
    this.setState({
      showRichText: true
    });
  };
  contentchange = contentchange => {
    this.setState({
      contentchange
    });
  };
  render() {
    const { editorState } = this.state;
    return (
      <div>
        <Card>
          <Button onClick={this.handerClear} type="primary">
            清空内容
          </Button>
          <Button onClick={this.handerGet} type="primary">
            获取html内容
          </Button>
        </Card>
        <Card title="富文本">
          <Editor
            editorState={editorState}
            onContentStateChange={this.contentchange}
            onEditorStateChange={this.onEditorStateChange}
          />
        </Card>
        <Modal
          title="富文本"
          visible={this.state.showRichText}
          onCancel={() => {
            this.setState({ showRichText: false });
          }}
          footer={null}
        >
          {draftToHtml(this.state.contentchange)}
        </Modal>
      </div>
    );
  }
}

export default Rich;
