import './index.scss';
import env from '../../environment/index';

import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import ArticleForm from './form'


class AddArticle extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.refs.form.toggle();
  }

  render() {
    return (
      <div className="animated fadeIn">
        <div onClick={this.toggle} className="btn">新規作成</div>
        <ArticleForm ref='form' callback={this.props.callback} modal_title="記事作成" className="modal-xl" />
      </div>
    );
  }
}

class EditArticle extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.refs.form.toggle();
  }

  render() {
    return (
      <React.Fragment>
        <label className="float-right">
          <div onClick={this.toggle}><small>編集</small></div>
        </label>
        <ArticleForm ref='form' article_id={this.props.article_id} callback={this.props.callback}
                     modal_title="記事編集" className="modal-xl" />
      </React.Fragment>
    );
  }
}

class ArticleList extends Component {
  constructor(props) {
    super(props);

    this.update_list = this.update_list.bind(this);
    this.state = {
      articles: []
    };
  }

  update_list() {
    const axios = require('axios');
    axios.get(env.API_ORIGIN + 'articles/api/')
    .then((results) => {
        this.setState({articles: results.data});
    })
    .catch((data) =>{
      alert('記事一覧の取得の失敗しました。');
    })
  }

  componentDidMount() {
    let breadcrumb = [['ホーム', '']];
    let submenu = [{type: 'component', component: AddArticle, props: {callback: this.update_list}}];
    this.props.setBreadcrumb(breadcrumb, submenu);
    this.update_list()
  }

  render() {
    const list = this.state.articles.map((article, index) => {
      return  (
      <Col xs="12" sm="4" md="3">
        <Card className="article">
            <CardHeader className="header">
              <div className="title">{article.title}</div>
              <EditArticle article_id={article.id} callback={this.update_list} ></EditArticle>
            </CardHeader>
            <Link to={`/articles/${article.id}`} className="linked-card">
              <CardBody className="content">
               {article.content}
              </CardBody>
            </Link>
        </Card>
      </Col>
      );
    });

    return (
      <div className="animated fadeIn">
        <Row>
          {list}
        </Row>
      </div>
    );
  }
}

ArticleList.propTypes = {
    setSubmenu: PropTypes.func
};

export default ArticleList;
