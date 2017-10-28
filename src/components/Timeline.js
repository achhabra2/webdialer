import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Timeline, TimelineEvent } from 'react-event-timeline';

export class MyTimeline extends Component {
  static propTypes = {

  }

  render() {
    return (
      <div>
        <Timeline>
          <TimelineEvent title="John Doe sent a SMS"
            createdAt="2016-09-12 10:06 PM"
            icon={<i className="material-icons md-18">textsms</i>}
          >
            I received the payment for $543. Should be shipping the item within a couple of hours.
            </TimelineEvent>
          <TimelineEvent
            title="You sent an email to John Doe"
            createdAt="2016-09-11 09:06 AM"
            icon={<i className="material-icons md-18">email</i>}
          >
            Like we talked, you said that you would share the shipment details? This is an urgent order and so I
                    am losing patience. Can you expedite the process and pls do share the details asap. Consider this a
                    gentle reminder if you are on track already!
            </TimelineEvent>
        </Timeline>
        <div>Icons made by <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
      </div>
    )
  }
}

export default MyTimeline;
