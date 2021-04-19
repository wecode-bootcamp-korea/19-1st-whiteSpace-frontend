import React, { Component } from 'react';
import './CorpLi.scss';

export class CorpLi extends Component {
  // constructor() {
  //   super(props);
  // }

  render() {
    const { liData, fontSize } = this.props;
    return (
      <ul className={fontSize === 'fontSize07' ? 'fontSize07' : 'fontSize08'}>
        {liData.map(corpLi => (
          <li key={corpLi.id}>
            <span>{corpLi.title}</span>
            {/* http로 시작하는 url 문자열은 a 태그로 주소 링크 시켜줌 */}
            {corpLi.content.slice(0, 4).indexOf('http') > -1 ? (
              <a href={corpLi.content}>{corpLi.content}</a>
            ) : (
              corpLi.content
            )}
          </li>
        ))}
      </ul>
    );
  }
}

export default CorpLi;
