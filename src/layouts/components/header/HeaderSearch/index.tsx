import { Input } from 'antd';
// 编写受控组件的effect
// import useMergeValue from 'use-merge-value';
import React from 'react';
import './index.scss';

const { Search } = Input;


interface HeaderSearchPropsType {
  className?: string,
  onSearch: (value?: string) => void;
  placeholder?: string;
}

const HeaderSearch: React.FC<HeaderSearchPropsType> = props => {
  const {
    placeholder,
    className,
    onSearch
  } = props;
  return (
    <div className={className}>
      <Search
        placeholder={placeholder}
        onSearch={value => console.log(value)}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            onSearch('')
          }
        }}
        style={{ width: 200 }}
      />
    </div>
  );
};

export default HeaderSearch;
