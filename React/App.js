import React, { Component } from 'react';
import Toc from "./components/TOC";
import ReadContent from './components/ReadContent';
import Subject from './components/Subject';
import Control from './components/Control';
import './App.css';
import CreateContent from './components/CreateContent';
import UpdateContent from './components/UpdateContent';

class App extends Component {
  constructor(props) {
    super(props);
    this.max_content_id = 3;
    this.state = {
      mode: "welcome",
      selected_content_id:2,
      Subject: {title: "WEB", sub:"World Wide Web!"},
      welcome:{title:"Welcome", desc:"Hello, React!!"},
      Content: [
        {id:1, title:"HTML", desc:"HTML is for information"},
        {id:2, title:"CSS", desc:"CSS is for design"},
        {id:3, title:"JavaScript", desc:"JavaScript is for interactive"}
      ]
    }
  }
  getReadContent() {
    var i = 0;
    while(i < this.state.Content.length) {
      var data = this.state.Content[i];
      if(data.id === this.state.selected_content_id) {
        return data
      }
      i = i + 1;
    }
  }
  getContent() {
    var _title, _desc, _article = null;
    if(this.state.mode === "welcome") {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>
    }
    else if(this.state.mode === "read") {
      var _Content = this.getReadContent()
      _article = <ReadContent title={_Content.title} desc={_Content.desc}></ReadContent>
    }
    else if(this.state.mode === 'create') {
      _article = <CreateContent onSubmit={function(_title, _desc){
          this.max_content_id = this.max_content_id + 1;
          //this.state.Content.concat(
          //  {id:this.max_content_id, title:_title, desc:_desc}
          //)
          var _Content = this.state.Content.concat({id:this.max_content_id, title:_title, desc:_desc})
          this.setState({
            Content:_Content,
            mode:'read',
            selected_content_id:this.max_content_id
          })
      }.bind(this)}></CreateContent>
    }
    else if(this.state.mode === 'update') {
      _Content = this.getReadContent();
      _article = <UpdateContent data={_Content} onSubmit={
        function(_id, _title, _desc){
          var _Content = Array.from(this.state.Content);
          var i = 0;
          while(i < _Content.length) {
            if(_Content[i].id === _id) {
              _Content[i] = {
                id:_id, title:_title, desc:_desc
              };
              break;
            }
            i = i + 1;
          }
          this.setState({
            Content:_Content,
            mode:'read'
          })
        }.bind(this)}></UpdateContent>
    }
    return _article;
  }
  render() {
    return (
      <div className="App">
        <Subject
          title={this.state.Subject.title}
          sub={this.state.Subject.sub}
          onChangePage={function() {
            this.setState({mode:'welcome'})
          }.bind(this)}
        >
        </Subject>
        <Toc
          onChangePage={function(id){
            this.setState({
              mode:'read',
              selected_content_id:Number(id)
          });
        }.bind(this)}
        data={this.state.Content}
        ></Toc>
        <Control onChangeMode={function(_mode){
          if(_mode === 'delete') {
            if(window.confirm('really')){
              var _Content = Array.from(this.state.Content);
              var i = 0;
              while(i < _Content.length) {
                if(_Content[i].id === this.state.selected_content_id){
                  _Content.splice(i, 1);
                  break;
                }
                i = i + 1;
              }
              this.setState({
                Content:_Content,
                mode:'welcome'
              })
            }
          }
          else {
            this.setState({
              mode:_mode
            });
          }
          this.setState({mode:_mode})
        }.bind(this)}></Control>
        {this.getContent()}
      </div>
    );
  }
}

export default App;
