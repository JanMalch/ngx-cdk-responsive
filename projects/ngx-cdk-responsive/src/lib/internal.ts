import {Breakpoints} from '@angular/cdk/layout';

const regexMinWidth = /\(min-width: \d+?px\)/g;
const regexMaxWidth = /\(max-width: (\d|\.)+?px\)/g;

const BreakpointGenerator = Object.entries(Breakpoints).reduce((acc, [key, value]) => {
  const keyAndSmaller = key + ' and smaller';
  const keyAndLarger = key + ' and larger';

  const valueAndSmaller = value.replace(regexMinWidth, '(min-width: 0px)');
  const valueAndLarger = value.replace(regexMaxWidth, '(max-width: 1000000px)');

  acc[key] = value;
  acc[keyAndSmaller] = valueAndSmaller;
  acc[keyAndLarger] = valueAndLarger;
  return acc;
}, {});

