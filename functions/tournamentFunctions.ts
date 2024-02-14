import { MapResult, Team, Tournament } from '../constants/interfaces'
import { GetMatchWinner } from './gameFunctions'

export function ShuffleTeams(teamsArr: Team[]) {
  const shuffledArray = [...teamsArr]
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]
  }
  return shuffledArray
}

export function MakeTournamentGrid(teams: Team[]) {
  const teamAmount = teams.length
  const shufffledTeams = ShuffleTeams(teams)

  const gridLevels = Math.log2(teamAmount)
  let gridArr: any = []
  for (let i = 0; i < gridLevels; i++) {
    let levelArr = []

    for (let j = 0; j < 2 ** (gridLevels - i) / 2; j++) {
      if (i === 0) {
        levelArr.push({
          team1: shufffledTeams[j * 2],
          team2: shufffledTeams[j * 2 + 1],
          mapResults: [],
        })
      } else {
        levelArr.push({ team1: '', team2: '', mapResults: [] })
      }
    }
    gridArr.push(levelArr)
  }

  return gridArr
}

export function GetStageName(pairs: number) {
  const stage: any = ['Final', 'Semi-Final', 'Quarter-Final', 'Qualification']
  return stage[Math.log2(pairs)]
}

export function UpdateGridAfterMatch(
  tournaments: Tournament[],
  tournament: Tournament,
  indexIprop: number,
  indexJprop: number,
  mapsResultsLog: MapResult[],
  team1: Team,
  team2: Team
) {
  const newTournamentData = tournaments.map((t: Tournament) => {
    if (JSON.stringify(t) === JSON.stringify(tournament)) {
      let newGrid = t.grid
      newGrid = newGrid.map((gridI: any[], indexI: number) => {
        return gridI.map((gridJ: any[], indexJ: number) => {
          if (indexI === indexIprop && indexJ === indexJprop) {
            return {
              ...gridJ,
              mapResults: mapsResultsLog,
            }
          } else if (
            indexI === indexIprop + 1 &&
            indexJ === Math.floor(indexJprop / 2)
          ) {
            if (indexJprop % 2 === 0) {
              return {
                ...gridJ,
                team1:
                  GetMatchWinner(mapsResultsLog) === team1.name ? team1 : team2,
              }
            } else {
              return {
                ...gridJ,
                team2:
                  GetMatchWinner(mapsResultsLog) === team1.name ? team1 : team2,
              }
            }
          } else {
            return gridJ
          }
        })
      })

      return {
        ...t,
        grid: newGrid,
      }
    } else {
      return t
    }
  })
  return newTournamentData
}

export function GetTournamentsBySeason(tournaments: Tournament[]) {
  const tArr: any = []
  tournaments.map((t: any) => {
    if (!tArr.length) {
      tArr.push(t)
    } else {
      if (t.season !== tArr[0].season) {
        tArr.unshift(t)
      } else {
        tArr.splice(t.cup - 1, 0, t)
      }
    }
  })
  return tArr
}
