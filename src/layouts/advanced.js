import React from 'react';
import _ from 'lodash';

import components, {Layout} from '../components/index';

export default class Advanced extends React.Component {
    render() {
        return (
            <Layout {...this.props}>
            {(!_.get(this.props, 'page.hide_title', null)) && (
            <header className="page-header inner-sm outer">
              <h1 className="page-title line-top">{_.get(this.props, 'page.title', null)}</h1>
            </header>
            )}
            {_.map(_.get(this.props, 'page.sections', null), (section, section_idx) => {
                let component = _.upperFirst(_.camelCase(_.get(section, 'type', null)));
                let Component = components[component];
                return (
                  <Component key={section_idx} {...this.props} section={section} site={this.props} />
                )
            })}
            </Layout>
        );
    }
}
