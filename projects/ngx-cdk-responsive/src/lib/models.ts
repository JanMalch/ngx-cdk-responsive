// tslint:disable:max-line-length

export const AllBreakpoints: AvailableBreakpoints<string> = {
  'XSmall': '(max-width: 599.99px)',
  'XSmall and smaller': '(max-width: 599.99px)',
  'XSmall and larger': '(max-width: 1000000px)',
  'Small': '(min-width: 600px) and (max-width: 959.99px)',
  'Small and smaller': '(min-width: 0px) and (max-width: 959.99px)',
  'Small and larger': '(min-width: 600px) and (max-width: 1000000px)',
  'Medium': '(min-width: 960px) and (max-width: 1279.99px)',
  'Medium and smaller': '(min-width: 0px) and (max-width: 1279.99px)',
  'Medium and larger': '(min-width: 960px) and (max-width: 1000000px)',
  'Large': '(min-width: 1280px) and (max-width: 1919.99px)',
  'Large and smaller': '(min-width: 0px) and (max-width: 1919.99px)',
  'Large and larger': '(min-width: 1280px) and (max-width: 1000000px)',
  'XLarge': '(min-width: 1920px)',
  'XLarge and smaller': '(min-width: 0px)',
  'XLarge and larger': '(min-width: 1920px)',
  'Handset': '(max-width: 599.99px) and (orientation: portrait), (max-width: 959.99px) and (orientation: landscape)',
  'Handset and smaller': '(max-width: 599.99px) and (orientation: portrait), (max-width: 959.99px) and (orientation: landscape)',
  'Handset and larger': '(max-width: 1000000px) and (orientation: portrait), (max-width: 1000000px) and (orientation: landscape)',
  'Tablet': '(min-width: 600px) and (max-width: 839.99px) and (orientation: portrait), (min-width: 960px) and (max-width: 1279.99px) and (orientation: landscape)',
  'Tablet and smaller': '(min-width: 0px) and (max-width: 839.99px) and (orientation: portrait), (min-width: 0px) and (max-width: 1279.99px) and (orientation: landscape)',
  'Tablet and larger': '(min-width: 600px) and (max-width: 1000000px) and (orientation: portrait), (min-width: 960px) and (max-width: 1000000px) and (orientation: landscape)',
  'Web': '(min-width: 840px) and (orientation: portrait), (min-width: 1280px) and (orientation: landscape)',
  'Web and smaller': '(min-width: 0px) and (orientation: portrait), (min-width: 0px) and (orientation: landscape)',
  'Web and larger': '(min-width: 840px) and (orientation: portrait), (min-width: 1280px) and (orientation: landscape)',
  'HandsetPortrait': '(max-width: 599.99px) and (orientation: portrait)',
  'HandsetPortrait and smaller': '(max-width: 599.99px) and (orientation: portrait)',
  'HandsetPortrait and larger': '(max-width: 1000000px) and (orientation: portrait)',
  'TabletPortrait': '(min-width: 600px) and (max-width: 839.99px) and (orientation: portrait)',
  'TabletPortrait and smaller': '(min-width: 0px) and (max-width: 839.99px) and (orientation: portrait)',
  'TabletPortrait and larger': '(min-width: 600px) and (max-width: 1000000px) and (orientation: portrait)',
  'WebPortrait': '(min-width: 840px) and (orientation: portrait)',
  'WebPortrait and smaller': '(min-width: 0px) and (orientation: portrait)',
  'WebPortrait and larger': '(min-width: 840px) and (orientation: portrait)',
  'HandsetLandscape': '(max-width: 959.99px) and (orientation: landscape)',
  'HandsetLandscape and smaller': '(max-width: 959.99px) and (orientation: landscape)',
  'HandsetLandscape and larger': '(max-width: 1000000px) and (orientation: landscape)',
  'TabletLandscape': '(min-width: 960px) and (max-width: 1279.99px) and (orientation: landscape)',
  'TabletLandscape and smaller': '(min-width: 0px) and (max-width: 1279.99px) and (orientation: landscape)',
  'TabletLandscape and larger': '(min-width: 960px) and (max-width: 1000000px) and (orientation: landscape)',
  'WebLandscape': '(min-width: 1280px) and (orientation: landscape)',
  'WebLandscape and smaller': '(min-width: 0px) and (orientation: landscape)',
  'WebLandscape and larger': '(min-width: 1280px) and (orientation: landscape)'
};

export interface AvailableBreakpoints<T> {
  'XSmall': T;
  'XSmall and smaller': T;
  'XSmall and larger': T;
  'Small': T;
  'Small and smaller': T;
  'Small and larger': T;
  'Medium': T;
  'Medium and smaller': T;
  'Medium and larger': T;
  'Large': T;
  'Large and smaller': T;
  'Large and larger': T;
  'XLarge': T;
  'XLarge and smaller': T;
  'XLarge and larger': T;
  'Handset': T;
  'Handset and smaller': T;
  'Handset and larger': T;
  'Tablet': T;
  'Tablet and smaller': T;
  'Tablet and larger': T;
  'Web': T;
  'Web and smaller': T;
  'Web and larger': T;
  'HandsetPortrait': T;
  'HandsetPortrait and smaller': T;
  'HandsetPortrait and larger': T;
  'TabletPortrait': T;
  'TabletPortrait and smaller': T;
  'TabletPortrait and larger': T;
  'WebPortrait': T;
  'WebPortrait and smaller': T;
  'WebPortrait and larger': T;
  'HandsetLandscape': T;
  'HandsetLandscape and smaller': T;
  'HandsetLandscape and larger': T;
  'TabletLandscape': T;
  'TabletLandscape and smaller': T;
  'TabletLandscape and larger': T;
  'WebLandscape': T;
  'WebLandscape and smaller': T;
  'WebLandscape and larger': T;
}
