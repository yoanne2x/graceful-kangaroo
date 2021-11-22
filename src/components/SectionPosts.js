import React from 'react';
import _ from 'lodash';
import moment from 'moment-strftime';

import {htmlToReact, classNames, getPages, Link, withPrefix} from '../utils';
import CtaButtons from './CtaButtons';

export default class SectionPosts extends React.Component {
    render() {
        let section = _.get(this.props, 'section', null);
        let display_posts = _.orderBy(getPages(this.props.pages, '/blog'), 'date', 'desc');
        let recent_posts = display_posts.slice(0, _.get(section, 'posts_number', null));
        return (
            <section id={_.get(section, 'section_id', null)} className="block block-posts outer">
              <div className="inner">
                {(_.get(section, 'title', null) || _.get(section, 'subtitle', null)) && (
                <div className="block-header inner-sm">
                  {_.get(section, 'title', null) && (
                  <h2 className="block-title line-top">{_.get(section, 'title', null)}</h2>
                  )}
                  {_.get(section, 'subtitle', null) && (
                  <p className="block-subtitle">{htmlToReact(_.get(section, 'subtitle', null))}</p>
                  )}
                </div>
                )}
                <div className="block-content">
                  <div className={classNames('post-feed', 'grid', {'grid-col-2': _.get(section, 'col_number', null) === 'two', 'grid-col-3': _.get(section, 'col_number', null) === 'three'})}>
                    {_.map(recent_posts, (post, post_idx) => (
                    <article key={post_idx} className="post grid-item">
                      <div className="post-inside">
                        {_.get(post, 'thumb_image', null) && (
                        <Link className="post-thumbnail" href={withPrefix(_.get(post, 'stackbit_url_path', null))}>
                          <img src={withPrefix(_.get(post, 'thumb_image', null))} alt={_.get(post, 'thumb_image_alt', null)} />
                        </Link>
                        )}
                        <header className="post-header">
                          <h3 className="post-title"><Link href={withPrefix(_.get(post, 'stackbit_url_path', null))} rel="bookmark">{_.get(post, 'title', null)}</Link>
                          </h3>
                          <div className="post-meta">
                            <time className="published"
                              dateTime={moment(_.get(post, 'date', null)).strftime('%Y-%m-%d %H:%M')}>{moment(_.get(post, 'date', null)).strftime('%B %d, %Y')}</time>
                          </div>
                        </header>
                        {_.get(post, 'excerpt', null) && (
                        <p className="post-content">
                          {_.get(post, 'excerpt', null)}
                        </p>
                        )}
                      </div>
                    </article>
                    ))}
                  </div>
                </div>
                {_.get(section, 'actions', null) && (
                <div className="block-buttons inner-sm">
                  <CtaButtons {...this.props} actions={_.get(section, 'actions', null)} />
                </div>
                )}
              </div>
            </section>
        );
    }
}
