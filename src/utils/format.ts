import _ from 'dayjs'
import utc from 'dayjs/plugin/utc'

_.extend(utc)

export function formatUTC(
  utcString: string,
  format: string = 'YYYY/MM/DD HH:mm:ss'
) {
  const resultTime = _.utc(utcString).utcOffset(8).format(format)
  return resultTime
}
