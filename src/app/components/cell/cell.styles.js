import {createCssClass} from "../../utils/styles";
import {dayWidth} from "../../utils/date";

createCssClass('cell', {
  position: 'relative',
  display: 'flex',
  width: `${dayWidth}px`,
  height: '75px',
  border: '2px solid white',
  'flex-direction': 'column-reverse',
});

createCssClass('missed', {
  background: '#f18181',
});

createCssClass('targetTime', {
  position: 'absolute',
  left: '-2px',
  padding: '1px',
  width: 'calc(100% + 2px)',
  'box-sizing': 'content-box',
  background: '#4aa6ef',
});

createCssClass('goodTime', {
  background: '#ad9',
});

createCssClass('badTime', {
  background: '#f18181',
});

createCssClass('otherTime', {
  background: '#ecf1fe',
});

createCssClass('dayPart', {
  position: 'absolute',
  bottom: '-1.5em',
  display: 'flex',
  width: '100%',
  'justify-content': 'center',
  'font-size': '0.7em',
});

createCssClass('firstDayPart', {
  background: '#a4d2f7',
});
