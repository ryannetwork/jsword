import React, {Component} from 'react';
import {Link} from "react-router-dom";


class JBreadcrumb extends Component {
    render() {
        return (
          <nav className="" aria-label="breadcrumb">
            <ol className="breadcrumb">
                {this.props.breadcrumb.map((menu, idx) => {
                    return (
                      <li className="breadcrumb-item">
                        {menu}
                      </li>
                      );
                    })
                }
                <li className="breadcrumb-menu d-md-down-none">
                    <div className="btn-group">
                    {this.props.submenu.map((menu, idx) => {
                        if(menu['type'] == 'label') {
                            return (
                              <div className="btn">
                                  {menu['label']}
                              </div>
                            );
                        } else if(menu['type'] == 'link') {
                            return (
                             <Link to={menu['path']} className="btn">
                                  {menu['label']}
                             </Link>
                            );
                        } else if(menu['type'] == 'event') {
                            return (
                             <div to={menu['path']} onClick={menu['event']} className="btn">
                                  {menu['label']}
                             </div>
                            );
                        } else if(menu['type'] == 'component') {
                            return (
                             React.createElement(menu['component'], menu['props'])
                            );
                        }
                    })
                    }
                    </div>
                </li>
            </ol>
          </nav>
        );
    }
}

export default JBreadcrumb;
