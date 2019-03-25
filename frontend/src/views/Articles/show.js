import env from '../../environment/index';

import React, { Component } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import { withRouter } from 'react-router';


class ArticleDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: '',
            title: '',
            remark: ''
        };
      this.delete = this.delete.bind(this);
    }

    delete() {
      if(window.confirm('Are you sure?')){
        const axios = require('axios');
        let url = env.API_ORIGIN + 'articles/api/';
        // let csrftoken = document.getElementsByName('csrfmiddlewaretoken')[0].value;
        // let headers = {'X-CSRFToken': csrftoken};

        axios.delete(url + this.state.id)
        .then((results) => {
          this.props.history.push('/articles')
        })
        .catch((data) =>{
          alert('記事の削除の失敗しました。');
        })
      }
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        const axios = require('axios');
        axios.get(env.API_ORIGIN + `articles/api/${id}`)
        .then((results) => {
            this.setState(results.data);
            let breadcrumb = [['ホーム', '']];
            let submenu = [];
            this.props.setBreadcrumb(breadcrumb, submenu);
        })
        .catch((data) =>{
          alert('記事の取得の失敗しました。');
        })
    }

    render() {
      return (
        <div className="animated fadeIn">
            <Card>
                <CardHeader>
                  {this.state.title}
                  <label className="float-right mb-0">
                    <div onClick={this.delete}><small>削除</small></div>
                  </label>
                </CardHeader>
                <CardBody>
                    <span dangerouslySetInnerHTML={{__html: this.state.content}}></span>
                </CardBody>
            </Card>
        </div>
    );
  }
}

export default ArticleDetail;
