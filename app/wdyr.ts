import whyDidYouRender from '@welldone-software/why-did-you-render';
import * as React from 'react';

if (process.env.NODE_ENV === 'development') {
  whyDidYouRender(React, {
    trackAllPureComponents: true
  });
}
