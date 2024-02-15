import { MapResult, Team, Tournament } from '../constants/interfaces'
import rules from '../constants/rules'
import {
  GetMatchWinner,
  InstantMatchResults,
  PrepareForMapResults,
} from './gameFunctions'

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

export function SetAllMatcherInColumn(
  grid: any[],
  index: number,
  betOfMaps: number
) {
  return grid[index].map((g: any) => {
    if (g.mapResults.length) {
      return g
    } else {
      return {
        ...g,
        mapResults: InstantMatchResults(
          PrepareForMapResults(g.team1, g.team2, betOfMaps)
        ),
      }
    }
  })
}

export function AutoMatchColumn(
  currentTournament: Tournament,
  tournaments: Tournament[],
  bestOfMaps: number
) {
  let tournamentsData: Tournament[] = tournaments
  if (
    currentTournament.grid?.length &&
    (currentTournament.grid.find(
      (column: any) =>
        !column.find(
          (g: any) =>
            (g.team1.name === rules.yourTeam ||
              g.team2.name === rules.yourTeam) &&
            GetMatchWinner(g.mapResults)
        )
    ) ||
      currentTournament.grid.find(
        (column: any) =>
          column.find(
            (g: any) =>
              (g.team1.name === rules.yourTeam ||
                g.team2.name === rules.yourTeam) &&
              GetMatchWinner(g.mapResults)
          ) && column.find((g: any) => g.mapResults.length === 0)
      ))
  ) {
    currentTournament.grid.forEach((gridI: any[], indexI: number) => {
      if (
        (gridI.find(
          (g: any) =>
            (g.team1.name === rules.yourTeam ||
              g.team2.name === rules.yourTeam) &&
            GetMatchWinner(g.mapResults)
        ) ||
          !gridI.find(
            (g: any) =>
              g.team1.name === rules.yourTeam || g.team2.name === rules.yourTeam
          )) &&
        gridI.filter((g: any) => g.team1.name && g.team2.name).length ===
          gridI.length &&
        gridI.find((g: any) => g.mapResults.length === 0)
      ) {
        gridI.map((pair: any, indexJ: number) => {
          tournamentsData = UpdateGridAfterMatch(
            tournamentsData,
            tournamentsData.find(
              (t: Tournament) =>
                t.season === currentTournament.season &&
                t.name === currentTournament.name &&
                t.period === currentTournament.period
            ) as Tournament,
            indexI,
            indexJ,
            InstantMatchResults(
              PrepareForMapResults(pair.team1, pair.team2, bestOfMaps)
            ),
            pair.team1,
            pair.team2
          )
        })
      }
    })

    return tournamentsData
  } else {
    return tournaments
  }
}

export default function TournamentWinner(tournament: Tournament) {
  if (
    tournament.grid.length > 0 &&
    tournament.grid[tournament.grid.length - 1].length > 0
  ) {
    return GetMatchWinner(
      tournament.grid[tournament.grid.length - 1][
        tournament.grid[tournament.grid.length - 1].length - 1
      ].mapResults
    )
  } else {
    return false
  }
}
