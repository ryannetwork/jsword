import './index.scss';
import env from '../../environment/index';

import React, { Component } from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';


class ArticleForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      title: '',
      content: '',
      errors: {}
    };
    this.toggle = this.toggle.bind(this);
    this.save = this.save.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {

    if(this.props.article_id) {
      const axios = require('axios');
      axios.get(env.API_ORIGIN + `articles/api/${this.props.article_id}`)
      .then((results) => {
          this.setState(results.data);
      })
      .catch((data) =>{
          console.log(data);
      })
    }
  }

  submit(article_id) {
    const axios = require('axios');
    let params = {'title': this.state.title, 'content': this.state.content};
    let url = env.API_ORIGIN + 'articles/api/';

    if(article_id) {
      url += article_id + '/';
      return axios.put(url, params);
    } else {
      return axios.post(url, params);
    }
  }

  save() {
    this.submit(this.props.article_id)
    .then((results) => {
      if(this.props.article_id) {
        this.setState({error: ''});
      } else {
        this.setState({title: '', content: '', 'error': ''});
      }
      this.toggle();
      this.props.callback();
    })
    .catch((data) =>{
      this.setState({errors: data['response']['data']});
    });
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  class_name(column, errors) {
    if(errors[column]) {
      return 'form-control is-invalid';
    } else {
      return 'form-control';
    }
  }

  error_message(column, errors) {
    if(errors[column]) {
      return (
        <div className="invalid-feedback">
          {this.state.errors[column] .join(', ')}
        </div>
      );
    }
  }

  render() {
     return (
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>{this.props.modal_title}</ModalHeader>
          <ModalBody>
            <div className="form-group">
              <input name="title" type="text" placeholder="タイトル" value={this.state.title}
                     onChange={this.handleChange} className={this.class_name('title', this.state.errors)} />
              {this.error_message('title', this.state.errors)}
            </div>
            <div className="form-group">
              <textarea name="content" id="" cols="30" rows="20" placeholder="本文..." value={this.state.content}
                        onChange={this.handleChange} className={this.class_name('content', this.state.errors)}></textarea>
              {this.error_message('content', this.state.errors)}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.save}>保存</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>ｷｬﾝｾﾙ</Button>
          </ModalFooter>
        </Modal>
    );
  }
}


export default ArticleForm;
