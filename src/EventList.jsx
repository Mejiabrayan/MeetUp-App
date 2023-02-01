import React, { useState } from 'react';
import Event from './components/Event';

export default function EventList({ events }) {
  const [visibleEvents, setVisibleEvents] = useState(events.slice(0, 5));
  const [showAll, setShowAll] = useState(false);

  const toggleShowAll = () => {
    setShowAll(!showAll);
    setVisibleEvents(showAll ? events.slice(0, 5) : events);
  };

  return (
    <div>
      {visibleEvents.map((event) => (
        <Event key={event.id} event={event} />
      ))}
      {events.length > 5 && (
        <button onClick={toggleShowAll}>
          {showAll ? 'Show Less' : 'See More Events'}
        </button>
      )}
    </div>
  );
}

