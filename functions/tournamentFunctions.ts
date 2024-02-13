import { Team } from '../constants/interfaces'

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
