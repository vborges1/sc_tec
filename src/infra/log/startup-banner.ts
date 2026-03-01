import figlet from 'figlet'
import chalk from 'chalk'
import boxen from 'boxen'

export function printStartupBanner(url?: string) {
  const title = figlet.textSync('SC Tec', { font: 'Standard' })

  const content = `
${chalk.redBright(title)}

${chalk.bold('Projeto Empreendimentos')}
${chalk.bold('Dev: Vitor Silveira Borges')}
${url ? chalk.blueBright(`URL: ${url}`) : ''}
`

  console.log(
    boxen(content.trim(), {
      padding: 1,
      margin: 1,
      borderStyle: 'round',
      borderColor: 'red'
    })
  )
}