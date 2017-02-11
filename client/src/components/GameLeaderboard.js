//build table for a game
import React from 'react'
import {Header, Table} from 'semantic-ui-react'

const LeaderboardTable = (props) => {
  return (
    // <h2>{props.gameType}</h2>
    <Table basic='very' celled collapsing>
      <Table.Body>{props.leaders.map(function(leader, i){
        return (
          <Table.Row>
            <Table.Cell>{leader.username}</Table.Cell>
            <Table.Cell>{leader.scrambleHigh}</Table.Cell>
          </Table.Row>
          )
        })
      }
      </Table.Body>
    </Table>
  )
}

export default LeaderboardTable