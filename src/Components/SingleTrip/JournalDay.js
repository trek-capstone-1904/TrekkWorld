import React from 'react'
import Selector from './Selector';
import JournalCard from './JournalCard'

export const JournalDay = () => {
  return (
    <div>
      <Selector />
      {/* query the journal date places map, put the results into an array, map over them, and render a journalCard for each place */}
      <JournalCard />
    </div>
  )
}

export default JournalDay
