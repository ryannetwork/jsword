import React, { Component } from 'react';
import { Badge, Card, CardBody, CardFooter, CardHeader, Col, Row, Collapse, Fade } from 'reactstrap';

class Article extends Component {
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
        axios.get(`http://localhost:8000/articles/api/${id}`)
            .then((results) => {
                console.log(results);
                this.setState(results.data);
                // this.props.setBreadcrumb(results.data.breadcrumb, results.data.submenu);
            })
            .catch((data) =>{
                console.log(data);
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

export default Article;
