import React from 'react';

const Date = (props) => {
    console.log(props.date)

    const fixDate = () => {
      const newDate =  props.date.slice(0,10).split('-').reverse().join('/') + ' | ' + props.creator
      return newDate
    }
    fixDate()

  return fixDate()
};

export default Date;
