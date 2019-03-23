import env from '../../environment/index';

import React, { Component } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';

class ArticleDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: '',
            title: '',
            remark: ''
        };
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
