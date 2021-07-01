export const tweakDate = (createdAt) => {
  let now = new Date(),
    then = createdAt.toDate(),
    theDate = ''

  let inSeconds = parseInt((now.getTime() - then.getTime()) / 1000),
    inMinutes = parseInt((now.getTime() - then.getTime()) / (60 * 1000)),
    inHours = parseInt((now.getTime() - then.getTime()) / (60 * 60 * 1000)),
    inDays = parseInt((now.getTime() - then.getTime()) / (60 * 60 * 24 * 1000)),
    inWeeks = parseInt(
      (now.getTime() - then.getTime()) / (60 * 60 * 24 * 1000 * 7),
    ),
    inMonths = parseInt(
      (now.getTime() - then.getTime()) / (60 * 60 * 24 * 1000 * (365 / 12)),
    ),
    inYears = parseInt(
      (now.getTime() - then.getTime()) / (60 * 60 * 24 * 1000 * 365),
    )

  inYears >= 0 ? (theDate = inYears + ' years ago') : ''
  inYears === 1 ? (theDate = 'a year ago') : ''
  inMonths >= 0 && inMonths <= 12 ? (theDate = inMonths + ' months ago') : ''
  inMonths === 1 ? (theDate = ' a month ago') : ''
  inWeeks >= 0 && inWeeks <= 4 ? (theDate = inWeeks + ' weeks ago') : ''
  inWeeks === 1 ? (theDate = 'a week ago') : ''
  inDays >= 0 && inDays <= 7 ? (theDate = inDays + ' days ago') : ''
  inDays === 1 ? (theDate = 'yesterday') : ''
  inHours >= 0 && inHours <= 24 ? (theDate = inHours + ' hours ago') : ''
  inHours === 1 ? (theDate = 'an hour ago') : ''
  inMinutes >= 0 && inMinutes <= 60
    ? (theDate = inMinutes + ' minutes ago')
    : ''
  inMinutes === 1 ? (theDate = 'a minute ago') : ''
  inSeconds >= -60 && inSeconds <= 60 ? (theDate = ' just now') : ''

  return theDate
}
